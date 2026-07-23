import fs from "fs";
import path from "path";
import { getOkfRoot } from "./okf.js";
import { getDb } from "./db.js";

// ── Helpers ──────────────────────────────────────────────

function parseJson(val) {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}

function isoNow() {
  return new Date().toISOString();
}

// ── Build Graph JSON ─────────────────────────────────────

export function buildGraphJson() {
  const db = getDb();

  // 1. Projects
  const projectRows = db.prepare("SELECT * FROM projects ORDER BY id").all();
  const projects = projectRows.map((r) => ({
    id: r.id,
    name: r.name,
    display_name: r.display_name,
    description: r.description || r.okf_description,
    purpose: r.purpose,
    repository: r.repository,
    owner: r.owner,
    status: r.status,
    last_updated: r.last_updated,
    languages: parseJson(r.languages),
    frameworks: parseJson(r.frameworks),
    databases: parseJson(r.databases),
    deployment_targets: parseJson(r.deployment_targets),
    cloud_providers: parseJson(r.cloud_providers),
    agent_personality: r.agent_personality,
    source_path: r.source_path,
    okf_type: r.okf_type,
    okf_title: r.okf_title,
    okf_tags: parseJson(r.okf_tags),
    okf_timestamp: r.okf_timestamp,
    // bodies for wiki view
    profile_body: r.profile_body || "",
    agent_body: r.agent_body || "",
    status_body: r.status_body || "",
  }));

  // 2. Entities
  const entityRows = db.prepare("SELECT * FROM entities ORDER BY type, name").all();
  const entities = entityRows.map((r) => ({
    id: r.id,
    name: r.name,
    type: r.type,
    usage_count: r.usage_count,
  }));

  // 3. Edges (resolve project names to simplify frontend consumption)
  const edgeRows = db.prepare(`
    SELECT e.source_type, e.source_id, e.target_type, e.target_id, e.relation
    FROM edges e
    ORDER BY e.source_id
  `).all();
  const edges = edgeRows.map((r) => ({
    source: r.source_id,
    source_type: r.source_type,
    target: r.target_id,
    target_type: r.target_type,
    relation: r.relation,
  }));

  // 4. Tags index: tag → [projectId]
  const tagsIndex = {};
  for (const p of projects) {
    for (const tag of p.okf_tags) {
      const key = tag.toLowerCase();
      if (!tagsIndex[key]) tagsIndex[key] = [];
      if (!tagsIndex[key].includes(p.id)) tagsIndex[key].push(p.id);
    }
  }

  // 5. Entity → projects index
  const entityProjects = {};
  for (const e of edges) {
    const key = `${e.target_type}:${e.target}`;
    if (!entityProjects[key]) entityProjects[key] = [];
    if (!entityProjects[key].includes(e.source)) entityProjects[key].push(e.source);
  }
  const entitiesWithProjects = entities.map((e) => ({
    ...e,
    projects_using: entityProjects[`${e.type}:${e.name}`] || [],
  }));

  // 6. Stats
  const stats = {
    projects: projects.length,
    entities: entities.length,
    edges: edges.length,
    active_projects: projects.filter((p) => p.status === "active").length,
    framework_count: entities.filter((e) => e.type === "framework").length,
    database_count: entities.filter((e) => e.type === "database").length,
    language_count: entities.filter((e) => e.type === "language").length,
    deploy_count: entities.filter((e) => e.type === "deployment").length,
  };

  const graph = {
    generated_at: isoNow(),
    okf_version: "0.1",
    stats,
    projects,
    entities: entitiesWithProjects,
    edges,
    tags_index: tagsIndex,
  };

  return graph;
}

// ── Render: write to file ────────────────────────────────

export function render({ output } = {}) {
  const graph = buildGraphJson();

  const outPath = output
    ? path.resolve(output)
    : path.join(getOkfRoot(), "mcp-server", "out", "graph.json");

  const dir = path.dirname(outPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outPath, JSON.stringify(graph, null, 2), "utf-8");

  console.log(`[render] wrote ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);

  return {
    path: outPath,
    size_bytes: fs.statSync(outPath).size,
    ...graph.stats,
  };
}

// ── CLI ──────────────────────────────────────────────────

if (process.argv[1] && process.argv[1].endsWith("render.js")) {
  const outputIndex = process.argv.indexOf("--output");
  const output = outputIndex !== -1 ? process.argv[outputIndex + 1] : undefined;
  const result = render({ output });
  console.log(JSON.stringify(result, null, 2));
}
