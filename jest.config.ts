// https://jestjs.io/docs/configuration
import type { Config } from 'jest';

const config: Config = {
  automock: false,
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{tsx,ts}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['index.tsx', 'config.ts', '.test.*'],
  coverageProvider: 'v8',
  displayName: 'React memory game',
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: -10 }
  },
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/styleMock.ts'
  },
  preset: 'ts-jest',
  reporters: ['default'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'jsdom'
};

export default config;
