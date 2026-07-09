/**
 * OKF Doctor — Knowledge Lifecycle Audit
 *
 * Scans .md files directly, checks for stale nodes, expired entries,
 * superseded nodes still active, missing freshness dates.
 *
 * Usage: node scripts/doctor-kb.js [project]
 */

const fs = require('fs');
const path = require('path');

const OKF_ROOT = path.resolve(__dirname, '..');
const yaml = require('js-yaml');

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

function daysAgo(dateStr) {
  if (!dateStr) return Infinity;
  const d = new Date(dateStr);
  const now = new Date();
  return Math.floor((now - d) / (1000 * 60 * 60 * 24));
}

function main() {
  const projectFilter = process.argv[2] || null;
  const today = new Date().toISOString().split('T')[0];
  const findings = [];

  const projectsDir = path.join(OKF_ROOT, 'projects');
  const projectDirs = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const checkTypes = ['decision', 'lesson', 'component', 'document', 'index'];

  let totalNodes = 0;

  for (const proj of projectDirs) {
    if (projectFilter && proj !== projectFilter) continue;

    const projDir = path.join(projectsDir, proj);
    const mdFiles = walkMd(projDir);

    for (const filePath of mdFiles) {
      const fm = readFrontmatter(filePath);
      if (!fm || !fm.id || !fm.type) continue;
      if (!checkTypes.includes(fm.type)) continue;

      totalNodes++;
      const relPath = path.relative(OKF_ROOT, filePath);

      // 1. Unverified nodes (30+ days)
      if (fm.status === 'active' && fm.verified) {
        const days = daysAgo(fm.verified);
        if (days >= 30) {
          findings.push({
            severity: 'warning',
            node: fm.id,
            project: proj,
            file: relPath,
            message: `Unverified for ${days} days (last verified: ${fm.verified})`
          });
        }
      }

      // 2. Expired nodes
      if (fm.expires && fm.expires < today && fm.status === 'active') {
        findings.push({
          severity: 'error',
          node: fm.id,
          project: proj,
          file: relPath,
          message: `Expired on ${fm.expires} — should be archived`
        });
      }

      // 3. Superseded nodes still active
      if (fm.superseded_by && fm.status !== 'superseded' && fm.status !== 'archived') {
        findings.push({
          severity: 'warning',
          node: fm.id,
          project: proj,
          file: relPath,
          message: `Superseded by ${fm.superseded_by} but status is still "${fm.status}"`
        });
      }

      // 4. No freshness date
      if (!fm.freshness) {
        findings.push({
          severity: 'info',
          node: fm.id,
          project: proj,
          file: relPath,
          message: 'Missing freshness date'
        });
      }
    }
  }

  // Report
  console.log(`\n  OKF Doctor — Knowledge Audit${projectFilter ? ` (${projectFilter})` : ''}\n`);
  console.log(`  Scanned ${totalNodes} nodes, ${findings.length} findings\n`);

  if (findings.length === 0) {
    console.log('  Clean bill of health — no issues found.\n');
    return;
  }

  const severityOrder = { error: 0, warning: 1, info: 2 };
  findings.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  for (const f of findings) {
    const icon = f.severity === 'error' ? 'x' : f.severity === 'warning' ? '!' : 'i';
    const scope = f.project ? `[${f.project}]` : '[global]';
    console.log(`  ${icon} ${scope} ${f.node}: ${f.message}`);
    if (f.file) console.log(`     File: ${f.file}`);
    console.log('');
  }

  const errors = findings.filter(f => f.severity === 'error').length;
  const warnings = findings.filter(f => f.severity === 'warning').length;
  const infos = findings.filter(f => f.severity === 'info').length;
  console.log(`  Summary: ${errors} errors, ${warnings} warnings, ${infos} info\n`);

  // Auto-fix: retire expired nodes
  const expired = findings.filter(f => f.severity === 'error' && f.message.startsWith('Expired'));
  if (expired.length > 0) {
    console.log('  Auto-fixing expired nodes...');
    for (const f of expired) {
      const filePath = path.join(OKF_ROOT, f.file);
      const fm = readFrontmatter(filePath);
      if (fm) {
        fm.status = 'expired';
        const content = fs.readFileSync(filePath, 'utf-8');
        const body = content.replace(/^---[\s\S]*?---\n?/, '');
        const fmStr = yaml.dump(fm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
        fs.writeFileSync(filePath, '---\n' + fmStr + '---\n' + body);
        console.log(`    Set ${f.node} -> status: expired`);
      }
    }
  }

  console.log('');
}

main();
