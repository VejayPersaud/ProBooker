require('./module-alias.cjs');

module.exports = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/app/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@services/(.*)$': '<rootDir>/services/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
    // Add the following line to handle ESM in node-fetch-native-with-agent
    'node-fetch-native-with-agent': ['@swc/jest'],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!node-fetch-native-with-agent)',
  ],
};
