module.exports = {
  transform: {
    '^.+\\.(js||jsx)$': 'babel-jest',
  },
  moduleFileExtensions: [
    "js",
    "jsx"
  ],
  testMatch: [
    '<rootDir>/**/__tests__/**/?(*.)(spec|test).js',
    '<rootDir>/**/?(*.)(spec|test).js'
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    './client/src/index.test.js'
  ]
}