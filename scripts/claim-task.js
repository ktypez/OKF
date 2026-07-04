/**
 * OKF Claim Task — Atomically claim a task
 *
 * Usage: node scripts/claim-task.js <TASK-ID>
 *
 * Sets claimed_by: agent in the task frontmatter.
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
  if (!match) return { content };
  try {
    const yaml = require('js-yaml');
    return { fm: yaml.load(match[1]) || {}, body: content.substring(match[0].length), full: content };
  } catch {
    return { content };
  }
}

function writeFrontmatter(filePath, fm, body) {
  const yaml = require('js-yaml');
  const fmStr = yaml.dump(fm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
  fs.writeFileSync(filePath, '---\n' + fmStr + '---\n' + body);
}

function main() {
  const taskId = process.argv[2];
  if (!taskId) {
    console.error('Usage: node scripts/claim-task.js <TASK-ID>');
    console.error('Example: node scripts/claim-task.js TASK-001');
    process.exit(1);
  }

  const graph = loadGraph();
  const taskNode = graph.nodes.find(n => n.id === taskId);
  if (!taskNode) {
    console.error(`Task ${taskId} not found in graph.`);
    process.exit(1);
  }
  if (taskNode.type !== 'task') {
    console.error(`${taskId} is not a task (type: ${taskNode.type}).`);
    process.exit(1);
  }
  if (taskNode.status !== 'open') {
    console.error(`${taskId} is not open (status: ${taskNode.status}).`);
    process.exit(1);
  }

  const taskFile = path.join(OKF_ROOT, taskNode.file);
  const result = readFrontmatter(taskFile);

  if (!result.fm) {
    console.error(`Cannot parse frontmatter for ${taskFile}`);
    process.exit(1);
  }

  // Check if already claimed
  if (result.fm.claimed_by && result.fm.claimed_by !== 'null' && result.fm.claimed_by !== null) {
    console.error(`${taskId} is already claimed by ${result.fm.claimed_by}.`);
    process.exit(1);
  }

  // Claim it
  result.fm.claimed_by = 'agent';
  result.fm.status = 'in_progress';
  result.fm.last_updated = new Date().toISOString().split('T')[0];

  writeFrontmatter(taskFile, result.fm, result.body);

  console.log(`Claimed ${taskId} (${taskNode.project}) — status: in_progress`);

  // Show linked context
  const edges = graph.edges.filter(e => e.source === taskId && e.sourceProject === taskNode.project);
  if (edges.length > 0) {
    console.log('\nRelevant context:');
    for (const edge of edges) {
      const target = graph.nodes.find(n => n.id === edge.target);
      if (target) {
        console.log(`  ${edge.type} → ${target.id} (${target.file})`);
      }
    }
  }

  // Rebuild graph
  console.log('\nRebuilding graph...');
  require(path.join(__dirname, 'build-graph.js'));
}

main();
