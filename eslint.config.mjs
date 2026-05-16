import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node },
        rules: {
            'no-unused-vars': 'error',
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'always'],
            'comma-dangle': ['error', 'never']
        },
    },
    js.configs.recommended,
    eslintConfigPrettier
]);
