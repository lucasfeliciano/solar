module.exports = {
  ...require('./jest-common'),
  displayName: 'dom',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    'jest-dom/extend-expect',
    'jest-styled-components',
    'react-testing-library/cleanup-after-each',
    require.resolve('./setup-tests.js'),
  ],
}
