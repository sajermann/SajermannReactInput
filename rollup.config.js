import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
	{
		preserveModules: true,
		input: 'src/index.ts',
		output: {
			dir: 'build',
			format: 'esm',
		},
		plugins: [
			typescript({
				tsconfig: './tsconfig.json',
				compilerOptions: {
					jsx: 'react-jsx',
					declaration: true,
					declarationDir: 'build',
				},
				exclude: [
					'src/Pages',
					'src/Config',
					'src/App.tsx',
					'src/main.tsx',
					'src/**/*.spec.ts',
					'src/**/*.spec.tsx',
					'src/**/*.test.ts',
					'src/**/*.test.tsx',
				],
			}),
			terser({
				maxWorkers: 4,
			}),
		],
	},
];
