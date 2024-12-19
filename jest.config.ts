import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", // Path to the Next.js app
});

/** @type {import('jest').Config} */
const customJestConfig = {
  // Automatically clear mocks before each test
  clearMocks: true,

  // Setup file to configure the testing environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Use jsdom as the test environment
  testEnvironment: "jest-environment-jsdom",

  // Custom module path mapping (matches tsconfig paths)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Transform TypeScript files with ts-jest
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default createJestConfig(customJestConfig);
