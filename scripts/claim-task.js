/**
 * OKF Claim Task — Atomically claim a task
 *
 * Sets status to "in_progress", claimed_by to current agent,
 * updates timestamps, rebuilds graph.
 *
 * Usage: node scripts/claim-task.js <TASK-ID>
 */

const fs = require('fs');
const path = require('path');

const OKF_ROOT = path.resolve(__dirname, '..');
const yaml = require('js-yaml');

const VALID_PREFIXES = ['TASK'];

function findTaskFile(taskId) {
  const prefix = taskId.replace(/-\d+$/, '');
  if (!VALID_PREFIXES.includes(prefix)) return null;

  const projectsDir = path.join(OKF_ROOT, 'projects');
  const dirs = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const proj of dirs) {
    const taskPath = path.join(projectsDir, proj, 'tasks', taskId + '.md');
    if (fs.existsSync(taskPath)) return taskPath;
  }
  return null;
}

function readFullFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { fm: null, body: content };
  try {
    return { fm: yaml.load(match[1]), body: (match[2] || '').trim() };
  } catch {
    return { fm: null, body: content };
  }
}

function main() {
  const taskId = process.argv[2];
  if (!taskId) {
    console.error('Usage: node scripts/claim-task.js <TASK-ID>');
    process.exit(1);
  }

  const filePath = findTaskFile(taskId);
  if (!filePath) {
    console.error(`Task ${taskId} not found`);
    process.exit(1);
  }

  const { fm, body } = readFullFile(filePath);
  if (!fm) {
    console.error(`Invalid frontmatter in ${filePath}`);
    process.exit(1);
  }

  if (fm.status === 'in_progress') {
    console.log(`Task ${taskId} is already claimed by ${fm.claimed_by || 'unknown'}`);
    process.exit(0);
  }

  if (fm.status === 'closed') {
    console.log(`Task ${taskId} is already closed`);
    process.exit(0);
  }

  const today = new Date().toISOString().split('T')[0];
  fm.status = 'in_progress';
  fm.claimed_by = 'agent';
  fm.last_updated = today;
  fm.freshness = today;
  fm.verified = today;

  const fmStr = yaml.dump(fm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
  fs.writeFileSync(filePath, '---\n' + fmStr + '---\n' + (body ? '\n' + body + '\n' : '\n'));

  console.log(`\n  Claimed ${taskId}\n`);
  console.log(`  Status: in_progress`);
  console.log(`  File: ${path.relative(OKF_ROOT, filePath)}\n`);

  const { execSync } = require('child_process');
  try {
    execSync('node ' + path.join(__dirname, 'build-graph.js'), { stdio: 'inherit' });
  } catch {
    console.log('  (graph rebuild skipped)\n');
  }
}

main();
