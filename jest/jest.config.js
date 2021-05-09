module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../src',
  testRegex: '.*\\.spec\\.ts$',
  globals: {
    ENV_FILE: 'environments/.env.test',
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s', '!**/test/**'],
  coveragePathIgnorePatterns: ['/src/contracts/'],
  coverageDirectory: '../coverage/unit',
  testEnvironment: 'node',
};
