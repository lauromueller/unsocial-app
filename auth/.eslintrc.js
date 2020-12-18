module.exports = {
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['import', 'prettier', '@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-underscore-dangle': ['error', { allow: ['_id', '_update'] }],
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
