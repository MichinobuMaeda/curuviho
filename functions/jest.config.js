module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: [
    "*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!testUtils.js",
    "!.eslintrc.js",
    "!jest.config.js",
  ],
};
