module.exports = {
  verbose: true,
  "testMatch": [
    "**/src/**/*.test.+(jsx|js)",
  ],
  "setupFilesAfterEnv": ["./src/setupTests.js"],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js",
    "\\.(css|less)$": "<rootDir>/assetsTransformer.js"
  }
};
