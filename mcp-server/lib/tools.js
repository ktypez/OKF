import { z } from "zod";
import * as okf from "./okf.js";
import { getDb, saveDb, closeDb } from "./db.js";

export function registerTools(server) {
  // Existing tools
  server.tool(
    "okf_list_projects",
    "List all projects in the OKF knowledge base with file counts",
    {},
    async () => {
      const projects = okf.listProjects();
      const result = [];
      for (const proj of projects) {
        const files = okf.getProjectFiles(proj);
        result.push({ project: proj, files: files.length });
      }
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "okf_get_project",
    "Get project metadata — profile, agent, status",
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

  server.tool(
    "okf_search",
    "Full-text search across all OKF markdown files",
    {
      query: z.string().describe("Search query"),
      project: z.string().optional().describe("Limit to project"),
    },
    async ({ query, project }) => {
      const results = okf.searchNodes(query, project);
      return { content: [{ type: "text", text: JSON.stringify(results, null, 2) }] };
    }
  );

  server.tool(
    "okf_get_file",
    "Get raw content of any OKF file by relative path",
    { path: z.string().describe("Relative path from OKF root (e.g. system/conventions.md)") },
    async ({ path: filePath }) => {
      const content = okf.readFile(filePath);
      if (content === null) return { content: [{ type: "text", text: `File not found: ${filePath}` }] };
      return { content: [{ type: "text", text: content }] };
    }
  );

  server.tool(
    "okf_list_dir",
    "List OKF directory structure",
    { path: z.string().optional().describe("Relative path from OKF root (default: root)") },
    async ({ path: dirPath }) => {
      const entries = okf.listDir(dirPath || ".");
      const text = entries.map((e) => `${e.type === "dir" ? "[dir] " : "     "}${e.name}`).join("\n");
      return { content: [{ type: "text", text: text || "(empty)" }] };
    }
  );

  // New tools — SQLite-based queries
  server.tool(
    "okf_query_projects",
    "Query projects by technology, status, deployment, databases, etc.",
    {
      status: z.string().optional().describe("Filter by status (active, archived)"),
      framework: z.string().optional().describe("Filter by framework (e.g. React, Vite, Astro)"),
      database: z.string().optional().describe("Filter by database (e.g. Supabase, Cloudflare D1)"),
      deployment: z.string().optional().describe("Filter by deployment target (e.g. Vercel, Cloudflare Pages)"),
      cloud: z.string().optional().describe("Filter by cloud provider (e.g. Supabase, Cloudflare)"),
      language: z.string().optional().describe("Filter by language (e.g. TypeScript, JavaScript)"),
    },
    async ({ status, framework, database, deployment, cloud, language }) => {
      const db = await getDb();
      let query = "SELECT * FROM projects WHERE 1=1";
      const params = {};

      if (status) {
        query += " AND status = $status";
        params.$status = status;
      }
      if (framework) {
        query += " AND frameworks LIKE $framework";
        params.$framework = `%${framework}%`;
      }
      if (database) {
        query += " AND databases LIKE $database";
        params.$database = `%${database}%`;
      }
      if (deployment) {
        query += " AND deployment_targets LIKE $deployment";
        params.$deployment = `%${deployment}%`;
      }
      if (cloud) {
        query += " AND cloud_providers LIKE $cloud";
        params.$cloud = `%${cloud}%`;
      }
      if (language) {
        query += " AND languages LIKE $language";
        params.$language = `%${language}%`;
      }

      const stmt = db.prepare(query);
      stmt.bind(params);
      const results = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        // Parse JSON arrays
        results.push({
          ...row,
          languages: JSON.parse(row.languages || "[]"),
          frameworks: JSON.parse(row.frameworks || "[]"),
          deployment_targets: JSON.parse(row.deployment_targets || "[]"),
          major_libraries: JSON.parse(row.major_libraries || "[]"),
          external_services: JSON.parse(row.external_services || "[]"),
          databases: JSON.parse(row.databases || "[]"),
          cloud_providers: JSON.parse(row.cloud_providers || "[]"),
        });
      }
      stmt.free();
      return { content: [{ type: "text", text: JSON.stringify(results, null, 2) }] };
    }
  );

  server.tool(
    "okf_dashboard",
    "Get summary of all projects — status, tech stack, deployment",
    {},
    async () => {
      const db = await getDb();
      const stmt = db.prepare("SELECT id, name, status, frameworks, databases, deployment_targets, agent_personality FROM projects ORDER BY id");
      const projects = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        projects.push({
          id: row.id,
          name: row.name,
          status: row.status,
          frameworks: JSON.parse(row.frameworks || "[]"),
          databases: JSON.parse(row.databases || "[]"),
          deployment_targets: JSON.parse(row.deployment_targets || "[]"),
          agent_personality: row.agent_personality,
        });
      }
      stmt.free();

      // Format as markdown table
      let text = "# OKF Dashboard\n\n";
      text += "| Project | Status | Frameworks | Databases | Deploy | Agent |\n";
      text += "|---------|--------|------------|-----------|--------|-------|\n";
      for (const p of projects) {
        text += `| ${p.id} | ${p.status} | ${p.frameworks.join(", ") || "-"} | ${p.databases.join(", ") || "-"} | ${p.deployment_targets.join(", ") || "-"} | ${p.agent_personality || "-"} |\n`;
      }

      return { content: [{ type: "text", text }] };
    }
  );

  server.tool(
    "okf_project_stats",
    "Get statistics across all projects — counts by framework, database, deployment",
    {},
    async () => {
      const db = await getDb();
      const stmt = db.prepare("SELECT frameworks, databases, deployment_targets, cloud_providers FROM projects");
      const stats = {
        frameworks: {},
        databases: {},
        deployment_targets: {},
        cloud_providers: {},
        total_projects: 0,
        active_projects: 0,
      };

      while (stmt.step()) {
        const row = stmt.getAsObject();
        stats.total_projects++;

        const frameworks = JSON.parse(row.frameworks || "[]");
        for (const f of frameworks) {
          stats.frameworks[f] = (stats.frameworks[f] || 0) + 1;
        }

        const databases = JSON.parse(row.databases || "[]");
        for (const d of databases) {
          stats.databases[d] = (stats.databases[d] || 0) + 1;
        }

        const deployments = JSON.parse(row.deployment_targets || "[]");
        for (const dep of deployments) {
          stats.deployment_targets[dep] = (stats.deployment_targets[dep] || 0) + 1;
        }

        const clouds = JSON.parse(row.cloud_providers || "[]");
        for (const c of clouds) {
          stats.cloud_providers[c] = (stats.cloud_providers[c] || 0) + 1;
        }
      }
      stmt.free();

      // Get active count
      const activeStmt = db.prepare("SELECT COUNT(*) as count FROM projects WHERE status = 'active'");
      activeStmt.step();
      stats.active_projects = activeStmt.getAsObject().count;
      activeStmt.free();

      return { content: [{ type: "text", text: JSON.stringify(stats, null, 2) }] };
    }
  );
}
