import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./lib/tools.js";
import { compile } from "./lib/compiler.js";
import { startWatcher } from "./lib/watcher.js";
import { closeDb } from "./lib/db.js";

const server = new McpServer({
  name: "OKF Knowledge Base",
  version: "2.0.0",
});

// ── Auto-compile on start ─────────────────────────────────
async function bootstrap() {
  console.error("[okf] compiling knowledge base...");
  try {
    const result = await compile({ strict: false, commit: true });
    console.error(`[okf] ${result.status} — ${result.changed} file(s) changed`);
  } catch (err) {
    console.error(`[okf] compile error: ${err.message}`);
  }

  // Start file watcher
  startWatcher();

  // Register MCP tools
  registerTools(server);
  console.error("[okf] ready — 10 tools registered");
}

bootstrap().then(() => {
  const transport = new StdioServerTransport();
  server.connect(transport);
});

// ── Cleanup on exit ──────────────────────────────────────
process.on("SIGINT", () => {
  console.error("[okf] shutting down...");
  closeDb();
  process.exit(0);
});

process.on("SIGTERM", () => {
  closeDb();
  process.exit(0);
});
