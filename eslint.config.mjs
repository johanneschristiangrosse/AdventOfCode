import globals from 'globals'
import pluginJs from '@eslint/js'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules:
    {
      'no-var': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'semi': [ 'error', 'never' ],
      'quotes': [ 'error', 'single' ],
      'prefer-const': 'error',
      'comma-dangle': [ 'error', 'always-multiline' ],
      'indent': [ 'error', 2 ],
      'object-curly-spacing': [ 'error', 'always' ],
      'array-bracket-spacing': [ 'error', 'always' ],
      'brace-style': [ 'error', '1tbs', { 'allowSingleLine': true } ],
    },
  },
  pluginJs.configs.recommended,
]