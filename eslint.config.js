import eslintConfigPrettier from 'eslint-config-prettier/flat';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  eslintConfigPrettier,
  {
    ignores: ['node_modules/', 'dist/', 'plugins', '.netlify', '.vinxi'],
  },
  {
    settings: {
      react: {
        createClass: 'createReactClass', // Regex for Component Factory to use,
        // default to "createReactClass"
        pragma: 'React', // Pragma to use, default to "React"
        fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
        version: 'detect', // React version. "detect" automatically picks the version you have installed.
        // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
        // Defaults to the "defaultVersion" setting and warns if missing, and to "detect" in the future
        defaultVersion: '', // Default React version to use when the version you have installed cannot be detected.
        // If not provided, defaults to the latest React version.
        flowVersion: '0.53', // Flow version
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variable', 'parameter'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // для констант
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'forbid',
        },
        // для react компонентов
        {
          selector: 'variable',
          modifiers: ['const'],
          types: ['function'],
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'forbid',
        },
        // для react компонентов в качестве параметра
        {
          selector: 'parameter',
          types: ['function'],
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
      ],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'arrow-body-style': ['error', 'as-needed'],
      curly: 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-eval': 'error',
      'no-extra-bind': 'error',
      'no-invalid-this': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-shadow': 'off',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'error',
      'no-unused-expressions': 'error',
      'no-unused-vars': 'off',
      'no-var': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'no-param-reassign': ['error'],
      radix: 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
    },
  },
];
