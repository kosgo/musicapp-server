module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-multiple-empty-lines': [2, { max: 1 }],
    'no-trailing-spaces': 2,
    'eol-last': 2,
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
};
