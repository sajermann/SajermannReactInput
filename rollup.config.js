import typescript from '@rollup/plugin-typescript';
import image from '@rollup/plugin-image';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';

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
					'src/ComponentsInternal',
					'src/Hooks',
					'src/test',
					'src/App.tsx',
					'src/main.tsx',
					'src/**/*.spec.ts',
					'src/**/*.test.ts',
				],
			}),
			image(),
			postcss({
				plugins: [autoprefixer()],
				extract: true,
				// modules: true,
			}),
		],
	},
];
