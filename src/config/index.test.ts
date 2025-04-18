import { DEFAULT_CONFIG_PATH, getConfigPath, loadConfig } from ".";

const MOCK_CONFIG_FILES = {
  INVALID_CONFIG: {
    woop: "woop",
  },

  VALID_CONFIG: {
    mcpServers: {
      test: {
        command: "echo",
      },
    },
  },
};

jest.mock("fs", () => ({
  readFileSync: (key: keyof typeof MOCK_CONFIG_FILES) => {
    return JSON.stringify(MOCK_CONFIG_FILES[key]);
  },
}));

describe("loadConfig", () => {
  it("loads from a file", () => {
    const config = loadConfig("VALID_CONFIG");
    expect(config.mcpServers.test).toMatchObject({
      command: "echo",
    });
  });

  it("fails to load an invalid config", () => {
    expect(() => {
      loadConfig("INVALID_CONFIG");
    }).toThrow();
  });
});

describe("getConfigPath", () => {
  it("defaults to ~/.cursor/hyper.mcp.json", () => {
    const configPath = getConfigPath({
      env: {},
      argv: ["node", "./path/to/index.js"],
    });

    expect(configPath).toBe(DEFAULT_CONFIG_PATH);
  });

  it("prefers the CONFIG_PATH env variable over the default", () => {
    const configPath = getConfigPath({
      env: { CONFIG_PATH: "/tmp/env.mcp.json" },
      argv: ["node", "./path/to/index.js"],
    });

    expect(configPath).toBe("/tmp/env.mcp.json");
  });

  it("prefers the first argument over the default", () => {
    const configPath = getConfigPath({
      env: {},
      argv: ["node", "./path/to/index.js", "/tmp/argv.mcp.json"],
    });

    expect(configPath).toBe("/tmp/argv.mcp.json");
  });

  it("prefers the first argument over the CONFIG_PATH", () => {
    const configPath = getConfigPath({
      env: { CONFIG_PATH: "/tmp/env.mcp.json" },
      argv: ["node", "./path/to/index.js", "/tmp/argv.mcp.json"],
    });

    expect(configPath).toBe("/tmp/argv.mcp.json");
  });
});
