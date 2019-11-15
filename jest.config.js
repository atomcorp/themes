module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      lines: 90,
      statements: 90,
    },
  },
};
