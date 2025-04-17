import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { McpConfig, type McpServerEntry } from "../config";

type Transport = StdioClientTransport | SSEClientTransport;

const createClientTransport = (entry: McpServerEntry): Transport => {
  if ("url" in entry) {
    // NOTE: entry.env is sus here
    return new SSEClientTransport(new URL(entry.url), entry.env);
  }

  return new StdioClientTransport(entry);
};

export type Connection = {
  name: string;
  client: Client;
  tools: Awaited<ReturnType<Client["listTools"]>>;
};

type ConnectionInput = {
  name: string;
  entry: McpServerEntry;
};

const createConnection = async ({
  name,
  entry,
}: ConnectionInput): Promise<Connection> => {
  const transport = createClientTransport(entry);

  const client = new Client({
    name: `hyper-mpc`,
    version: "0.0.0",
  });

  await client.connect(transport);
  const tools = await client.listTools();

  return {
    name,
    client,
    tools,
  };
};

export const createConnections = async (
  config: McpConfig,
): Promise<Connection[]> => {
  const mcpServerEntries = Object.entries(config.mcpServers);
  const connections = mcpServerEntries.map(([name, entry]) =>
    createConnection({ name, entry }),
  );

  return Promise.all(connections);
};
