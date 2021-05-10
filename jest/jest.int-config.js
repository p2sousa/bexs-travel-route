const defaultConfig = require('./jest.config.js');

module.exports = {
  ...defaultConfig,
  displayName: 'integration-tests',
  testRegex: '.*\\.int-spec\\.ts$',
  coverageDirectory: '../coverage/int'
};
