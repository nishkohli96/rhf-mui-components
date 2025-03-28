import jsConfig from '@nish1896/eslint-flat-config/js';
import tsConfig from '@nish1896/eslint-flat-config/ts';
import jsxConfig from '@nish1896/eslint-flat-config/jsx';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...jsConfig,
  ...tsConfig,
  ...jsxConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      'no-nested-ternary': 'off',
    },
  },
];
