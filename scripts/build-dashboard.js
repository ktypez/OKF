/**
 * OKF Dashboard Builder — Generate HTML dashboard from graph.json
 *
 * Reads graph.json and generates a static HTML dashboard page.
 *
 * Usage: node scripts/build-dashboard.js
 */

const fs = require('fs');
const path = require('path');

const OKF_ROOT = path.resolve(__dirname, '..');
const GRAPH_PATH = path.join(OKF_ROOT, 'graph.json');
const DASHBOARD_PATH = path.join(OKF_ROOT, 'dashboard.html');

function main() {
  if (!fs.existsSync(GRAPH_PATH)) {
    console.error('graph.json not found. Run build-graph.js first.');
    process.exit(1);
  }

  const graph = JSON.parse(fs.readFileSync(GRAPH_PATH, 'utf-8'));
  const { nodes, edges, meta } = graph;

  const byProject = {};
  const byType = {};
  const byStatus = {};

  for (const node of nodes) {
    byProject[node.project] = (byProject[node.project] || 0) + 1;
    byType[node.type] = (byType[node.type] || 0) + 1;
    byStatus[node.status] = (byStatus[node.status] || 0) + 1;
  }

  const staleNodes = nodes.filter(n => {
    if (!n.freshness) return true;
    const days = Math.floor((Date.now() - new Date(n.freshness).getTime()) / 86400000);
    return days >= 30;
  });

  const expiredNodes = nodes.filter(n => n.expires && n.expires < new Date().toISOString().split('T')[0]);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OKF Dashboard</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0d1117; color: #c9d1d9; padding: 2rem; }
  h1 { color: #58a6ff; margin-bottom: 0.5rem; }
  .meta { color: #8b949e; font-size: 0.9rem; margin-bottom: 2rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .card { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 1.25rem; }
  .card h2 { color: #58a6ff; font-size: 1rem; margin-bottom: 0.75rem; }
  .card .stat { display: flex; justify-content: space-between; padding: 0.25rem 0; font-size: 0.9rem; }
  .card .stat .label { color: #8b949e; }
  .status-ok { color: #3fb950; }
  .status-warn { color: #d29922; }
  .status-err { color: #f85149; }
  table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  th { text-align: left; color: #8b949e; padding: 0.5rem; border-bottom: 1px solid #30363d; }
  td { padding: 0.5rem; border-bottom: 1px solid #21262d; }
  tr:hover { background: #1c2128; }
  .badge { display: inline-block; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.75rem; }
  .badge-active { background: #003d1f; color: #3fb950; }
  .badge-expired { background: #3d0000; color: #f85149; }
  .badge-superseded { background: #3d2e00; color: #d29922; }
  .badge-closed { background: #1f3d00; color: #7ee787; }
  .badge-archived { background: #21262d; color: #8b949e; }
</style>
</head>
<body>
<h1>OKF Dashboard</h1>
<p class="meta">Built: ${meta.built} | ${meta.nodeCount} nodes, ${meta.edgeCount} edges, ${meta.projects.length} projects</p>

<div class="grid">
  <div class="card">
    <h2>Nodes by Project</h2>
    ${Object.entries(byProject).sort((a, b) => b[1] - a[1]).map(([proj, count]) =>
      `<div class="stat"><span class="label">${proj}</span><span>${count}</span></div>`
    ).join('')}
  </div>
  <div class="card">
    <h2>Nodes by Type</h2>
    ${Object.entries(byType).sort((a, b) => b[1] - a[1]).map(([type, count]) =>
      `<div class="stat"><span class="label">${type}</span><span>${count}</span></div>`
    ).join('')}
  </div>
  <div class="card">
    <h2>Nodes by Status</h2>
    ${Object.entries(byStatus).sort((a, b) => b[1] - a[1]).map(([status, count]) =>
      `<div class="stat"><span class="label">${status}</span><span>${count}</span></div>`
    ).join('')}
  </div>
  <div class="card">
    <h2>Health</h2>
    <div class="stat"><span class="label">Stale (30+ days)</span><span class="${staleNodes.length > 0 ? 'status-warn' : 'status-ok'}">${staleNodes.length}</span></div>
    <div class="stat"><span class="label">Expired</span><span class="${expiredNodes.length > 0 ? 'status-err' : 'status-ok'}">${expiredNodes.length}</span></div>
    <div class="stat"><span class="label">Edges</span><span>${edges.length}</span></div>
  </div>
</div>

<h2>All Nodes</h2>
<table>
<thead><tr><th>ID</th><th>Project</th><th>Type</th><th>Status</th><th>Freshness</th></tr></thead>
<tbody>
${nodes.sort((a, b) => a.id.localeCompare(b.id)).map(n => {
  const statusClass = n.status === 'expired' ? 'expired' : n.status === 'superseded' ? 'superseded' : n.status === 'closed' ? 'closed' : n.status === 'archived' ? 'archived' : 'active';
  return `<tr><td><a href="${n.file}" style="color:#58a6ff">${n.id}</a></td><td>${n.project}</td><td>${n.type}</td><td><span class="badge badge-${statusClass}">${n.status}</span></td><td>${n.freshness || '—'}</td></tr>`;
}).join('')}
</tbody>
</table>
</body>
</html>`;

  fs.writeFileSync(DASHBOARD_PATH, html);
  console.log(`\n  OKF Dashboard Builder\n`);
  console.log(`  Dashboard written to: dashboard.html\n`);
}

main();
