module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  env: {
    node: true,
    es2021: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: [
          'apps/api/tsconfig.json',
          'apps/web/tsconfig.json',
          'libs/common/tsconfig.json',
        ],
      },
    },
  },
  plugins: ['prettier', 'import', 'no-only-tests'],
  extends: [
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'warn',
    'no-debugger': 'error',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'import/newline-after-import': 'error',
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      },
    ],
    'no-return-await': 'error',
    'require-await': 'error',
    'no-only-tests/no-only-tests': 'error',
    'import/no-cycle': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/eslint-recommended'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            args: 'all',
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        'import/no-anonymous-default-export': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      extends: ['eslint:recommended'],
      rules: {
        'no-unused-vars': [
          'warn',
          {
            vars: 'all',
            args: 'all',
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
  ignorePatterns: [
    'node_modules',
    'pnpm-lock.yaml',
    'build',
    'dist',
    '.turbo',
    'migrations',
    '*.md',
    '*.log',
    'public',
    'coverage',
    'test/test-result',
    'coverage-summary',
    '.vscode',
  ],
};
