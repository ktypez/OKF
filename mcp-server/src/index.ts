import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { GitHubAPI } from "./github";
import { registerReadTools } from "./tools/read";
import { registerWriteTools } from "./tools/write";

// OKF MCP Agent with tools for reading and writing the knowledge base
export class OKFMCP extends McpAgent {
  server = new McpServer({
    name: "OKF Knowledge Base",
    version: "1.0.0",
  });

  async init() {
    // Initialize GitHub API client with environment variables
    const github = new GitHubAPI({
      owner: (this.env as Record<string, string>).GITHUB_OWNER,
      repo: (this.env as Record<string, string>).GITHUB_REPO,
      token: (this.env as Record<string, string>).GITHUB_TOKEN,
    });

    // Register all read tools
    registerReadTools(this.server, github);

    // Register all write tools
    registerWriteTools(this.server, github);
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/mcp") {
      return OKFMCP.serve("/mcp").fetch(request, env, ctx);
    }

    return new Response("OKF MCP Server - Use /mcp endpoint", { status: 200 });
  },
};