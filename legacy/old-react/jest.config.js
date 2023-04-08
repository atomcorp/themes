module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/index.tsx',
    '<rootDir>/src/serviceWorker.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 90,
      statements: 90,
    },
  },
};
