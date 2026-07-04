/**
 * OKF Backfill — Seed KB from project codebase
 *
 * Reads git history, scans directory structure, reads existing docs,
 * and generates knowledge/component/task nodes.
 *
 * Usage: node scripts/backfill.js <project-name> [--dry-run]
 *
 * Example: node scripts/backfill.js clientdata
 *          node scripts/backfill.js truck --dry-run
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OKF_ROOT = path.resolve(__dirname, '..');
const GRAPH_PATH = path.join(OKF_ROOT, 'graph.json');

// Project root directory mappings
const PROJECT_ROOTS = {
  cafe: '/home/cafe',
  'cafe-v2': '/home/cafe-v2',
  clientdata: '/home/clientdata',
  habby: '/home/habby',
  'mcky.space': '/home/mcky.space',
  truck: '/home/truck',
  writer: '/home'
};

function loadGraph() {
  return JSON.parse(fs.readFileSync(GRAPH_PATH, 'utf-8'));
}

// Local counter to avoid duplicate IDs within a single run
const localCounters = {};

function getNextId(project, prefix, graph) {
  const key = `${project}:${prefix}`;
  if (!localCounters[key]) {
    const existing = graph.nodes
      .filter(n => n.project === project && n.id.startsWith(prefix))
      .map(n => parseInt(n.id.split('-')[1], 10))
      .filter(n => !isNaN(n));
    localCounters[key] = existing.length > 0 ? Math.max(...existing) : 0;
  }
  localCounters[key]++;
  return prefix + '-' + String(localCounters[key]).padStart(3, '0');
}

function safeExec(cmd, cwd) {
  try {
    return execSync(cmd, { cwd, encoding: 'utf-8', maxBuffer: 1024 * 1024 });
  } catch {
    return '';
  }
}

function extractDecisionsFromGitLog(project, projectRoot, graph, dryRun) {
  const decisions = [];
  const log = safeExec('git log --oneline --since="2026-01-01" --format="%h %s"', projectRoot);
  if (!log) return decisions;

  for (const line of log.split('\n').filter(Boolean)) {
    const match = line.match(/^\w+\s+(.+)$/);
    if (!match) continue;
    const msg = match[1];

    // Skip merge commits, bots, trivial messages
    if (msg.startsWith('Merge') || msg.startsWith('chore') || msg.startsWith('ci:')) continue;

    // Extract meaningful decisions
    if (msg.length > 20 && !decisions.some(d => d.msg === msg)) {
      decisions.push({
        commit: line.split(' ')[0],
        msg,
        source: 'git-log'
      });
    }
  }
  return decisions;
}

function extractComponentsFromDir(project, projectRoot, graph, dryRun) {
  const components = [];
  const srcDirs = ['src', 'app', 'components', 'lib', 'pages'];

  for (const dir of srcDirs) {
    const fullPath = path.join(projectRoot, dir);
    if (!fs.existsSync(fullPath)) continue;

    const entries = fs.readdirSync(fullPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        components.push({
          name: entry.name,
          path: `${dir}/${entry.name}`,
          source: 'directory'
        });
      }
    }
  }
  return components;
}

function extractDocsInfo(project, projectRoot, graph, dryRun) {
  const docs = [];
  for (const docName of ['README.md', 'DESIGN.md', 'ARCHITECTURE.md', 'CONTRIBUTING.md']) {
    const docPath = path.join(projectRoot, docName);
    if (fs.existsSync(docPath)) {
      const content = fs.readFileSync(docPath, 'utf-8');
      docs.push({
        name: docName,
        size: content.length,
        preview: content.split('\n').slice(0, 5).join('\n'),
        source: 'file'
      });
    }
  }
  return docs;
}

function sanitizeProject(name) {
  return name.replace(/\./g, '-');
}

function findNodeId(graph, project, type, fallbackSuffix) {
  // Look up actual node ID from graph
  const match = graph.nodes.find(n => n.project === project && n.type === type);
  if (match) return match.id;
  // Fallback: project name + suffix
  return `${sanitizeProject(project)}-${fallbackSuffix}`;
}

function writeNodeFile(filePath, fm, body) {
  const yaml = require('js-yaml');
  const fmStr = yaml.dump(fm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
  fs.writeFileSync(filePath, '---\n' + fmStr + '---\n\n' + body + '\n');
}

function main() {
  const project = process.argv[2];
  const dryRun = process.argv.includes('--dry-run');

  if (!project) {
    console.error('Usage: node scripts/backfill.js <project> [--dry-run]');
    console.error('Available projects: ' + Object.keys(PROJECT_ROOTS).join(', '));
    process.exit(1);
  }

  const projectRoot = PROJECT_ROOTS[project];
  if (!projectRoot || !fs.existsSync(projectRoot)) {
    console.error(`Project root not found for "${project}" (tried ${projectRoot})`);
    process.exit(1);
  }

  const graph = loadGraph();
  const today = new Date().toISOString().split('T')[0];
  const sid = sanitizeProject(project);
  const findings = [];

  console.log(`\n  OKF Backfill — ${project}\n`);
  console.log(`  Source: ${projectRoot}`);
  console.log(`  Mode: ${dryRun ? 'DRY RUN (no writes)' : 'LIVE'}\n`);

  // 1. Extract decisions from git log
  console.log('  1. Reading git history...');
  const decisions = extractDecisionsFromGitLog(project, projectRoot, graph, dryRun);
  findings.push({ type: 'decision', count: decisions.length, items: decisions });
  console.log(`     Found ${decisions.length} potential decisions in git log`);
  if (decisions.length > 0 && !dryRun) {
    // Write top 5 decisions as DEC nodes
    for (const dec of decisions.slice(0, 5)) {
      const decId = getNextId(project, 'DEC', graph);
      const decFile = path.join(OKF_ROOT, 'projects', project, 'knowledge', decId + '.md');
      const fm = {
        type: 'decision',
        id: decId,
        project,
        last_updated: today,
        status: 'active',
        freshness: today,
        verified: today,
        expires: null,
        superseded_by: null,
        anchors: [],
        links: [{ type: 'relates-to', target: findNodeId(graph, project, 'agent-profile', 'agent') }]
      };
      writeNodeFile(decFile, fm, `# ${decId}: ${dec.msg}\n\nBackfilled from git commit ${dec.commit}.`);
      console.log(`     ✓ Created ${decId}: ${dec.msg.substring(0, 60)}`);
    }
  }

  // 2. Extract components from directory structure
  console.log('\n  2. Scanning directory structure...');
  const components = extractComponentsFromDir(project, projectRoot, graph, dryRun);
  findings.push({ type: 'component', count: components.length, items: components });
  console.log(`     Found ${components.length} subdirectories`);
  if (components.length > 0 && !dryRun) {
    const compId = getNextId(project, 'COMP', graph);
    const compFile = path.join(OKF_ROOT, 'projects', project, 'knowledge', compId + '.md');
    const fm = {
      type: 'component',
      id: compId,
      project,
      last_updated: today,
      status: 'active',
      freshness: today,
      verified: today,
      expires: null,
      superseded_by: null,
      anchors: components.slice(0, 10).map(c => `${projectRoot}/${c.path}`),
      links: [{ type: 'relates-to', target: findNodeId(graph, project, 'project-profile', 'profile') }]
    };
    const body = `# ${compId}: ${project} source structure\n\n## Subdirectories\n\n` +
      components.map(c => `- \`${c.path}\``).join('\n');
    writeNodeFile(compFile, fm, body);
    console.log(`     ✓ Created ${compId} with ${components.length} subdirectories`);
  }

  // 3. Check existing docs
  console.log('\n  3. Reading existing documentation...');
  const docs = extractDocsInfo(project, projectRoot, graph, dryRun);
  findings.push({ type: 'document', count: docs.length, items: docs });
  console.log(`     Found ${docs.length} doc files`);
  for (const doc of docs) {
    console.log(`       - ${doc.name} (${doc.size} bytes)`);
  }

  // Summary
  console.log('\n  === Backfill Summary ===\n');
  let totalCreated = 0;
  for (const f of findings) {
    const created = dryRun ? 0 : f.type === 'decision' ? Math.min(f.count, 5) : f.type === 'component' ? 1 : 0;
    totalCreated += created;
    console.log(`  ${f.type}: ${f.count} found, ${created} created`);
  }
  console.log(`\n  Total nodes created: ${totalCreated}`);

  if (!dryRun && totalCreated > 0) {
    console.log('\n  Rebuilding graph...');
    require(path.join(__dirname, 'build-graph.js'));
  }

  console.log('');
}

main();
