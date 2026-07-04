/**
 * OKF Dashboard Builder
 * Generates a self-contained HTML dashboard from graph.json.
 *
 * Usage: node scripts/build-dashboard.js
 * Output: ~/OKF/dashboard.html
 */

const fs = require('fs');
const path = require('path');

const OKF_ROOT = path.resolve(__dirname, '..');
const GRAPH_PATH = path.join(OKF_ROOT, 'graph.json');
const OUT_PATH = path.join(OKF_ROOT, 'dashboard.html');

const graph = JSON.parse(fs.readFileSync(GRAPH_PATH, 'utf-8'));

const typeColors = {
  'decision': '#f59e0b',
  'lesson': '#10b981',
  'risk': '#ef4444',
  'task': '#3b82f6',
  'document': '#8b5cf6',
  'component': '#ec4899',
  'agent-profile': '#6366f1',
  'project-profile': '#14b8a6',
  'project-status': '#f97316'
};

const edgeColors = {
  'relates-to': '#94a3b8',
  'documents': '#8b5cf6',
  'supersedes': '#f59e0b',
  'caused-by': '#10b981',
  'blocks': '#ef4444',
  'fulfills': '#3b82f6',
  'depends-on': '#f97316',
  'part-of': '#ec4899',
  'contradicts': '#ef4444'
};

const nodesJson = JSON.stringify(graph.nodes.map(n => ({
  id: n.id,
  type: n.type,
  project: n.project,
  status: n.status,
  file: n.file,
  color: typeColors[n.type] || '#64748b'
})));

const edgesJson = JSON.stringify(graph.edges);
const projectsJson = JSON.stringify(Object.entries(graph.projects).map(([k, v]) => ({ name: k, ...v })));

