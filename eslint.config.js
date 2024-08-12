// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
// @ts-expect-error -- no types
import * as pluginImport from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['**/node_modules', 'dist'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      import: { rules: pluginImport.rules },
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  },
);
