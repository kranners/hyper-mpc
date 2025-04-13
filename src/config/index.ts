import { readFileSync } from "fs";
import { z } from "zod";

const McpStdioEntry = z.object({
  command: z.string(),
  args: z.string().array().optional(),
  env: z.record(z.string(), z.string()).optional(),
});

const McpSseEntry = z.object({
  url: z.string(),
  env: z.record(z.string(), z.string()),
});

const McpServerEntry = z.union([McpStdioEntry, McpSseEntry]);

const McpConfig = z.record(z.string(), McpServerEntry);
export type McpConfig = z.infer<typeof McpConfig>;

export const loadConfig = (configPath: string): McpConfig => {
  const configContents = JSON.parse(readFileSync(configPath).toString());
  return McpConfig.parse(configContents);
};
