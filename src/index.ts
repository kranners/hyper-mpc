#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getConfigPath, loadConfig } from "./config";

const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});

const start = async () => {
  const transport = new StdioServerTransport();

  const configPath = getConfigPath({ env: process.env, argv: process.argv });
  const config = loadConfig(configPath);

  console.info("Loaded config", config);

  await server.connect(transport);
};

start().catch(console.error);
