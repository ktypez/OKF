/**
 * OKF Dispatch — List open tasks across projects
 *
 * Reads graph.json or scans task files directly, lists open/in_progress tasks.
 *
 * Usage: node scripts/dispatch.js [project]
 */

const fs = require('fs');
const path = require('path');

const OKF_ROOT = path.resolve(__dirname, '..');
const yaml = require('js-yaml');

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
  const projectFilter = process.argv[2] || null;
  const projectsDir = path.join(OKF_ROOT, 'projects');

  const projectDirs = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  let allTasks = [];

  for (const proj of projectDirs) {
    if (projectFilter && proj !== projectFilter) continue;

    const tasksDir = path.join(projectsDir, proj, 'tasks');
    if (!fs.existsSync(tasksDir)) continue;

    const taskFiles = fs.readdirSync(tasksDir).filter(f => f.startsWith('TASK-') && f.endsWith('.md'));

    for (const tf of taskFiles) {
      const filePath = path.join(tasksDir, tf);
      const fm = readFrontmatter(filePath);
      if (!fm || !fm.id) continue;

      if (fm.status === 'closed') continue;

      allTasks.push({
        id: fm.id,
        project: proj,
        status: fm.status || 'open',
        priority: fm.priority || 'medium',
        component: fm.component || 'general',
        claimed_by: fm.claimed_by || null,
        last_updated: fm.last_updated || null,
        file: path.relative(OKF_ROOT, filePath)
      });
    }
  }

  const openTasks = allTasks.filter(t => t.status === 'open');
  const inProgressTasks = allTasks.filter(t => t.status === 'in_progress');

  console.log(`\n  OKF Dispatch — Task Overview${projectFilter ? ` (${projectFilter})` : ''}\n`);

  if (inProgressTasks.length > 0) {
    console.log(`  In Progress (${inProgressTasks.length}):\n`);
    for (const t of inProgressTasks) {
      console.log(`    [${t.project}] ${t.id} (${t.priority}, ${t.component})`);
      if (t.claimed_by) console.log(`      Claimed by: ${t.claimed_by}`);
      console.log(`      File: ${t.file}`);
      console.log('');
    }
  }

  if (openTasks.length > 0) {
    console.log(`  Open (${openTasks.length}):\n`);
    const sorted = [...openTasks].sort((a, b) => {
      const prio = { high: 0, medium: 1, low: 2 };
      return (prio[a.priority] || 1) - (prio[b.priority] || 1);
    });
    for (const t of sorted) {
      console.log(`    [${t.project}] ${t.id} (${t.priority}, ${t.component})`);
      console.log(`      File: ${t.file}`);
      console.log('');
    }
  }

  if (openTasks.length === 0 && inProgressTasks.length === 0) {
    console.log('  No open or in-progress tasks found.\n');
  }

  console.log(`  Total: ${openTasks.length} open, ${inProgressTasks.length} in progress\n`);
}

main();
