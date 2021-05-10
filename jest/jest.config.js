const { resolve } = require('path');
const root = resolve(__dirname, '../');

module.exports = {
  rootDir: root,
  displayName: 'unit-tests',
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  testEnvironment: 'node',
  globals: {
    ENV_FILE: 'environments/.env.test',
  },
  clearMocks: true,
  collectCoverageFrom: ['**/*.(t|j)s', '!**/test/**'],
  coveragePathIgnorePatterns: [
    '/commitlint.config.js',
    '/prettier.config.js',
    '/jest/',
    '/src/infrastructure/contracts/'
  ],
  coverageDirectory: '../coverage/unit',
  coverageReporters: ["text", "text-summary"],
  moduleNameMapper: {
    '@root/(.*)': '<rootDir>/$1',
    "@domain/(.*)": '<rootDir>/src/domain/$1',
    "@application/(.*)": '<rootDir>/src/application/$1',
    "@infrastructure/(.*)": '<rootDir>/src/infrastructure/$1',
    "@configurations/(.*)": '<rootDir>/src/configurations/$1',
  },
};