// Generate the HTML as a buffer-safe template (no template literal conflict)
let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OKF Dashboard</title>
<script src="https://cdn.jsdelivr.net/npm/d3@7">
<\/script>
<style>
  :root {
    --bg: #0f172a;
    --surface: #1e293b;
    --surface-2: #334155;
    --border: #475569;
    --text: #f1f5f9;
    --text-muted: #94a3b8;
    --accent: #3b82f6;
    --accent-hover: #60a5fa;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    background: var(--bg); color: var(--text);
    display: flex; height: 100vh; overflow: hidden;
  }
  .sidebar {
    width: 320px; background: var(--surface);
    border-right: 1px solid var(--border); display: flex;
    flex-direction: column; overflow: hidden;
  }
  .sidebar-header {
    padding: 16px; border-bottom: 1px solid var(--border);
  }
  .sidebar-header h1 { font-size: 18px; display: flex; align-items: center; gap: 8px; }
  .sidebar-header .meta { font-size: 12px; color: var(--text-muted); margin-top: 4px; }
  .sidebar-nav {
    padding: 8px; display: flex; gap: 4px; flex-wrap: wrap;
    border-bottom: 1px solid var(--border);
  }
  .sidebar-nav button {
    background: var(--surface-2); border: none; color: var(--text);
    padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;
  }
  .sidebar-nav button:hover { background: var(--accent); }
  .sidebar-nav button.active { background: var(--accent); }
  .sidebar-content { flex: 1; overflow-y: auto; padding: 8px; }
  .node-list { list-style: none; }
  .node-item {
    padding: 8px 12px; border-radius: 6px; cursor: pointer;
    display: flex; align-items: center; gap: 8px; font-size: 13px;
    border: 1px solid transparent; margin-bottom: 2px;
  }
  .node-item:hover { background: var(--surface-2); }
  .node-item.selected { border-color: var(--accent); background: rgba(59,130,246,0.1); }
  .node-item .id { font-weight: 600; color: var(--accent); }
  .node-item .project { font-size: 11px; color: var(--text-muted); }
  .node-item .status-badge {
    font-size: 10px; padding: 1px 6px; border-radius: 3px;
    margin-left: auto; text-transform: uppercase;
  }
  .status-badge.active { background: rgba(16,185,129,0.2); color: #10b981; }
  .status-badge.open { background: rgba(59,130,246,0.2); color: #3b82f6; }
  .status-badge.closed { background: rgba(148,163,184,0.2); color: #94a3b8; }
  .status-badge.superseded { background: rgba(245,158,11,0.2); color: #f59e0b; }
  .status-badge.expired { background: rgba(239,68,68,0.2); color: #ef4444; }
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .graph-container { flex: 1; position: relative; }
  #graph { width: 100%; height: 100%; }
  .node-info {
    height: 220px; border-top: 1px solid var(--border);
    background: var(--surface); padding: 16px; overflow-y: auto;
  }
  .node-info h2 { font-size: 16px; margin-bottom: 8px; }
  .node-info .field { font-size: 13px; margin: 4px 0; color: var(--text-muted); }
  .node-info .field strong { color: var(--text); }
  .node-info .links-list { margin-top: 8px; }
  .node-info .link-item {
    display: inline-block; font-size: 12px; padding: 2px 8px;
    border-radius: 4px; margin: 2px;
  }
  .search-box { padding: 8px; border-bottom: 1px solid var(--border); }
  .search-box input {
    width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border);
    background: var(--surface-2); color: var(--text); font-size: 13px;
  }
  .search-box input:focus { outline: none; border-color: var(--accent); }
  .stats-bar {
    display: flex; gap: 16px; padding: 8px 16px;
    border-bottom: 1px solid var(--border); font-size: 12px; color: var(--text-muted);
  }
  .stats-bar strong { color: var(--text); }
  .tooltip {
    position: absolute; padding: 8px 12px; border-radius: 6px;
    background: var(--surface-2); border: 1px solid var(--border);
    font-size: 12px; pointer-events: none; display: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
<\/style>
</head>
<body>
<div class="sidebar">
  <div class="sidebar-header">
    <h1>OKF Dashboard</h1>
    <div class="meta">${graph.meta.total_nodes} nodes · ${graph.meta.total_edges} edges · ${Object.keys(graph.projects).length} projects</div>
  </div>
  <div class="search-box">
    <input type="text" id="search" placeholder="Search nodes..." oninput="filterNodes(this.value)">
  </div>
  <div class="sidebar-nav" id="filterBar">
    <button class="active" onclick="setFilter('all')">All</button>
    <button onclick="setFilter('active')">Active</button>
    <button onclick="setFilter('open')">Open Tasks</button>
    <button onclick="setFilter('risk')">Risks</button>
    ${Object.entries(graph.projects).map(([k]) => `<button onclick="setFilter('project:${k}')">${k}</button>`).join('')}
  </div>
  <div class="sidebar-content" id="nodeList">
    <div class="loading">Loading...</div>
  </div>
</div>
<div class="main">
  <div class="stats-bar" id="statsBar"></div>
  <div class="graph-container">
    <div id="graph"></div>
    <div class="tooltip" id="tooltip"></div>
  </div>
  <div class="node-info" id="nodeInfo">
    <div style="color: var(--text-muted); text-align: center; padding: 20px;">Select a node to see details</div>
  </div>
</div>

<script>
const nodes = ${nodesJson};
const allEdges = ${edgesJson};
const projectNames = ${projectsJson};
const edgeColors = ${JSON.stringify(edgeColors)};

const nodeMap = {};
nodes.forEach(n => nodeMap[n.id] = n);

const edgeIndex = {};
allEdges.forEach(e => {
  if (!edgeIndex[e.source]) edgeIndex[e.source] = [];
  edgeIndex[e.source].push(e);
  if (!edgeIndex[e.target]) edgeIndex[e.target] = [];
  edgeIndex[e.target].push({ source: e.target, target: e.source, type: e.type, label: e.label });
});

let currentFilter = 'all';
let selectedNode = null;

function escape(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function getStatusClass(s) { return s || 'active'; }

function getTypeIcon(type) {
  const icons = {
    'decision': '🧠', 'lesson': '📖', 'risk': '⚠️', 'task': '✅',
    'document': '📄', 'component': '🏗️', 'agent-profile': '🤖',
    'project-profile': '📋', 'project-status': '📊', 'index': '📑',
    'system-doc': '🔧', 'skill': '🛠️', 'instruction': '📝',
    'workspace-index': '📌', 'goal': '🎯', 'gap': '🔍', 'diagram': '📐'
  };
  return icons[type] || '📄';
}

function filterNodes(q) {
  const items = document.querySelectorAll('.node-item');
  const search = q.toLowerCase();
  items.forEach(item => {
    const text = item.dataset.search.toLowerCase();
    const matchesFilter = matchesCurrentFilter(item.dataset);
    const matchesSearch = !search || text.includes(search);
    item.style.display = (matchesFilter && matchesSearch) ? '' : 'none';
  });
  updateStats();
}

function matchesCurrentFilter(data) {
  if (currentFilter === 'all') return true;
  if (currentFilter === 'active') return data.status === 'active';
  if (currentFilter === 'open') return data.type === 'task' && data.status === 'open';
  if (currentFilter === 'risk') return data.type === 'risk';
  if (currentFilter.startsWith('project:')) return data.project === currentFilter.replace('project:', '');
  return true;
}

function setFilter(f) {
  document.querySelectorAll('.sidebar-nav button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  currentFilter = f;
  const search = document.getElementById('search').value;
  filterNodes(search);
}

function renderList(nodesList) {
  const list = document.getElementById('nodeList');
  list.innerHTML = '<ul class="node-list">' + nodesList.map(n => {
    const searchText = n.id + ' ' + n.type + ' ' + (n.project || '') + ' ' + (n.status || '');
    return '<li class="node-item" data-id="' + n.id + '" data-project="' + (n.project || '') + '" data-type="' + n.type + '" data-status="' + n.status + '" data-search="' + escape(searchText) + '" onclick="selectNode(\'' + n.id + '\')">' +
      '<span style="font-size:16px;">' + getTypeIcon(n.type) + '</span>' +
      '<span class="id">' + n.id + '</span>' +
      '<span style="color:var(--text-muted);font-size:12px;">' + n.type + '</span>' +
      '<span class="project">' + (n.project || '') + '</span>' +
      '<span class="status-badge ' + getStatusClass(n.status) + '">' + (n.status || 'active') + '</span>' +
      '</li>';
  }).join('') + '</ul>';
  updateStats();
}

function updateStats() {
  const visible = document.querySelectorAll('.node-item:not([style*="display: none"])');
  const stats = document.getElementById('statsBar');
  const byType = {};
  visible.forEach(item => {
    const type = item.dataset.type;
    byType[type] = (byType[type] || 0) + 1;
  });
  const parts = Object.entries(byType).map(([t, c]) => '<strong>' + c + '</strong> ' + t);
  stats.innerHTML = 'Showing <strong>' + visible.length + '</strong> nodes &mdash; ' + parts.join(' · ');
}

function selectNode(id) {
  selectedNode = id;
  document.querySelectorAll('.node-item').forEach(i => i.classList.toggle('selected', i.dataset.id === id));
  const node = nodeMap[id];
  if (!node) return;

  const related = (edgeIndex[id] || []).map(e => {
    const other = e.source === id ? nodeMap[e.target] : nodeMap[e.source];
    return { ...e, other };
  }).filter(e => e.other);

  const info = document.getElementById('nodeInfo');
  let html = '<h2>' + getTypeIcon(node.type) + ' ' + node.id + ' <span style="font-weight:400;color:var(--text-muted);font-size:14px;">' + node.type + '</span></h2>';
  html += '<div class="field"><strong>Project:</strong> ' + (node.project || '(global)') + '</div>';
  html += '<div class="field"><strong>Status:</strong> <span class="status-badge ' + getStatusClass(node.status) + '">' + (node.status || 'active') + '</span></div>';
  html += '<div class="field"><strong>File:</strong> <code style="font-size:12px;background:var(--surface-2);padding:2px 6px;border-radius:3px;">' + escape(node.file) + '</code></div>';
  if (node.freshness) html += '<div class="field"><strong>Freshness:</strong> ' + node.freshness + '</div>';
  if (node.verified) html += '<div class="field"><strong>Verified:</strong> ' + node.verified + '</div>';
  if (node.expires) html += '<div class="field"><strong>Expires:</strong> ' + node.expires + '</div>';
  if (node.superseded_by) html += '<div class="field"><strong>Superseded by:</strong> ' + node.superseded_by + '</div>';
  if (related.length > 0) {
    html += '<div class="links-list"><strong>Links:</strong><br>';
    html += related.map(e => {
      const color = edgeColors[e.type] || '#94a3b8';
      return '<span class="link-item" style="background:' + color + '22;border:1px solid ' + color + ';color:' + color + ';cursor:pointer;" onclick="selectNode(\'' + e.other.id + '\')">' + e.type + ' → ' + e.other.id + '</span>';
    }).join(' ');
    html += '</div>';
  }
  info.innerHTML = html;
}

function renderGraph() {
  const container = document.getElementById('graph');
  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = d3.select('#graph').append('svg')
    .attr('width', width).attr('height', height)
    .style('background', 'var(--bg)');

  const g = svg.append('g');

  const zoom = d3.zoom()
    .scaleExtent([0.1, 4])
    .on('zoom', (event) => g.attr('transform', event.transform));
  svg.call(zoom);

  // Filter out meta-nodes for cleaner graph
  const skipTypes = ['system-doc', 'skill', 'instruction', 'index', 'workspace-index'];
  const activeNodes = nodes.filter(n => !skipTypes.includes(n.type));
  const nodeIds = new Set(activeNodes.map(n => n.id));
  const visibleEdges = allEdges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));

  const sim = d3.forceSimulation(activeNodes)
    .force('link', d3.forceLink(visibleEdges).id(d => d.id).distance(100).strength(0.2))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(25));

  const link = g.append('g')
    .selectAll('line').data(visibleEdges).join('line')
    .attr('stroke', d => (edgeColors[d.type] || '#94a3b8') + '44')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', d => d.type === 'relates-to' ? '4,4' : 'none');

  const node = g.append('g')
    .selectAll('g').data(activeNodes).join('g')
    .call(d3.drag()
      .on('start', (event, d) => { if (!event.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on('end', (event, d) => { if (!event.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
    )
    .on('click', (event, d) => { selectNode(d.id); });

  node.append('circle')
    .attr('r', d => d.type === 'task' ? 8 : d.type === 'decision' ? 10 : d.type === 'risk' ? 8 : 6)
    .attr('fill', d => d.color + '88')
    .attr('stroke', d => d.color)
    .attr('stroke-width', 2);

  node.append('text')
    .text(d => getTypeIcon(d.type))
    .attr('x', 10).attr('y', 4).attr('font-size', 12);

  node.append('text')
    .text(d => d.id)
    .attr('x', 24).attr('y', 4)
    .attr('font-size', 10)
    .attr('fill', 'var(--text-muted)')
    .style('pointer-events', 'none');

  sim.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    node.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
  });
}

renderList(nodes);
renderGraph();

window.addEventListener('resize', () => {
  const svg = document.querySelector('#graph svg');
  if (svg) {
    svg.setAttribute('width', document.getElementById('graph').clientWidth);
    svg.setAttribute('height', document.getElementById('graph').clientHeight);
  }
});
<\/script>
</body>
</html>`;

fs.writeFileSync(OUT_PATH, html);
console.log(`Dashboard generated: ${OUT_PATH}`);
console.log(`  ${graph.meta.total_nodes} nodes, ${graph.meta.total_edges} edges`);
