module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'require-jsdoc': [0]
  },
};
