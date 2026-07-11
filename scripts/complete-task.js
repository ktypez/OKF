/**
 * OKF Complete Task — Close a task and optionally record a lesson
 *
 * Sets status to "closed", records closed date, creates LSN node
 * if a lesson string is provided, rebuilds graph.
 *
 * Usage: node scripts/complete-task.js <TASK-ID> "[lesson notes]"
 */

const fs = require('fs');
const path = require('path');

const OKF_ROOT = path.resolve(__dirname, '..');
const yaml = require('js-yaml');

function findTaskFile(taskId) {
  const projectsDir = path.join(OKF_ROOT, 'projects');
  const dirs = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const proj of dirs) {
    const taskPath = path.join(projectsDir, proj, 'tasks', taskId + '.md');
    if (fs.existsSync(taskPath)) return { path: taskPath, project: proj };
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

function getNextId(project, prefix) {
  const baseDir = path.join(OKF_ROOT, 'projects', project);
  const dirs = ['knowledge', 'tasks'];
  let maxNum = 0;

  for (const dir of dirs) {
    const fullDir = path.join(baseDir, dir);
    if (!fs.existsSync(fullDir)) continue;
    const files = fs.readdirSync(fullDir).filter(f => f.startsWith(prefix + '-') && f.endsWith('.md'));
    for (const f of files) {
      const num = parseInt(f.replace(prefix + '-', '').replace('.md', ''), 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  }

  return prefix + '-' + String(maxNum + 1).padStart(3, '0');
}

function main() {
  const taskId = process.argv[2];
  const lessonArg = process.argv[3];

  if (!taskId) {
    console.error('Usage: node scripts/complete-task.js <TASK-ID> ["lesson notes"]');
    process.exit(1);
  }

  const found = findTaskFile(taskId);
  if (!found) {
    console.error(`Task ${taskId} not found`);
    process.exit(1);
  }

  const { path: filePath, project } = found;
  const { fm, body } = readFullFile(filePath);
  if (!fm) {
    console.error(`Invalid frontmatter in ${filePath}`);
    process.exit(1);
  }

  const today = new Date().toISOString().split('T')[0];
  fm.status = 'closed';
  fm.closed = today;
  fm.last_updated = today;
  fm.freshness = today;
  fm.verified = today;

  const fmStr = yaml.dump(fm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
  fs.writeFileSync(filePath, '---\n' + fmStr + '---\n' + (body ? '\n' + body + '\n' : '\n'));

  console.log(`\n  Closed ${taskId}\n`);

  if (lessonArg) {
    const lsnId = getNextId(project, 'LSN');
    const knowledgeDir = path.join(OKF_ROOT, 'projects', project, 'knowledge');
    if (!fs.existsSync(knowledgeDir)) fs.mkdirSync(knowledgeDir, { recursive: true });

    const lsnPath = path.join(knowledgeDir, lsnId + '.md');
    const lsnFm = {
      type: 'lesson',
      id: lsnId,
      project,
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

    const lsnStr = yaml.dump(lsnFm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
    const lesson = lessonArg.replace(/^["']|["']$/g, '');
    fs.writeFileSync(lsnPath, '---\n' + lsnStr + '---\n\n# ' + lsnId + ': ' + lesson + '\n');
    console.log(`  Created ${lsnId}: ${lesson}\n`);
  }

  console.log(`  Project: ${project}`);
  console.log(`  File: ${path.relative(OKF_ROOT, filePath)}\n`);

  const { execSync } = require('child_process');
  try {
    execSync('node ' + path.join(__dirname, 'build-graph.js'), { stdio: 'inherit' });
  } catch {
    console.log('  (graph rebuild skipped)\n');
  }
}

main();
