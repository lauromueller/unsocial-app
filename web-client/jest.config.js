module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: [
    "<rootDir>/src"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/file-mock.ts",
    "\\.(css|less)$": "<rootDir>/src/__mocks__/style-mock.ts"
  }
};