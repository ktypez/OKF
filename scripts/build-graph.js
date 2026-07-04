/**
 * OKF Graph Indexer
 * Reads all .md files in ~/OKF/, extracts frontmatter, builds a graph registry.
 *
 * ID resolution: IDs may repeat across projects (e.g., DEC-001 in cafe and clientdata).
 * The graph builder uses composite keys (project/id) internally but displays the bare ID.
 * Link targets are resolved with project-awareness: a link from project X prefers a node
 * in project X with the same bare ID.
 *
 * Usage: node scripts/build-graph.js
 * Output: writes ~/OKF/graph.json
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const OKF_ROOT = path.resolve(__dirname, '..');
const GRAPH_OUT = path.join(OKF_ROOT, 'graph.json');

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

function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  try {
    const fm = yaml.load(match[1]);
    return fm || {};
  } catch (err) {
    console.warn(`  ⚠ YAML error in ${path.relative(OKF_ROOT, filePath)}: ${err.message}`);
    return {};
  }
}

// Composite key = "project/id" for project nodes, or "id" for global nodes
function compositeKey(id, project) {
  return project ? `${project}/${id}` : id;
}

function buildGraph() {
  const files = walkDir(OKF_ROOT);
  const nodes = [];
  const warnings = [];
  // nodeMap: compositeKey → node (exact match)
  const nodeMap = {};
  // bareIndex: bare ID → [{node, compositeKey}] (for disambiguation)
  const bareIndex = {};
  const projectNodes = {};

  // First pass: read all files and index everything
  for (const filePath of files) {
    const relPath = path.relative(OKF_ROOT, filePath);
    const fm = parseFrontmatter(filePath);
    if (!fm || Object.keys(fm).length === 0) continue;

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

    const links = rawLinks.map(link => {
      if (typeof link === 'string') return { type: 'relates-to', target: link };
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

    const ck = compositeKey(id, project);
    nodeMap[ck] = node;

    if (!bareIndex[id]) bareIndex[id] = [];
    bareIndex[id].push({ node, ck });

    if (project) {
      if (!projectNodes[project]) projectNodes[project] = [];
      projectNodes[project].push(node);
    }
  }

  // Second pass: resolve link targets with project-awareness
  for (const node of nodes) {
    for (const link of node.links) {
      const target = link.target;
      if (typeof target !== 'string') continue;

      const candidates = bareIndex[target];
      if (!candidates || candidates.length === 0) {
        warnings.push(`${node.id} → ${target} (not found)`);
        continue;
      }

      if (candidates.length === 1) {
        // Unique — resolve directly
        link._composite = candidates[0].ck;
        continue;
      }

      // Multiple candidates — prefer same project
      const sameProject = candidates.filter(c => c.node.project === node.project);
      if (sameProject.length === 1) {
        link._composite = sameProject[0].ck;
      } else if (sameProject.length > 1) {
        warnings.push(`${node.id} → ${target} (${sameProject.length} matches in ${node.project})`);
        link._composite = sameProject[0].ck;
      } else {
        // Cross-project reference — still resolve to the first one but warn
        warnings.push(`${node.id} → ${target} (cross-project: ${candidates.map(c => c.node.project).join(', ')})`);
        link._composite = candidates[0].ck;
      }
    }
  }

  // Build edges from resolved links
  const edges = [];
  for (const node of nodes) {
    for (const link of node.links) {
      const ck = link._composite;
      if (ck && nodeMap[ck]) {
        edges.push({
          source: node.id,
          sourceProject: node.project,
          target: nodeMap[ck].id,
          targetProject: nodeMap[ck].project,
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
    for (const n of projNodes) byType[n.type] = (byType[n.type] || 0) + 1;
    projectSummaries[proj] = { node_count: projNodes.length, by_type: byType };
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
    console.log('\nWarnings:');
    for (const w of warnings) console.log(`  ⚠ ${w}`);
  }
}

buildGraph();
