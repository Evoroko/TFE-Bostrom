import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
  { ignores: ['*.d.ts', '**/public', '**/coverage', '**/dist'] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
        project: './tsconfig.json', 
      },
    },
    rules: {
        'vue/require-default-prop': 'off',
        '@typescript-eslint/no-explicit-any': 'error', // Disallow explicit 'any'
        '@typescript-eslint/no-unsafe-assignment': 'error', // Disallow implicit 'any' in assignments
        '@typescript-eslint/no-unsafe-member-access': 'error', // Disallow member access on variables typed as 'any'
        '@typescript-eslint/no-unsafe-call': 'error', // Disallow calling functions with 'any' type
        '@typescript-eslint/no-unsafe-return': 'error', // Disallow returning values with 'any' type
    },
  },
  eslintConfigPrettier
);