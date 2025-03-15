import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    { ignores: ['dist', '.node_modules/*'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'no-unused-vars': 'error',
            'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
            'no-unused-expressions': 'error',
            'no-console': 'warn',
            'no-undef': 'error',
            quotes: ['warn', 'single'],
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
        },
    },
    eslintPluginPrettierRecommended,
);
