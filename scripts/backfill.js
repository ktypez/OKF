/**
 * OKF Backfill — Seed KB from project codebase
 *
 * Reads git history, scans directory structure, reads existing docs,
 * and generates knowledge/component node files.
 * Also detects orphaned projects (KB exists but source code gone).
 *
 * Usage: node scripts/backfill.js <project-name> [--dry-run]
 *        node scripts/backfill.js --orphan [--clean]
 *
 * Examples:
 *   node scripts/backfill.js clientdata
 *   node scripts/backfill.js truck --dry-run
 *   node scripts/backfill.js --orphan
 *   node scripts/backfill.js --orphan --clean
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OKF_ROOT = path.resolve(__dirname, '..');
const yaml = require('js-yaml');

// Project root directory mappings
const PROJECT_ROOTS = {
  clientdata: '/home/clientdata',
  habby: '/home/habby',
  'mcky.space': '/home/mcky.space',
  truck: '/home/truck',
  writer: '/home'
};

function walkMd(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '.next') continue;
      files.push(...walkMd(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  try {
    return yaml.load(match[1]) || null;
  } catch {
    return null;
  }
}

function getNextId(project, prefix) {
  const knowledgeDir = path.join(OKF_ROOT, 'projects', project, 'knowledge');
  const tasksDir = path.join(OKF_ROOT, 'projects', project, 'tasks');
  let maxNum = 0;

  for (const dir of [knowledgeDir, tasksDir]) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.startsWith(prefix + '-') && f.endsWith('.md'));
    for (const f of files) {
      const num = parseInt(f.replace(prefix + '-', '').replace('.md', ''), 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  }

  return prefix + '-' + String(maxNum + 1).padStart(3, '0');
}

function safeExec(cmd, cwd) {
  try {
    return execSync(cmd, { cwd, encoding: 'utf-8', maxBuffer: 1024 * 1024 });
  } catch {
    return '';
  }
}

function extractDecisionsFromGitLog(project, projectRoot) {
  const decisions = [];
  const log = safeExec('git log --oneline --since="2026-01-01" --format="%h %s"', projectRoot);
  if (!log) return decisions;

  for (const line of log.split('\n').filter(Boolean)) {
    const match = line.match(/^\w+\s+(.+)$/);
    if (!match) continue;
    const msg = match[1];

    if (msg.startsWith('Merge') || msg.startsWith('chore') || msg.startsWith('ci:')) continue;

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

function extractComponentsFromDir(project, projectRoot) {
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

function extractDocsInfo(projectRoot) {
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

function countMdFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countMdFiles(full);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      count++;
    }
  }
  return count;
}

function detectOrphans() {
  const projectsDir = path.join(OKF_ROOT, 'projects');
  if (!fs.existsSync(projectsDir)) return [];

  const existing = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const orphans = [];
  for (const proj of existing) {
    const sourceRoot = PROJECT_ROOTS[proj];
    if (!sourceRoot || !fs.existsSync(sourceRoot)) {
      const projDir = path.join(projectsDir, proj);
      const files = countMdFiles(projDir);
      orphans.push({ project: proj, files });
    }
  }
  return orphans;
}

function removeProjectDir(project) {
  const projDir = path.join(OKF_ROOT, 'projects', project);
  if (!fs.existsSync(projDir)) return;
  fs.rmSync(projDir, { recursive: true, force: true });
}

function writeNodeFile(filePath, fm, body) {
  const fmStr = yaml.dump(fm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
  fs.writeFileSync(filePath, '---\n' + fmStr + '---\n\n' + body + '\n');
}

function main() {
  const arg = process.argv[2];
  const dryRun = process.argv.includes('--dry-run');
  const orphanMode = arg === '--orphan';
  const cleanMode = process.argv.includes('--clean');

  if (orphanMode) {
    console.log('\n  OKF Backfill — Orphan Detection\n');
    const orphans = detectOrphans();

    if (orphans.length === 0) {
      console.log('  No orphaned projects found.\n');
      return;
    }

    console.log(`  Found ${orphans.length} orphaned project(s):\n`);
    for (const o of orphans) {
      console.log(`  [orphan] ${o.project} — ${o.files} KB files`);
    }

    if (cleanMode) {
      console.log('\n  Cleaning orphaned projects...');
      for (const o of orphans) {
        removeProjectDir(o.project);
        console.log(`    Removed projects/${o.project}/ (${o.files} files)`);
      }
      console.log(`\n  Removed ${orphans.length} orphaned project(s)\n`);
    } else {
      console.log('\n  Run with --clean to remove orphaned KB files\n');
    }
    return;
  }

  if (!arg || arg === '--clean') {
    console.error('Usage: node scripts/backfill.js <project> [--dry-run]');
    console.error('       node scripts/backfill.js --orphan [--clean]');
    console.error('Available projects: ' + Object.keys(PROJECT_ROOTS).join(', '));
    process.exit(1);
  }

  const project = arg;
  const projectRoot = PROJECT_ROOTS[project];
  if (!projectRoot || !fs.existsSync(projectRoot)) {
    console.error(`Project root not found for "${project}" (tried ${projectRoot})`);
    process.exit(1);
  }

  const today = new Date().toISOString().split('T')[0];
  const findings = [];

  console.log(`\n  OKF Backfill — ${project}\n`);
  console.log(`  Source: ${projectRoot}`);
  console.log(`  Mode: ${dryRun ? 'DRY RUN (no writes)' : 'LIVE'}\n`);

  // 1. Extract decisions from git log
  console.log('  1. Reading git history...');
  const decisions = extractDecisionsFromGitLog(project, projectRoot);
  findings.push({ type: 'decision', count: decisions.length, items: decisions });
  console.log(`     Found ${decisions.length} potential decisions in git log`);
  if (decisions.length > 0 && !dryRun) {
    for (const dec of decisions.slice(0, 5)) {
      const decId = getNextId(project, 'DEC');
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
        links: []
      };
      writeNodeFile(decFile, fm, `# ${decId}: ${dec.msg}\n\nBackfilled from git commit ${dec.commit}.`);
      console.log(`     Created ${decId}: ${dec.msg.substring(0, 60)}`);
    }
  }

  // 2. Extract components from directory structure
  console.log('\n  2. Scanning directory structure...');
  const components = extractComponentsFromDir(project, projectRoot);
  findings.push({ type: 'component', count: components.length, items: components });
  console.log(`     Found ${components.length} subdirectories`);
  if (components.length > 0 && !dryRun) {
    const compId = getNextId(project, 'COMP');
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
      links: []
    };
    const body = `# ${compId}: ${project} source structure\n\n## Subdirectories\n\n` +
      components.map(c => `- \`${c.path}\``).join('\n');
    writeNodeFile(compFile, fm, body);
    console.log(`     Created ${compId} with ${components.length} subdirectories`);
  }

  // 3. Check existing docs
  console.log('\n  3. Reading existing documentation...');
  const docs = extractDocsInfo(projectRoot);
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
  console.log('');
}

main();
