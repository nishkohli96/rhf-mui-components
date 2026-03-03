import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
		'src/config/index.ts',
    'src/form-helpers/index.ts',
    'src/mui/index.ts',
		'src/mui/**/index.ts',
    'src/mui-pickers/index.ts',
		'src/mui-pickers/**/index.ts',
    'src/misc/index.ts',
		'src/misc/**/index.ts',
    'src/types/index.ts',
  ],
  outDir: 'dist',
  format: ['esm'],
  target: ['es2024'],
	/* Removes outDir before building. */
	clean: true,
	/**
	 * true -> Bundles everything into fewer files.
	 * false -> Keeps the file structure as is, but compiles each file to the outDir.
	 */
	bundle: false,
	/**
	 * true -> Enables code splitting, which allows for smaller bundles and faster load
	 *   times. However, it can also lead to more complex build outputs and may not be
	 *   suitable for all projects.
	 * false -> Not needed if bundle is false, as each file is compiled separately.
	 */
  splitting: false,
	/* Generates .d.ts files for TypeScript projects. */
  dts: true,
	/* Generate .map files, optional for libraries */
  sourcemap: false,
	/**
	 * Prevents bundling of node_modules dependencies, which can reduce bundle size
	 * and improve build times.
	 */
	// external: [
	// 	'react',
	// 	'react-hook-form',
	// 	'@mui/material',
	// 	'@mui/icons-material',
	// 	'@mui/x-date-pickers',
	// ]
})
