import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import { terser } from 'rollup-plugin-terser';
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import postcssNesting from "postcss-nesting";
import postcssUrl from "postcss-url";
import { optimizeImports } from "carbon-preprocess-svelte";

export default {
	input: "src/ui/main.ts",
	output: {
		format: "iife",
		name: "ui",
		file: "app/ui/bundle.js",
		sourcemap: false,
		inlineDynamicImports: true
	},
	plugins: [
		typescript({
			tsconfig: "./tsconfig-ui.json"
		}),
		svelte({
			preprocess: [ 
				sveltePreprocess({ 
					postcss: {
						plugins: [
							postcssNesting(),
							postcssUrl({ url: "inline" })
						]
					} 
				}),
				optimizeImports()
			],
			compilerOptions: { 
				dev: true,
				sourcemap: false
			}
		}),
		css({ output: "bundle.css" }),
		resolve({
			browser: true,
			dedupe: ["svelte"]
		}),
		commonjs(),
		terser()
	],
	watch: {
		clearScreen: false
	}
};
