/**
 * OKF Complete Task — Close a claimed task and record lesson
 *
 * Usage: node scripts/complete-task.js <TASK-ID> "<lesson learned>"
 *
 * Sets status: closed, records the lesson as a new LSN node.
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
  if (!match) return { error: 'no frontmatter' };
  try {
    const yaml = require('js-yaml');
    return { fm: yaml.load(match[1]) || {}, body: content.substring(match[0].length), full: content };
  } catch (e) {
    return { error: e.message };
  }
}

function writeFrontmatter(filePath, fm, body) {
  const yaml = require('js-yaml');
  const fmStr = yaml.dump(fm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
  fs.writeFileSync(filePath, '---\n' + fmStr + '---\n' + body);
}

function getNextId(project, prefix, graph) {
  const existing = graph.nodes
    .filter(n => n.project === project && n.id.startsWith(prefix))
    .map(n => parseInt(n.id.split('-')[1], 10))
    .filter(n => !isNaN(n));
  const max = existing.length > 0 ? Math.max(...existing) : 0;
  return prefix + '-' + String(max + 1).padStart(3, '0');
}

function main() {
  const taskId = process.argv[2];
  const lesson = process.argv[3] || '';

  if (!taskId) {
    console.error('Usage: node scripts/complete-task.js <TASK-ID> ["lesson learned"]');
    process.exit(1);
  }

  const graph = loadGraph();
  const taskNode = graph.nodes.find(n => n.id === taskId);
  if (!taskNode) {
    console.error(`Task ${taskId} not found.`);
    process.exit(1);
  }

  const taskFile = path.join(OKF_ROOT, taskNode.file);
  const result = readFrontmatter(taskFile);

  if (result.error) {
    console.error(`Cannot parse ${taskFile}: ${result.error}`);
    process.exit(1);
  }

  // Close the task
  const today = new Date().toISOString().split('T')[0];
  result.fm.status = 'closed';
  result.fm.closed = today;
  result.fm.last_updated = today;

  writeFrontmatter(taskFile, result.fm, result.body);

  console.log(`Completed ${taskId} (${taskNode.project})`);

  // Record lesson if provided
  if (lesson) {
    const lsnId = getNextId(taskNode.project, 'LSN', graph);
    const lsnFile = path.join(OKF_ROOT, 'projects', taskNode.project, 'knowledge', lsnId + '.md');

    const lsnFm = {
      type: 'lesson',
      id: lsnId,
      project: taskNode.project,
      last_updated: today,
      status: 'active',
      freshness: today,
      verified: today,
      expires: null,
      superseded_by: null,
      anchors: [],
      links: [
        { type: 'caused-by', target: taskId }
      ]
    };

    const yaml = require('js-yaml');
    const fmStr = yaml.dump(lsnFm, { lineWidth: 120 });
    fs.writeFileSync(lsnFile, '---\n' + fmStr + '---\n\n' + lesson + '\n');

    console.log(`Recorded ${lsnId} in projects/${taskNode.project}/knowledge/${lsnId}.md`);
  }

  // Rebuild graph
  console.log('Rebuilding graph...');
  require(path.join(__dirname, 'build-graph.js'));
}

main();
