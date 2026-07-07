declare module "agents/mcp" {
  export class McpAgent {
    env: Record<string, unknown>;
    server: McpServer;
    init(): Promise<void>;
    static serve(path: string): {
      fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response>;
    };
  }

  class McpServer {
    registerTool(
      name: string,
      config: Record<string, unknown>,
      handler: (...args: unknown[]) => Promise<unknown>
    ): void;
  }
}

declare module "js-yaml" {
  export function load(input: string): unknown;
  export function dump(input: unknown, options?: Record<string, unknown>): string;
}

declare module "@modelcontextprotocol/sdk/server/mcp.js" {
  export class McpServer {
    constructor(options: { name: string; version: string });
    registerTool(
      name: string,
      config: Record<string, unknown>,
      handler: (...args: unknown[]) => Promise<unknown>
    ): void;
  }
}

interface Env {
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  GITHUB_TOKEN: string;
  MCP_OBJECT: DurableObjectNamespace;
}