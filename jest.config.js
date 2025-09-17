export default {
  verbose: true,
  testMatch: ["**/src/**/*.test.+(jsx|js)"],
  setupFilesAfterEnv: ["./src/setupTests.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/mocks/styleMock.js",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!.*\\.mjs$)"],
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".jsx"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
};
