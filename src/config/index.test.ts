import { loadConfig } from ".";

const MOCK_CONFIG_FILES = {
  INVALID_CONFIG: {
    woop: "woop",
  },

  VALID_CONFIG: {
    test: {
      command: "echo",
    },
  },
};

jest.mock("fs", () => ({
  readFileSync: (key: keyof typeof MOCK_CONFIG_FILES) =>
    JSON.stringify(MOCK_CONFIG_FILES[key]),
}));

describe("loadConfig", () => {
  it("loads from a file", () => {
    const config = loadConfig("VALID_CONFIG");
    expect(config.test).toMatchObject({
      command: "echo",
    });
  });

  it("fails to load an invalid config", () => {
    expect(() => {
      loadConfig("INVALID_CONFIG");
    }).toThrow();
  });
});
