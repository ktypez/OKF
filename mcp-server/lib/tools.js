import { z } from "zod";
import * as okf from "./okf.js";
import { getDb } from "./db.js";
import { compile } from "./compiler.js";


// ── Helper: parse JSON columns ───────────────────────────

function parseJsonArray(val) {
  if (!val) return [];
  try {
    const parsed = JSON.parse(val);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatRow(row) {
  return {
    ...row,
    languages: parseJsonArray(row.languages),
    frameworks: parseJsonArray(row.frameworks),
    deployment_targets: parseJsonArray(row.deployment_targets),
    major_libraries: parseJsonArray(row.major_libraries),
    external_services: parseJsonArray(row.external_services),
    databases: parseJsonArray(row.databases),
    cloud_providers: parseJsonArray(row.cloud_providers),
    okf_tags: parseJsonArray(row.okf_tags),
  };
}

// ── Tool Registration ────────────────────────────────────

export function registerTools(server) {

  // ── 1. projects ──────────────────────────────────────────
  server.tool(
    "projects",
    "List all projects in the OKF knowledge base with metadata",
    {},
    async () => {
      const db = getDb();
      const results = db.prepare(
        "SELECT id, name, status, okf_title, okf_description, okf_tags, okf_timestamp, agent_personality, updated_at FROM projects ORDER BY id"
      ).all().map(formatRow);

      const text = results.map((p) =>
        `- **${p.okf_title || p.id}** (${p.status || "?"}) — ${p.okf_description || ""} ${p.okf_tags?.length ? `[${p.okf_tags.join(", ")}]` : ""}`
      ).join("\n");

      return {
        content: [{ type: "text", text: `# Projects (${results.length})\n\n${text || "(empty)"}` }],
      };
    }
  );

  // ── 2. project ───────────────────────────────────────────
  server.tool(
    "project",
    "Get full project details — profile, agent, status as raw markdown",
    { project: z.string().describe("Project name (e.g. truck, habby, mcky.space)") },
    async ({ project }) => {
      const profile = okf.readFile(`projects/${project}/profile.md`);
      const agent = okf.readFile(`projects/${project}/agent.md`);
      const status = okf.readFile(`projects/${project}/status.md`);
      return {
        content: [
          { type: "text", text: `# ${project}\n\n## profile.md\n\n${profile || "(not found)"}\n\n## agent.md\n\n${agent || "(not found)"}\n\n## status.md\n\n${status || "(not found)"}` },
        ],
      };
    }
  );

  // ── 3. search ────────────────────────────────────────────
  server.tool(
    "search",
    "Full-text search across all OKF content (name, description, body)",
    {
      query: z.string().describe("Search query (keywords)"),
      project: z.string().optional().describe("Limit to specific project"),
      limit: z.number().optional().describe("Max results (default: 10)"),
    },
    async ({ query, project, limit = 10 }) => {
      const db = getDb();

      const clean = query.replace(/['"*()]/g, "").trim();
      if (!clean) {
        return { content: [{ type: "text", text: "Query is empty" }] };
      }

      // LIKE search across title, description, and body fields
      const likeSql = `
        SELECT id, okf_title, okf_description, okf_tags, status
        FROM projects
        WHERE okf_title LIKE ? OR okf_description LIKE ? OR profile_body LIKE ? OR agent_body LIKE ?
        ${project ? " AND id = ?" : ""}
        LIMIT ?
      `;
      const likeParams = [`%${clean}%`, `%${clean}%`, `%${clean}%`, `%${clean}%`];
      if (project) likeParams.push(project);
      likeParams.push(limit);

      const results = db.prepare(likeSql).all(...likeParams).map(formatRow);

      if (results.length === 0) {
        return { content: [{ type: "text", text: `No results for "${query}"` }] };
      }

      const text = results.map((r) =>
        `- **${r.okf_title || r.id}** — ${r.okf_description || "(no description)"}`
      ).join("\n");

      return {
        content: [{ type: "text", text: `# Search: "${query}" (${results.length} results)\n\n${text}` }],
      };
    }
  );

  // ── 4. read ──────────────────────────────────────────────
  server.tool(
    "read",
    "Read raw content of any OKF file by relative path",
    { path: z.string().describe("Relative path from OKF root (e.g. system/conventions.md)") },
    async ({ path: filePath }) => {
      const content = okf.readFile(filePath);
      if (content === null) return { content: [{ type: "text", text: `File not found: ${filePath}` }] };
      return { content: [{ type: "text", text: content }] };
    }
  );

  // ── 5. tree ──────────────────────────────────────────────
  server.tool(
    "tree",
    "List OKF directory structure",
    { path: z.string().optional().describe("Relative path from OKF root (default: root)") },
    async ({ path: dirPath }) => {
      const entries = okf.listDir(dirPath || ".");
      const text = entries.map((e) => `${e.type === "dir" ? "[dir] " : "     "}${e.name}`).join("\n");
      return { content: [{ type: "text", text: text || "(empty)" }] };
    }
  );

  // ── 6. filter ────────────────────────────────────────────
  server.tool(
    "filter",
    "Query projects by technology, status, deployment, databases, language, or free text",
    {
      status: z.string().optional().describe("Filter by status (active, archived)"),
      framework: z.string().optional().describe("Filter by framework (e.g. React, Vite, Astro)"),
      database: z.string().optional().describe("Filter by database (e.g. Supabase, Cloudflare D1)"),
      deployment: z.string().optional().describe("Filter by deployment (e.g. Vercel, Cloudflare Pages)"),
      cloud: z.string().optional().describe("Filter by cloud provider (e.g. Supabase, Cloudflare)"),
      language: z.string().optional().describe("Filter by language (e.g. TypeScript, JavaScript)"),
      text: z.string().optional().describe("Free-text search in description + body"),
    },
    async ({ status, framework, database, deployment, cloud, language, text }) => {
      const db = getDb();
      let query = "SELECT * FROM projects WHERE 1=1";
      const params = {};

      if (status) { query += " AND status = $status"; params.$status = status; }
      if (framework) { query += " AND frameworks LIKE $framework"; params.$framework = `%${framework}%`; }
      if (database) { query += " AND databases LIKE $database"; params.$database = `%${database}%`; }
      if (deployment) { query += " AND deployment_targets LIKE $deployment"; params.$deployment = `%${deployment}%`; }
      if (cloud) { query += " AND cloud_providers LIKE $cloud"; params.$cloud = `%${cloud}%`; }
      if (language) { query += " AND languages LIKE $language"; params.$language = `%${language}%`; }
      if (text) {
        query += " AND (okf_description LIKE $text OR profile_body LIKE $text OR agent_body LIKE $text)";
        params.$text = `%${text}%`;
      }

      const results = db.prepare(query).all(params).map(formatRow);

      if (results.length === 0) {
        return { content: [{ type: "text", text: "No matching projects" }] };
      }

      const textOut = results.map((r) =>
        `- **${r.okf_title || r.id}** (${r.status || "?"})\n  Languages: ${r.languages?.join(", ") || "-"} | DB: ${r.databases?.join(", ") || "-"} | Deploy: ${r.deployment_targets?.join(", ") || "-"}`
      ).join("\n\n");

      return {
        content: [{ type: "text", text: `# Filter: ${results.length} project(s)\n\n${textOut}` }],
      };
    }
  );

  // ── 7. dashboard ─────────────────────────────────────────
  server.tool(
    "dashboard",
    "Summary table of all projects — status, tech stack, deployment, agent personality",
    {},
    async () => {
      const db = getDb();
      const projects = db.prepare(
        "SELECT id, okf_title, status, frameworks, databases, deployment_targets, agent_personality, okf_tags, okf_timestamp FROM projects ORDER BY id"
      ).all().map(formatRow);

      let text = "# OKF Dashboard\n\n";
      text += "| Project | Status | Frameworks | Databases | Deploy | Tags | Updated |\n";
      text += "|---------|--------|------------|-----------|--------|------|---------|\n";
      for (const p of projects) {
        text += `| ${p.okf_title || p.id} | ${p.status || "-"} | ${p.frameworks?.join(", ") || "-"} | ${p.databases?.join(", ") || "-"} | ${p.deployment_targets?.join(", ") || "-"} | ${p.okf_tags?.slice(0, 3).join(", ") || "-"} | ${(p.okf_timestamp || "").slice(0, 10) || "-"} |\n`;
      }

      return { content: [{ type: "text", text }] };
    }
  );

  // ── 8. stats ─────────────────────────────────────────────
  server.tool(
    "stats",
    "Cross-project statistics — counts by framework, database, deployment, cloud provider",
    {},
    async () => {
      const db = getDb();
      const rows = db.prepare(
        "SELECT frameworks, databases, deployment_targets, cloud_providers FROM projects"
      ).all();
      const stats = {
        frameworks: {},
        databases: {},
        deployment_targets: {},
        cloud_providers: {},
        total_projects: 0,
        active_projects: 0,
      };

      for (const row of rows) {
        stats.total_projects++;

        for (const f of parseJsonArray(row.frameworks)) {
          stats.frameworks[f] = (stats.frameworks[f] || 0) + 1;
        }
        for (const d of parseJsonArray(row.databases)) {
          stats.databases[d] = (stats.databases[d] || 0) + 1;
        }
        for (const dep of parseJsonArray(row.deployment_targets)) {
          stats.deployment_targets[dep] = (stats.deployment_targets[dep] || 0) + 1;
        }
        for (const c of parseJsonArray(row.cloud_providers)) {
          stats.cloud_providers[c] = (stats.cloud_providers[c] || 0) + 1;
        }
      }

      // Count active
      const activeRow = db.prepare("SELECT COUNT(*) as count FROM projects WHERE status = 'active'").get();
      stats.active_projects = activeRow ? activeRow.count : 0;

      return { content: [{ type: "text", text: JSON.stringify(stats, null, 2) }] };
    }
  );

  // ── 9. graph ─────────────────────────────────────────────
  server.tool(
    "graph",
    "Mermaid knowledge graph showing projects and their technology relationships",
    { filter: z.string().optional().describe("Filter by entity type (database, framework, deployment, etc.)") },
    async ({ filter }) => {
      const db = getDb();

      // Get all projects + their entities via edges
      let edgeSql = `
        SELECT e.source_id as project, e.target_type as entity_type, e.target_id as entity_name, e.relation
        FROM edges e
        JOIN projects p ON p.id = e.source_id
      `;
      if (filter) {
        edgeSql += " WHERE e.target_type = ?";
      }
      edgeSql += " ORDER BY e.source_id";

      const edges = filter
        ? db.prepare(edgeSql).all(filter)
        : db.prepare(edgeSql).all();

      if (edges.length === 0) {
        return { content: [{ type: "text", text: "No graph data available. Run `rebuild` first." }] };
      }

      // Build Mermaid graph
      const projectSet = new Set();
      const entityMap = {}; // type -> names

      for (const e of edges) {
        projectSet.add(e.project);
        if (!entityMap[e.entity_type]) entityMap[e.entity_type] = new Set();
        entityMap[e.entity_type].add(e.entity_name);
      }

      let mermaid = "graph TB\n";

      // Project nodes
      mermaid += "  subgraph Projects\n";
      for (const p of projectSet) {
        mermaid += `    ${p.replace(/[.\s-]/g, "_")}["${p}"]\n`;
      }
      mermaid += "  end\n\n";

      // Entity subgraphs by type
      for (const [type, names] of Object.entries(entityMap)) {
        const safeType = type.replace(/[.\s-]/g, "_");
        mermaid += `  subgraph ${safeType}[${type.toUpperCase()}]\n`;
        for (const name of names) {
          const safeName = `${safeType}_${name.replace(/[.\s+()]/g, "_").replace(/_+/g, "_")}`;
          const displayName = name.length > 25 ? name.slice(0, 22) + "..." : name;
          if (type === "database") {
            mermaid += `    ${safeName}[("${displayName}")]\n`;
          } else {
            mermaid += `    ${safeName}["${displayName}"]\n`;
          }
        }
        mermaid += "  end\n\n";
      }

      // Edges
      for (const e of edges) {
        const source = e.project.replace(/[.\s-]/g, "_");
        const safeType = e.entity_type.replace(/[.\s-]/g, "_");
        const safeName = `${safeType}_${e.entity_name.replace(/[.\s+()]/g, "_").replace(/_+/g, "_")}`;
        mermaid += `  ${source} -->|${e.relation}| ${safeName}\n`;
      }

      return { content: [{ type: "text", text: mermaid }] };
    }
  );

  // ── 10. rebuild ──────────────────────────────────────────
  server.tool(
    "rebuild",
    "Force recompile the OKF knowledge base from .md files into the compiled SQLite index",
    {
      strict: z.boolean().optional().describe("Fail on validation errors (default: false)"),
      commit: z.boolean().optional().describe("Auto-commit changes to git (default: true)"),
    },
    async ({ strict = false, commit = true } = {}) => {
      try {
        const result = await compile({ strict, commit });
        return {
          content: [{ type: "text", text: `## Rebuild complete\n\n- Status: ${result.status}\n- Files changed: ${result.changed}\n- Warnings: ${result.errors}${result.errorDetails?.length ? "\n\n### Warnings\n" + result.errorDetails.join("\n") : ""}` }],
        };
      } catch (err) {
        return {
          content: [{ type: "text", text: `## Rebuild failed\n\n${err.message}` }],
          isError: true,
        };
      }
    }
  );


}
