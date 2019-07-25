module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": { tsConfig: "tsconfig.base.json" },
  },
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: [
    "<rootDir>/packages/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/packages/**/*.{spec,test}.{ts,tsx}",
  ],
  testEnvironment: "jest-environment-jsdom-fourteen",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
