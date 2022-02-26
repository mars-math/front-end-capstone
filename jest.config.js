module.exports = {
  transform: {
    '^.+\\.(js||jsx)$': 'babel-jest',
  },
  moduleFileExtensions: [
    "js",
    "jsx"
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    './client/src/index.test.js'
  ],
}