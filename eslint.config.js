import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      prettier: pluginPrettier,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...pluginPrettier.configs.recommended.rules,
    },
  },

  tseslint.configs.recommended,

  pluginReact.configs.flat.recommended,

  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },

  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },

  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/commonmark',
    extends: ['markdown/recommended'],
  },
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },
]);
