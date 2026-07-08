/**
 * OKF Write Tools for MCP Server
 * Tools for creating and modifying knowledge nodes
 */

import { z } from "zod";
import { GitHubAPI } from "../github";
import { parseOKFFile, serializeOKFFile, OKFFrontmatter } from "../parser";

/**
 * Register all OKF write tools to the MCP server
 */
export function registerWriteTools(
  server: {
    registerTool: (
      name: string,
      config: Record<string, unknown>,
      handler: (args: Record<string, unknown>) => Promise<unknown>
    ) => void;
  },
  getGitHub: () => GitHubAPI
) {
  // Tool: Create a new knowledge node
  server.registerTool(
    "okf_create_node",
    {
      description: "Create a new knowledge node (decision, lesson, risk, task, etc.)",
      inputSchema: {
        type: z.string().describe("Node type (decision, lesson, risk, task, document, component)"),
        project: z.string().describe("Project name"),
        title: z.string().describe("Node title (will be used in heading)"),
        content: z.string().describe("Markdown content for the node body"),
        id: z.string().optional().describe("Custom ID (auto-generated if not provided)"),
        priority: z.string().optional().describe("Priority (high, medium, low)"),
        component: z.string().optional().describe("Component name"),
        status: z.string().optional().describe("Initial status (default: active)"),
      },
    },
    async ({ type, project, title, content, id, priority, component, status }: Record<string, unknown>) => {
      try {
        // Generate ID if not provided
        const nodeId = (id as string) || `${(type as string).substring(0, 3).toUpperCase()}-${Date.now()}`;

        // Build frontmatter
        const frontmatter: OKFFrontmatter = {
          type: type as string,
          id: nodeId,
          project: project as string,
          last_updated: new Date().toISOString().split("T")[0],
          status: (status as string) || "active",
          freshness: new Date().toISOString().split("T")[0],
          verified: new Date().toISOString().split("T")[0],
          expires: null,
          superseded_by: null,
          anchors: [],
          links: [],
        };

        if (priority) frontmatter.priority = priority as string;
        if (component) frontmatter.component = component as string;

        // Build body
        const body = `\n# ${nodeId}: ${title}\n\n${content}\n`;

        // Serialize to OKF format
        const fileContent = serializeOKFFile(frontmatter, body);

        // Determine file path
        const filePath = `projects/${project}/knowledge/${nodeId}.md`;

        // Create file via GitHub API
        const commitMessage = `feat(${project}): add ${type} node ${nodeId}`;
        const result = await getGitHub().writeFile(filePath, fileContent, commitMessage);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  nodeId,
                  filePath,
                  commitSha: result.commit.sha,
                  message: `Created ${type} node ${nodeId} in project ${project}`,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error creating node: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  // Tool: Update an existing node
  server.registerTool(
    "okf_update_node",
    {
      description: "Update an existing knowledge node's content or frontmatter",
      inputSchema: {
        id: z.string().describe("Node ID to update"),
        content: z.string().optional().describe("New markdown body content"),
        status: z.string().optional().describe("New status"),
        freshness: z.string().optional().describe("New freshness date (YYYY-MM-DD)"),
        verified: z.string().optional().describe("New verified date (YYYY-MM-DD)"),
        expires: z.string().optional().describe("New expiry date (YYYY-MM-DD or null)"),
        superseded_by: z.string().optional().describe("ID of node that supersedes this one"),
      },
    },
    async ({ id, content, status, freshness, verified, expires, superseded_by }: Record<string, unknown>) => {
      try {
        // Find the node file
        const tree = await getGitHub().getTree();
        const mdFiles = tree.filter(
          (item) =>
            item.type === "blob" &&
            item.path.endsWith(".md") &&
            item.path.includes("/knowledge/")
        );

        for (const file of mdFiles) {
          const fileContent = await getGitHub().getFile(file.path);
          const parsed = parseOKFFile(fileContent.content);

          if (parsed.frontmatter.id === id) {
            // Update frontmatter fields
            if (status) parsed.frontmatter.status = status as string;
            if (freshness) parsed.frontmatter.freshness = freshness as string;
            if (verified) parsed.frontmatter.verified = verified as string;
            if (expires !== undefined) parsed.frontmatter.expires = expires as string | null;
            if (superseded_by !== undefined) parsed.frontmatter.superseded_by = superseded_by as string | null;
            parsed.frontmatter.last_updated = new Date().toISOString().split("T")[0];

            // Update body if provided
            const newBody = content !== undefined ? `\n${content}\n` : parsed.body;

            // Serialize and update
            const updatedContent = serializeOKFFile(parsed.frontmatter, newBody);
            const commitMessage = `fix(${parsed.frontmatter.project}): update node ${id}`;
            const result = await getGitHub().writeFile(file.path, updatedContent, commitMessage, fileContent.sha);

            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: true,
                      nodeId: id,
                      filePath: file.path,
                      commitSha: result.commit.sha,
                      message: `Updated node ${id}`,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
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
              text: `Error updating node: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  // Tool: Update node status
  server.registerTool(
    "okf_update_status",
    {
      description: "Update the status of a knowledge node",
      inputSchema: {
        id: z.string().describe("Node ID"),
        status: z.string().describe("New status (active, expired, superseded, archived, open, closed, in_progress)"),
      },
    },
    async ({ id, status }: { id: string; status: string }) => {
      try {
        // Find the node file
        const tree = await getGitHub().getTree();
        const mdFiles = tree.filter(
          (item) =>
            item.type === "blob" &&
            item.path.endsWith(".md") &&
            (item.path.includes("/knowledge/") || item.path.includes("/tasks/"))
        );

        for (const file of mdFiles) {
          const fileContent = await getGitHub().getFile(file.path);
          const parsed = parseOKFFile(fileContent.content);

          if (parsed.frontmatter.id === id) {
            // Update status
            parsed.frontmatter.status = status;
            parsed.frontmatter.last_updated = new Date().toISOString().split("T")[0];

            // Add closed date for tasks
            if (parsed.frontmatter.type === "task" && status === "closed") {
              parsed.frontmatter.closed = new Date().toISOString().split("T")[0];
            }

            // Serialize and update
            const updatedContent = serializeOKFFile(parsed.frontmatter, parsed.body);
            const commitMessage = `fix(${parsed.frontmatter.project}): update status of ${id} to ${status}`;
            const result = await getGitHub().writeFile(file.path, updatedContent, commitMessage, fileContent.sha);

            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: true,
                      nodeId: id,
                      newStatus: status,
                      commitSha: result.commit.sha,
                      message: `Updated status of ${id} to ${status}`,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
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
              text: `Error updating status: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  // Tool: Add a link between nodes
  server.registerTool(
    "okf_add_edge",
    {
      description: "Add a typed edge (link) between two knowledge nodes",
      inputSchema: {
        sourceId: z.string().describe("Source node ID"),
        targetId: z.string().describe("Target node ID"),
        linkType: z.string().describe("Link type (relates-to, documents, supersedes, caused-by, blocks, fulfills, depends-on, part-of)"),
      },
    },
    async ({ sourceId, targetId, linkType }: { sourceId: string; targetId: string; linkType: string }) => {
      try {
        // Find the source node file
        const tree = await getGitHub().getTree();
        const mdFiles = tree.filter(
          (item) =>
            item.type === "blob" &&
            item.path.endsWith(".md") &&
            !item.path.startsWith(".")
        );

        for (const file of mdFiles) {
          const fileContent = await getGitHub().getFile(file.path);
          const parsed = parseOKFFile(fileContent.content);

          if (parsed.frontmatter.id === sourceId) {
            // Add the link
            if (!Array.isArray(parsed.frontmatter.links)) {
              parsed.frontmatter.links = [];
            }

            // Check if link already exists
            const linkExists = parsed.frontmatter.links.some((link) => {
              if (typeof link === "string") return link === targetId;
              return link.target === targetId && link.type === linkType;
            });

            if (linkExists) {
              return {
                content: [
                  {
                    type: "text",
                    text: JSON.stringify(
                      {
                        success: false,
                        message: `Link already exists: ${sourceId} -> ${targetId} (${linkType})`,
                      },
                      null,
                      2
                    ),
                  },
                ],
              };
            }

            // Add the new link
            parsed.frontmatter.links.push({ type: linkType, target: targetId });
            parsed.frontmatter.last_updated = new Date().toISOString().split("T")[0];

            // Serialize and update
            const updatedContent = serializeOKFFile(parsed.frontmatter, parsed.body);
            const commitMessage = `feat(${parsed.frontmatter.project}): add link ${sourceId} -> ${targetId}`;
            const result = await getGitHub().writeFile(file.path, updatedContent, commitMessage, fileContent.sha);

            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: true,
                      sourceId,
                      targetId,
                      linkType,
                      commitSha: result.commit.sha,
                      message: `Added link: ${sourceId} -> ${targetId} (${linkType})`,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }
        }

        return {
          content: [
            {
              type: "text",
              text: `Source node with ID "${sourceId}" not found`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error adding edge: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  // Tool: Claim a task
  server.registerTool(
    "okf_claim_task",
    {
      description: "Claim a task (set claimed_by and status to in_progress)",
      inputSchema: {
        id: z.string().describe("Task ID to claim"),
        claimedBy: z.string().optional().describe("Who is claiming (default: agent)"),
      },
    },
    async ({ id, claimedBy = "agent" }: { id: string; claimedBy?: string }) => {
      try {
        // Find the task file
        const tree = await getGitHub().getTree();
        const mdFiles = tree.filter(
          (item) =>
            item.type === "blob" &&
            item.path.endsWith(".md") &&
            item.path.includes("/tasks/")
        );

        for (const file of mdFiles) {
          const fileContent = await getGitHub().getFile(file.path);
          const parsed = parseOKFFile(fileContent.content);

          if (parsed.frontmatter.id === id) {
            // Check if already claimed
            if (
              parsed.frontmatter.claimed_by &&
              parsed.frontmatter.claimed_by !== "null" &&
              parsed.frontmatter.claimed_by !== null
            ) {
              return {
                content: [
                  {
                    type: "text",
                    text: JSON.stringify(
                      {
                        success: false,
                        message: `Task ${id} is already claimed by ${parsed.frontmatter.claimed_by}`,
                      },
                      null,
                      2
                    ),
                  },
                ],
              };
            }

            // Claim the task
            parsed.frontmatter.claimed_by = claimedBy;
            parsed.frontmatter.status = "in_progress";
            parsed.frontmatter.last_updated = new Date().toISOString().split("T")[0];
            if (!parsed.frontmatter.opened) {
              parsed.frontmatter.opened = new Date().toISOString().split("T")[0];
            }

            // Serialize and update
            const updatedContent = serializeOKFFile(parsed.frontmatter, parsed.body);
            const commitMessage = `feat(${parsed.frontmatter.project}): claim task ${id}`;
            const result = await getGitHub().writeFile(file.path, updatedContent, commitMessage, fileContent.sha);

            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: true,
                      taskId: id,
                      claimedBy,
                      commitSha: result.commit.sha,
                      message: `Claimed task ${id} (status: in_progress)`,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }
        }

        return {
          content: [
            {
              type: "text",
              text: `Task with ID "${id}" not found`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error claiming task: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  // Tool: Complete a task
  server.registerTool(
    "okf_complete_task",
    {
      description: "Complete a task (set status to closed)",
      inputSchema: {
        id: z.string().describe("Task ID to complete"),
        lesson: z.string().optional().describe("Lesson learned (will create a lesson node)"),
      },
    },
    async ({ id, lesson }: { id: string; lesson?: string }) => {
      try {
        // Find the task file
        const tree = await getGitHub().getTree();
        const mdFiles = tree.filter(
          (item) =>
            item.type === "blob" &&
            item.path.endsWith(".md") &&
            item.path.includes("/tasks/")
        );

        for (const file of mdFiles) {
          const fileContent = await getGitHub().getFile(file.path);
          const parsed = parseOKFFile(fileContent.content);

          if (parsed.frontmatter.id === id) {
            // Complete the task
            parsed.frontmatter.status = "closed";
            parsed.frontmatter.closed = new Date().toISOString().split("T")[0];
            parsed.frontmatter.last_updated = new Date().toISOString().split("T")[0];

            // Serialize and update
            const updatedContent = serializeOKFFile(parsed.frontmatter, parsed.body);
            const commitMessage = `feat(${parsed.frontmatter.project}): complete task ${id}`;
            const result = await getGitHub().writeFile(file.path, updatedContent, commitMessage, fileContent.sha);

            // If lesson provided, create a lesson node
            let lessonResult = null;
            if (lesson && parsed.frontmatter.project) {
              const lessonId = `LSN-${Date.now()}`;
              const lessonFrontmatter: OKFFrontmatter = {
                type: "lesson",
                id: lessonId,
                project: parsed.frontmatter.project,
                last_updated: new Date().toISOString().split("T")[0],
                status: "active",
                freshness: new Date().toISOString().split("T")[0],
                verified: new Date().toISOString().split("T")[0],
                expires: null,
                superseded_by: null,
                anchors: [],
                links: [{ type: "caused-by", target: id }],
              };

              const lessonBody = `\n# ${lessonId}: Lesson from ${id}\n\n${lesson}\n`;
              const lessonContent = serializeOKFFile(lessonFrontmatter, lessonBody);
              const lessonPath = `projects/${parsed.frontmatter.project}/knowledge/${lessonId}.md`;
              lessonResult = await getGitHub().writeFile(lessonPath, lessonContent, `feat(${parsed.frontmatter.project}): add lesson ${lessonId}`);
            }

            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: true,
                      taskId: id,
                      commitSha: result.commit.sha,
                      lessonCreated: !!lessonResult,
                      lessonSha: lessonResult?.commit.sha || null,
                      message: `Completed task ${id}`,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }
        }

        return {
          content: [
            {
              type: "text",
              text: `Task with ID "${id}" not found`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error completing task: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );
}