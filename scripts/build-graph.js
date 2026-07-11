/**
 * OKF Graph Builder — Build graph.json from KB .md files
 *
 * Scans all project .md files with frontmatter, extracts nodes + edges,
 * writes graph.json for use by dispatch, dashboard, and kb-ops tools.
 *
 * Usage: node scripts/build-graph.js
 */

const fs = require('fs');
const path = require('path');

const OKF_ROOT = path.resolve(__dirname, '..');
const yaml = require('js-yaml');

function walkMd(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
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

function main() {
  const projectsDir = path.join(OKF_ROOT, 'projects');
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
  }

  const projectDirs = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const nodes = [];
  const edges = [];

  for (const proj of projectDirs) {
    const projDir = path.join(projectsDir, proj);
    const mdFiles = walkMd(projDir);

    for (const filePath of mdFiles) {
      const fm = readFrontmatter(filePath);
      if (!fm || !fm.id) continue;

      const relPath = path.relative(OKF_ROOT, filePath);
      const nodeType = fm.type || 'document';

      nodes.push({
        id: fm.id,
        project: proj,
        type: nodeType,
        status: fm.status || 'active',
        file: relPath,
        last_updated: fm.last_updated || null,
        freshness: fm.freshness || null,
        verified: fm.verified || null,
        expires: fm.expires || null,
        superseded_by: fm.superseded_by || null,
        title: fm.title || fm.id
      });

      if (fm.links && Array.isArray(fm.links)) {
        for (const link of fm.links) {
          edges.push({
            source: fm.id,
            target: link.target,
            type: link.type || 'relates-to',
            project: proj
          });
        }
      }

      if (fm.superseded_by) {
        edges.push({
          source: fm.id,
          target: fm.superseded_by,
          type: 'superseded-by',
          project: proj
        });
      }
    }
  }

  const graph = {
    meta: {
      built: new Date().toISOString(),
      nodeCount: nodes.length,
      edgeCount: edges.length,
      projects: projectDirs
    },
    nodes,
    edges
  };

  const outPath = path.join(OKF_ROOT, 'graph.json');
  fs.writeFileSync(outPath, JSON.stringify(graph, null, 2));
  console.log(`\n  OKF Graph Builder\n`);
  console.log(`  Nodes: ${nodes.length}, Edges: ${edges.length}`);
  console.log(`  Projects: ${projectDirs.join(', ')}`);
  console.log(`  Written to: graph.json\n`);
}

main();
