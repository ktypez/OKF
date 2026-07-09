import { z } from "zod";
import * as okf from "./okf.js";

export function registerTools(server) {
  server.tool(
    "okf_list_projects",
    "List all projects in the OKF knowledge base with node counts",
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
    "Get project metadata — profile, agent, status content",
    { project: z.string().describe("Project name") },
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
    "okf_query_nodes",
    "Query knowledge nodes by type, status, or project",
    {
      project: z.string().optional().describe("Filter by project name"),
      type: z.string().optional().describe("Filter by node type (decision, lesson, component, etc.)"),
      status: z.string().optional().describe("Filter by status (active, expired, superseded, archived)"),
    },
    async ({ project, type, status }) => {
      const nodes = okf.queryNodes({ project, type, status });
      return { content: [{ type: "text", text: JSON.stringify(nodes, null, 2) }] };
    }
  );

  server.tool(
    "okf_get_node",
    "Get a single knowledge node by ID — returns frontmatter + body",
    {
      project: z.string().describe("Project name"),
      id: z.string().describe("Node ID (e.g. DEC-001, LSN-003)"),
    },
    async ({ project, id }) => {
      const node = okf.getNode(project, id);
      if (!node) return { content: [{ type: "text", text: `Node ${id} not found in ${project}` }] };
      return {
        content: [
          {
            type: "text",
            text: `# ${node.frontmatter.id} (${node.frontmatter.type})\n\n${JSON.stringify(node.frontmatter, null, 2)}\n\n---\n\n${node.body}`,
          },
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
    "okf_create_node",
    "Create a new knowledge node with auto-generated ID",
    {
      project: z.string().describe("Project name"),
      type: z.string().describe("Node type (decision, lesson, component, document, risk)"),
      title: z.string().describe("Node title"),
      body: z.string().describe("Markdown body content"),
      links: z.array(z.object({ type: z.string(), target: z.string() })).optional().describe("Links to other nodes"),
    },
    async ({ project, type, title, body, links }) => {
      const node = okf.createNode({ project, type, title, body, links: links || [] });
      return { content: [{ type: "text", text: `Created ${node.id} at ${node.file}\n\n${JSON.stringify(node.frontmatter, null, 2)}` }] };
    }
  );

  server.tool(
    "okf_update_node",
    "Update frontmatter fields and/or body of a knowledge node",
    {
      project: z.string().describe("Project name"),
      id: z.string().describe("Node ID"),
      patch: z.record(z.string(), z.any()).describe("Fields to update"),
      body: z.string().optional().describe("New body content (replaces entire body)"),
    },
    async ({ project, id, patch, body }) => {
      const update = { ...patch };
      if (body !== undefined) update.body = body;
      const node = okf.updateNode(project, id, update);
      if (!node) return { content: [{ type: "text", text: `Node ${id} not found in ${project}` }] };
      return { content: [{ type: "text", text: `Updated ${node.id}\n\n${JSON.stringify(node.frontmatter, null, 2)}` }] };
    }
  );

  server.tool(
    "okf_update_status",
    "Set status on a knowledge node (active, expired, superseded, archived)",
    {
      project: z.string().describe("Project name"),
      id: z.string().describe("Node ID"),
      status: z.string().describe("New status"),
    },
    async ({ project, id, status }) => {
      const node = okf.updateStatus(project, id, status);
      if (!node) return { content: [{ type: "text", text: `Node ${id} not found in ${project}` }] };
      return { content: [{ type: "text", text: `Set ${node.id} -> ${status}` }] };
    }
  );

  server.tool(
    "okf_add_edge",
    "Add a typed link between two nodes",
    {
      project: z.string().describe("Project name"),
      id: z.string().describe("Source node ID"),
      type: z.string().describe("Link type (relates-to, supersedes, caused-by, blocks, fulfills, documents, depends-on, part-of)"),
      target: z.string().describe("Target node ID"),
    },
    async ({ project, id, type, target }) => {
      const result = okf.addEdge(project, id, type, target);
      if (!result) return { content: [{ type: "text", text: `Node ${id} not found in ${project}` }] };
      return { content: [{ type: "text", text: result.note || `Added ${type} -> ${target} to ${id}` }] };
    }
  );

  server.tool(
    "okf_doctor",
    "Run knowledge lifecycle audit — find stale, expired, superseded nodes",
    { project: z.string().optional().describe("Limit to project") },
    async ({ project }) => {
      const result = okf.doctor(project);
      let text = `Scanned ${result.total_nodes} nodes, ${result.findings.length} findings, ${result.auto_fixed} auto-fixed\n\n`;
      for (const f of result.findings) {
        text += `[${f.severity}] ${f.project}/${f.node}: ${f.message}\n`;
      }
      if (result.findings.length === 0) text += "Clean bill of health.\n";
      return { content: [{ type: "text", text }] };
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
}
