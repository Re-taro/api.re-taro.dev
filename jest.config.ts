import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => ({
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testEnvironment: "node",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
});
