module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.spec.ts$', // This regex matches any files ending with .spec.ts
  moduleFileExtensions: ['js', 'json', 'ts'], // File types Jest will process
  rootDir: './test', // Root directory where Jest should start searching for tests
  testPathIgnorePatterns: ['/node_modules/'], // Directories to ignore during testing
  collectCoverage: true, // If you want Jest to collect test coverage
  coverageDirectory: '<rootDir>/coverage/', // Where to output coverage reports
  coverageReporters: ['text', 'lcov'], // Types of coverage reports to generate
  collectCoverageFrom: ['**/*.ts'],
};
