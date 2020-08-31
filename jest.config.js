module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!**/node_modules/**"
  ]
};