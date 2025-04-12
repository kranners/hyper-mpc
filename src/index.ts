import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});

const start = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

start().catch(console.error);
