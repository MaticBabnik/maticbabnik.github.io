import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
    {
        ignores: [
            'node_modules/',
            '.nuxt/',
            '.output/',
            'dist/',
            '.git/',
            '.gitignore',
            'package-lock.json',
            '.cache/',
        ],
    },
    js.configs.recommended,
    {
        files: ['**/*.{js,ts}'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            'quotes': ['warn', 'single', { avoidEscape: true }],
            'semi': ['warn', 'always'],
            'indent': ['warn', 4],
            'space-before-function-paren': ['warn', 'never'],
        },
    },
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vuePlugin.parsers['vue-sfc-parser'],
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2020,
                parser: tsParser,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            vue: vuePlugin,
        },
        rules: {
            ...vuePlugin.configs.recommended.rules,
            'vue/html-indent': ['error', 4],
            'indent': ['warn', 4],
            'quotes': ['warn', 'single', { avoidEscape: true }],
            'semi': ['warn', 'always'],
            'space-before-function-paren': ['warn', 'never'],
        },
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2020,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            'indent': ['warn', 4],
            'quotes': ['warn', 'single', { avoidEscape: true }],
            'semi': ['warn', 'always'],
            'space-before-function-paren': ['warn', 'never'],
        },
    },
    prettier,
];



