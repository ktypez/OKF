import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./lib/tools.js";

const server = new McpServer({
  name: "OKF Knowledge Base",
  version: "1.0.0",
});

registerTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
