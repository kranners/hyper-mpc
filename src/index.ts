#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getConfigPath, loadConfig } from "./config";
import { createConnections } from "./connections";

const server = new McpServer({
  name: "hyper-mcp",
  version: "1.0.0",
});

const start = async () => {
  const transport = new StdioServerTransport();

  const configPath = getConfigPath({ env: process.env, argv: process.argv });
  const config = loadConfig(configPath);
  console.info("Loaded config", config);

  const connections = await createConnections(config);
  console.info(
    "Created connections\n-",
    connections.map(({ name }) => name).join("\n- "),
  );

  await server.connect(transport);
};

start().catch(console.error);
