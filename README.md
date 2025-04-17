# hyper-mcp

A configurable MCP server wrapper for using the entire Model Context Protocol
without a tool count limit in Cursor.

## Installation

1. Start by making a backup of your current `mcp.json` file.
> [!TIP]
> The default location is `~/.cursor/hyper.mcp.json`.
> To rename your existing Cursor config:
> `mv ~/.cursor/mcp.json ~/.cursor/hyper.mcp.json`

2. Create a new `mcp.json` file where the old one was, with these contents:
```json
{
  "mcpServers": {
    "hyper": {
      "command": "npx",
      "args": [
        "@cute-engineer/hyper-mcp",
        "/path/to/hyper.mcp.json"
      ],
      "env": {
        "CONFIG_PATH": "/path/to/hyper.mcp.json",
      }
    }
  }
}
```

The server will prefer arguments over environment variables over
`~/.cursor/hyper.mcp.json`.

## `TODO`

Need to:
- [x] Read in the config file (mcp.json), can take in an argument or a env var
- [x] Validate it's in the correct format (zod schema)

### Startup
- [ ] Load a new client for each MCP entry
- [ ] List all tools
- [ ] Add all those to a register

### Runtime
- [ ] Expose that list via the tools endpoint
- [ ] Take in commands
- [ ] Forward them through to the respective MCP server
- [ ] Forward the results back

### Support
- [ ] Update transport command to support Nix, etc
- [ ] Update connections to pass through MCP host environment (is this needed?) 

### Spice
- [ ] CI & releases
- [ ] Support SSE servers
- [ ] Also load all prompts & resources
- [ ] Optionally blacklist or prefer tools
- [ ] Expose all of the other things as well
- [ ] Instructions tool, configurable help message
- [ ] Templatable help message?

