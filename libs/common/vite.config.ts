import path from 'node:path';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { peerDependencies } from './package.json';

const app = () => {
  return defineConfig({
    plugins: [
      dts({
        insertTypesEntry: true,
      }),
      tsconfigPaths(),
    ],
    build: {
      sourcemap: 'inline',
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['cjs'],
        name: 'common',
      },
      rollupOptions: {
        external: [...Object.keys(peerDependencies)],
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          inlineDynamicImports: false,
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: '[name].js',
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  });
};

export default app;
