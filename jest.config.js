module.exports = {
  verbose: true,
  preset: 'ts-jest',
  "testMatch": [
    "**/src/**/*.+(jsx|js)",
  ],
  "setupFilesAfterEnv": ["./src/setupTests.ts"],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js",
    "\\.(css|less)$": "<rootDir>/assetsTransformer.js"
  }
};
