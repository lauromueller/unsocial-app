module.exports = {
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  plugins: ["react", "prettier", "@typescript-eslint", "jest"],
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'prettier/prettier': 'error'
  }
}