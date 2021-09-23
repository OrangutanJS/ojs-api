module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'dot-notation': 'off',
    'import/no-named-default': 'error',
    'import/no-extraneous-dependencies': 'off',
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-restricted-syntax': 'off',
    'arrow-parens': 'off',
    'no-unused-expressions': 'off',
  },
};
