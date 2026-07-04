/**
 * OKF Doctor — Knowledge Lifecycle Audit
 *
 * Checks for stale nodes, broken links, expired entries, superseded nodes.
 *
 * Usage: node scripts/doctor-kb.js [project]
 */

const fs = require('fs');
const path = require('path');

const OKF_ROOT = path.resolve(__dirname, '..');
const GRAPH_PATH = path.join(OKF_ROOT, 'graph.json');

function loadGraph() {
  return JSON.parse(fs.readFileSync(GRAPH_PATH, 'utf-8'));
}

function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  try {
    const yaml = require('js-yaml');
    return yaml.load(match[1]) || null;
  } catch {
    return null;
  }
}

function daysAgo(dateStr) {
  if (!dateStr) return Infinity;
  const d = new Date(dateStr);
  const now = new Date();
  return Math.floor((now - d) / (1000 * 60 * 60 * 24));
}

function main() {
  const projectFilter = process.argv[2] || null;
  const graph = loadGraph();
  const today = new Date().toISOString().split('T')[0];
  const findings = [];

  let filteredNodes = graph.nodes;
  if (projectFilter) {
    filteredNodes = filteredNodes.filter(n => n.project === projectFilter);
  }

  // Only check knowledge and task nodes
  const checkTypes = ['decision', 'lesson', 'risk', 'goal', 'gap', 'task', 'document', 'component'];

  for (const node of filteredNodes) {
    if (!checkTypes.includes(node.type)) continue;

    // 1. Unverified nodes (30+ days since verified)
    if (node.status === 'active' && node.verified) {
      const days = daysAgo(node.verified);
      if (days >= 30) {
        findings.push({
          severity: 'warning',
          node: node.id,
          project: node.project,
          file: node.file,
          message: `Unverified for ${days} days (last verified: ${node.verified})`
        });
      }
    }

    // 2. Expired nodes
    if (node.expires && node.expires < today && node.status === 'active') {
      findings.push({
        severity: 'error',
        node: node.id,
        project: node.project,
        file: node.file,
        message: `Expired on ${node.expires} — should be archived`
      });
    }

    // 3. Superseded nodes still active
    if (node.superseded_by && node.status !== 'superseded' && node.status !== 'archived') {
      findings.push({
        severity: 'warning',
        node: node.id,
        project: node.project,
        file: node.file,
        message: `Superseded by ${node.superseded_by} but status is still "${node.status}"`
      });
    }

    // 4. No freshness date
    if (!node.freshness && node.type !== 'component') {
      findings.push({
        severity: 'info',
        node: node.id,
        project: node.project,
        file: node.file,
        message: 'Missing freshness date'
      });
    }
  }

  // 5. Broken links
  for (const edge of graph.edges) {
    const target = graph.nodes.find(n => n.id === edge.target);
    if (!target) {
      findings.push({
        severity: 'error',
        node: edge.source,
        project: null,
        file: null,
        message: `Broken link: → ${edge.target} (edge type: ${edge.type})`
      });
    }
  }

  // 6. Orphan tasks (no links to any knowledge)
  for (const node of filteredNodes) {
    if (node.type !== 'task') continue;
    const hasLinks = graph.edges.some(e => e.source === node.id);
    if (!hasLinks) {
      findings.push({
        severity: 'info',
        node: node.id,
        project: node.project,
        file: node.file,
        message: 'Task has no links to knowledge nodes'
      });
    }
  }

  // Report
  console.log(`\n  OKF Doctor — Knowledge Audit${projectFilter ? ` (${projectFilter})` : ''}\n`);
  console.log(`  Scanned ${filteredNodes.length} nodes, ${findings.length} findings\n`);

  if (findings.length === 0) {
    console.log('  ✓ Clean bill of health — no issues found.\n');
    return;
  }

  const severityOrder = { error: 0, warning: 1, info: 2 };
  findings.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  for (const f of findings) {
    const icon = f.severity === 'error' ? '✗' : f.severity === 'warning' ? '⚠' : 'ℹ';
    const scope = f.project ? `[${f.project}]` : '[global]';
    console.log(`  ${icon} ${scope} ${f.node}: ${f.message}`);
    if (f.file) console.log(`     File: ${f.file}`);
    console.log('');
  }

  // Summary
  const errors = findings.filter(f => f.severity === 'error').length;
  const warnings = findings.filter(f => f.severity === 'warning').length;
  const infos = findings.filter(f => f.severity === 'info').length;
  console.log(`  Summary: ${errors} errors, ${warnings} warnings, ${infos} info\n`);

  // Auto-fix: retire expired nodes
  const expired = findings.filter(f => f.severity === 'error' && f.message.startsWith('Expired'));
  if (expired.length > 0) {
    console.log('  Auto-fixing expired nodes...');
    for (const f of expired) {
      const node = graph.nodes.find(n => n.id === f.node);
      if (node) {
        const filePath = path.join(OKF_ROOT, node.file);
        const fm = readFrontmatter(filePath);
        if (fm) {
          fm.status = 'expired';
          const yaml = require('js-yaml');
          const content = fs.readFileSync(filePath, 'utf-8');
          const body = content.replace(/^---[\s\S]*?---\n?/, '');
          const fmStr = yaml.dump(fm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
          fs.writeFileSync(filePath, '---\n' + fmStr + '---\n' + body);
          console.log(`    ✓ Set ${f.node} → status: expired`);
        }
      }
    }
  }

  console.log('  Run node scripts/rebuild-graph to regenerate graph.json\n');
}

main();
