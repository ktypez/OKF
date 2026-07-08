/**
 * OKF Read Tools for MCP Server
 * Tools for reading data from the OKF knowledge base
 */

import { z } from "zod";
import { GitHubAPI } from "../github";
import { parseOKFFile, compositeKey } from "../parser";

interface OKFNode {
  id: string;
  type: string;
  project: string | null;
  file: string;
  status: string;
  freshness: string | null;
  verified: string | null;
  expires: string | null;
  superseded_by: string | null;
  anchors: string[];
  links: Array<{ type: string; target: string }>;
  description?: string;
  last_updated?: string;
}

/**
 * Register all OKF read tools to the MCP server
 */
export function registerReadTools(
  server: {
    registerTool: (
      name: string,
      config: Record<string, unknown>,
      handler: (args: Record<string, unknown>) => Promise<unknown>
    ) => void;
  },
  getGitHub: () => GitHubAPI
) {
  // Tool: List all projects
  server.registerTool(
    "okf_list_projects",
    {
      description: "List all projects in the OKF knowledge base",
      inputSchema: {},
    },
    async () => {
      try {
        const tree = await getGitHub().getTree();
        const projectDirs = tree
          .filter((item) => item.type === "tree" && item.path.startsWith("projects/"))
          .map((item) => item.path.replace("projects/", "").split("/")[0])
          .filter((value, index, self) => self.indexOf(value) === index);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(projectDirs, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error listing projects: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  // Tool: Get project metadata
  server.registerTool(
    "okf_get_project",
    {
      description: "Get metadata for a specific project (profile, agent, status)",
      inputSchema: {
        name: z.string().describe("Project name"),
      },
    },
    async ({ name }: { name: string }) => {
      try {
        const results: Record<string, unknown> = {};

        // Try to get profile
        try {
          const profile = await getGitHub().getFile(`projects/${name}/profile.md`);
          results.profile = parseOKFFile(profile.content);
        } catch {
          // Profile not found
        }

        // Try to get agent
        try {
          const agent = await getGitHub().getFile(`projects/${name}/agent.md`);
          results.agent = parseOKFFile(agent.content);
        } catch {
          // Agent not found
        }

        // Try to get status
        try {
          const status = await getGitHub().getFile(`projects/${name}/status.md`);
          results.status = parseOKFFile(status.content);
        } catch {
          // Status not found
        }

        // Try to get todos
        try {
          const todos = await getGitHub().getFile(`projects/${name}/todos.md`);
          results.todos = parseOKFFile(todos.content);
        } catch {
          // Todos not found
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error getting project: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  // Tool: Query nodes by type/status/project
  server.registerTool(
    "okf_query_nodes",
    {
      description: "Query knowledge nodes by type, status, or project",
      inputSchema: {
        type: z.string().optional().describe("Node type (decision, lesson, risk, task, etc.)"),
        status: z.string().optional().describe("Node status (active, open, closed, etc.)"),
        project: z.string().optional().describe("Project name"),
      },
    },
    async ({ type, status, project }: { type?: string; status?: string; project?: string }) => {
      try {
        const tree = await getGitHub().getTree();
        const mdFiles = tree.filter(
          (item) =>
            item.type === "blob" &&
            item.path.endsWith(".md") &&
            !item.path.startsWith(".") &&
            item.path !== "index.md" &&
            item.path !== "README.md"
        );

        const nodes: OKFNode[] = [];

        // Sample up to 50 files to query (API limit consideration)
        const filesToQuery = mdFiles.slice(0, 50);

        for (const file of filesToQuery) {
          try {
            const content = await getGitHub().getFile(file.path);
            const parsed = parseOKFFile(content.content);

            if (parsed.frontmatter.id) {
              const node: OKFNode = {
                id: parsed.frontmatter.id,
                type: parsed.frontmatter.type || "unknown",
                project: parsed.frontmatter.project || null,
                file: file.path,
                status: parsed.frontmatter.status || "active",
                freshness: parsed.frontmatter.freshness || null,
                verified: parsed.frontmatter.verified || null,
                expires: parsed.frontmatter.expires || null,
                superseded_by: parsed.frontmatter.superseded_by || null,
                anchors: Array.isArray(parsed.frontmatter.anchors) ? parsed.frontmatter.anchors : [],
                links: Array.isArray(parsed.frontmatter.links) ? parsed.frontmatter.links : [],
                description: parsed.frontmatter.description || undefined,
                last_updated: parsed.frontmatter.last_updated || undefined,
              };

              // Apply filters
              if (type && node.type !== type) continue;
              if (status && node.status !== status) continue;
              if (project && node.project !== project) continue;

              nodes.push(node);
            }
          } catch {
            // Skip files that can't be read
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(nodes, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error querying nodes: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  // Tool: Get a specific node by ID
  server.registerTool(
    "okf_get_node",
    {
      description: "Get a specific knowledge node by its ID",
      inputSchema: {
        id: z.string().describe("Node ID (e.g., DEC-001, TASK-001)"),
      },
    },
    async ({ id }: { id: string }) => {
      try {
        const tree = await getGitHub().getTree();
        const mdFiles = tree.filter(
          (item) =>
            item.type === "blob" &&
            item.path.endsWith(".md") &&
            !item.path.startsWith(".")
        );

        for (const file of mdFiles) {
          try {
            const content = await getGitHub().getFile(file.path);
            const parsed = parseOKFFile(content.content);

            if (parsed.frontmatter.id === id) {
              return {
                content: [
                  {
                    type: "text",
                    text: JSON.stringify(
                      {
                        id: parsed.frontmatter.id,
                        type: parsed.frontmatter.type,
                        project: parsed.frontmatter.project,
                        status: parsed.frontmatter.status,
                        file: file.path,
                        frontmatter: parsed.frontmatter,
                        body: parsed.body,
                      },
                      null,
                      2
                    ),
                  },
                ],
              };
            }
          } catch {
            // Skip files that can't be read
          }
        }

        return {
          content: [
            {
              type: "text",
              text: `Node with ID "${id}" not found`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error getting node: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  // Tool: Search knowledge base
  server.registerTool(
    "okf_search",
    {
      description: "Search across all OKF knowledge base files",
      inputSchema: {
        query: z.string().describe("Search query"),
        limit: z.number().optional().describe("Max results (default 20)"),
      },
    },
    async ({ query, limit = 20 }: { query: string; limit?: number }) => {
      try {
        // Use GitHub search API
        const searchResults = await getGitHub().searchFiles(query);

        // Also search in common knowledge directories
        const tree = await getGitHub().getTree();
        const mdFiles = tree.filter(
          (item) =>
            item.type === "blob" &&
            item.path.endsWith(".md") &&
            !item.path.startsWith(".")
        );

        const results: { path: string; relevance: number }[] = [];

        // Check search API results
        for (const result of searchResults.slice(0, limit)) {
          results.push({ path: result.path, relevance: result.score });
        }

        // If no results from search API, do simple text matching
        if (results.length === 0) {
          const filesToCheck = mdFiles.slice(0, 100); // Limit files to check
          for (const file of filesToCheck) {
            try {
              const content = await getGitHub().getFile(file.path);
              const lowerContent = content.content.toLowerCase();
              const lowerQuery = query.toLowerCase();

              if (lowerContent.includes(lowerQuery)) {
                results.push({ path: file.path, relevance: 1 });
              }
            } catch {
              // Skip files that can't be read
            }

            if (results.length >= limit) break;
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(results.slice(0, limit), null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error searching: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  // Tool: Get file content
  server.registerTool(
    "okf_get_file",
    {
      description: "Get raw content of a specific file from OKF repository",
      inputSchema: {
        path: z.string().describe("File path relative to OKF root"),
      },
    },
    async ({ path }: { path: string }) => {
      try {
        const file = await getGitHub().getFile(path);
        return {
          content: [
            {
              type: "text",
              text: file.content,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error getting file: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );
}