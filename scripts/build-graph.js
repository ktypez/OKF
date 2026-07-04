/**
 * OKF Graph Indexer
 * Reads all .md files in ~/OKF/, extracts frontmatter, builds a graph registry.
 *
 * Usage: node scripts/build-graph.js
 * Output: writes ~/OKF/graph.json
 *
 * The graph.json is the single fast-lookup registry for agent context injection.
 * It contains all nodes, their link edges, and validation warnings.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const OKF_ROOT = path.resolve(__dirname, '..');
const GRAPH_OUT = path.join(OKF_ROOT, 'graph.json');

// Walk directory recursively, return all .md file paths
function walkDir(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '.next') continue;
      files.push(...walkDir(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Parse YAML frontmatter from a markdown file using js-yaml
function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  try {
    const fm = yaml.load(match[1]);
    return fm || {};
  } catch (err) {
    console.warn(`  ⚠ YAML parse error in ${path.relative(OKF_ROOT, filePath)}: ${err.message}`);
    return {};
  }
}

function buildGraph() {
  const files = walkDir(OKF_ROOT);
  const nodes = [];
  const warnings = [];
  const nodeMap = {};
  const projectNodes = {};

  for (const filePath of files) {
    const relPath = path.relative(OKF_ROOT, filePath);
    const fm = parseFrontmatter(filePath);

    if (!fm || Object.keys(fm).length === 0) {
      continue;
    }

    const id = fm.id || relPath.replace(/\.md$/, '').replace(/\//g, '-');
    const type = fm.type || 'unknown';
    const project = fm.project || null;
    const status = fm.status || 'active';
    const freshness = fm.freshness || null;
    const verified = fm.verified || null;
    const expires = fm.expires || null;
    const supersededBy = fm.superseded_by || null;
    const anchors = Array.isArray(fm.anchors) ? fm.anchors : [];
    const rawLinks = Array.isArray(fm.links) ? fm.links : [];
    const personality = fm.personality || null;
    const name = fm.name || null;
    const description = fm.description || null;

    // Normalize links
    const links = rawLinks.map(link => {
      if (typeof link === 'string') {
        return { type: 'relates-to', target: link };
      }
      return {
        type: link.type || 'relates-to',
        target: link.target || 'unknown'
      };
    });

    const node = {
      id,
      type,
      project,
      file: relPath,
      status,
      freshness,
      verified,
      expires,
      superseded_by: supersededBy,
      anchors,
      links,
      personality,
      name,
      description,
      last_updated: fm.last_updated || null
    };

    nodes.push(node);
    nodeMap[id] = node;

    if (project && !projectNodes[project]) projectNodes[project] = [];
    if (project) projectNodes[project].push(node);
  }

  // Validate links — check targets exist, try project-prefixed resolution
  for (const node of nodes) {
    for (const link of node.links) {
      const target = link.target;
      if (typeof target !== 'string') continue;

      if (!nodeMap[target]) {
        // Try project-prefixed resolution
        let found = false;
        if (node.project) {
          // Check if target starts with a known project name
          for (const proj of Object.keys(projectNodes)) {
            const prefixed = `${proj}/${target}`.replace(/\/\//g, '/');
            if (nodeMap[prefixed]) {
              link.target = prefixed;
              found = true;
              break;
            }
          }
        }
        if (!found) {
          warnings.push(`${node.id} → ${target} (target not found in graph)`);
        }
      }
    }
  }

  // Build edges list from resolved links
  const edges = [];
  for (const node of nodes) {
    for (const link of node.links) {
      const target = link.target;
      if (typeof target === 'string' && nodeMap[target]) {
        edges.push({
          source: node.id,
          target: target,
          type: link.type || 'relates-to',
          label: link.type || 'relates-to'
        });
      }
    }
  }

  // Per-project summaries
  const projectSummaries = {};
  for (const [proj, projNodes] of Object.entries(projectNodes)) {
    const byType = {};
    for (const n of projNodes) {
      byType[n.type] = (byType[n.type] || 0) + 1;
    }
    projectSummaries[proj] = {
      node_count: projNodes.length,
      by_type: byType
    };
  }

  const graph = {
    meta: {
      generated: new Date().toISOString(),
      total_nodes: nodes.length,
      total_edges: edges.length,
      warnings: warnings.length
    },
    warnings,
    nodes,
    edges,
    projects: projectSummaries
  };

  fs.writeFileSync(GRAPH_OUT, JSON.stringify(graph, null, 2), 'utf-8');
  console.log(`OKF graph built: ${nodes.length} nodes, ${edges.length} edges, ${warnings.length} warnings`);
  console.log(`Output: ${GRAPH_OUT}`);

  if (warnings.length > 0) {
    console.log('\nWarnings (broken links):');
    for (const w of warnings) {
      console.log(`  ⚠ ${w}`);
    }
  }
}

buildGraph();
