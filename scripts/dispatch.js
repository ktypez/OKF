/**
 * OKF Dispatch — Operator Agent
 *
 * Lists open tasks across all projects, shows context, claims one atomically.
 *
 * Usage: node scripts/dispatch.js [project]
 *   If project is specified, only show tasks for that project.
 *   Otherwise, show all open tasks.
 */

const fs = require('fs');
const path = require('path');

const OKF_ROOT = path.resolve(__dirname, '..');
const GRAPH_PATH = path.join(OKF_ROOT, 'graph.json');

function loadGraph() {
  return JSON.parse(fs.readFileSync(GRAPH_PATH, 'utf-8'));
}

// Find the task file path from its node entry
function resolveTaskFile(node) {
  return path.join(OKF_ROOT, node.file);
}

// Read and parse frontmatter from a markdown file
function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  try {
    const yaml = require('js-yaml');
    return yaml.load(match[1]) || {};
  } catch {
    return {};
  }
}

// Write frontmatter back to a markdown file
function writeFrontmatter(filePath, fm, body) {
  const yaml = require('js-yaml');
  const fmStr = yaml.dump(fm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
  fs.writeFileSync(filePath, '---\n' + fmStr + '---\n' + body);
}

function main() {
  const projectFilter = process.argv[2] || null;
  const graph = loadGraph();
  const nodeMap = {};
  for (const node of graph.nodes) nodeMap[node.id] = node;

  // Find open tasks
  const openTasks = graph.nodes.filter(n => {
    if (n.type !== 'task') return false;
    if (n.status !== 'open') return false;
    if (projectFilter && n.project !== projectFilter) return false;
    return true;
  });

  if (openTasks.length === 0) {
    const scope = projectFilter ? ` in ${projectFilter}` : '';
    console.log(`No open tasks${scope}.`);
    return;
  }

  // Sort by priority
  const priorityRank = { high: 0, medium: 1, low: 2 };
  openTasks.sort((a, b) => {
    const pa = priorityRank[a.description?.toLowerCase()] ?? 1;
    const pb = priorityRank[b.description?.toLowerCase()] ?? 1;
    return pa - pb;
  });

  console.log(`\n  Open Tasks (${openTasks.length}):\n`);

  for (const task of openTasks) {
    const taskFile = resolveTaskFile(task);
    const fm = readFrontmatter(taskFile);

    // Read the body to get the description
    const content = fs.readFileSync(taskFile, 'utf-8');
    const bodyMatch = content.match(/^---[\s\S]*?---\n\n([\s\S]*)/);
    const body = bodyMatch ? bodyMatch[1].trim() : '';

    const priority = fm.priority || 'medium';
    const component = fm.component || 'general';

    console.log(`  [${task.project}] ${task.id} (${priority}, ${component})`);
    console.log(`  ${body.split('\n')[0] || ''}`);
    console.log('');

    // Show linked knowledge (decisions, lessons, risks)
    const links = graph.edges.filter(e => e.source === task.id && e.sourceProject === task.project);
    if (links.length > 0) {
      console.log('    Context:');
      for (const link of links) {
        const target = nodeMap[link.target];
        if (target) {
          console.log(`      ${link.type} → ${target.id} (${target.type})`);
        }
      }
      console.log('');
    }

    console.log(`    File: ${task.file}`);
    console.log('');
  }

  // Prompt to claim
  if (process.stdout.isTTY) {
    console.log('  Type the task ID to claim it (or press Enter to skip):');
    // Readline input not available in all contexts, so we just display
  }

  console.log('  To claim a task, run: node scripts/claim-task.js <TASK-ID>');
}

main();
