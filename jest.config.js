module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	verbose: true,
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!**/node_modules/**",
		"!dist/**"
	],
	coverageReporters: ["html"]
};