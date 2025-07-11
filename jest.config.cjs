module.exports = {
  testEnvironment: "node",
  transform: {},
  testMatch: [
    // "<rootDir>/test/**/*.test.js",
    "<rootDir>/test/unit/**/*.test.js",
    "<rootDir>/test/integracion/**/*.test.js",
  ],
  collectCoverageFrom: ["<rootDir>/src/**/*.js", "<rootDir>/**/*.js"],
};
