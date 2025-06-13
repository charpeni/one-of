import { defineConfig } from 'tsdown';

export default defineConfig({
  // Find all TypeScript files (excluding tests and type definitions)
  entry: 'src/index.ts',
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  unbundle: true,
  exports: {
    // I'm not sure why, but the package.json file is being included in the exports.
    // We don't want that, so we remove it.
    customExports(pkg) {
      delete pkg['./package.json'];
      return pkg;
    },
  },
});
