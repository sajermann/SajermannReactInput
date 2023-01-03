import typescript from '@rollup/plugin-typescript';

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
					'src/App.tsx',
					'src/main.tsx',
					'src/**/*.spec.ts',
					'src/**/*.test.ts',
				],
			}),
		],
	},
];
