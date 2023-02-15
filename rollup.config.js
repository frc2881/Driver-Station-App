import resolve from "@rollup/plugin-node-resolve";
import replace from '@rollup/plugin-replace';
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
	},
	context: "window",
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
		replace({ 
			preventAssignment: true, 
			"process.env.NODE_ENV": JSON.stringify("production") 
		}),
		commonjs(),
		terser()
	],
	onwarn: (warning, warn) => {
		// omit circular dependency warnings emitted from "d3-*" packages and "@carbon/charts"
		if (warning.code === "CIRCULAR_DEPENDENCY") {
			if (warning.ids.some((id) => /node_modules\/(d3-|@carbon\/charts)/.test(id))) { return; }
		}
		warn(warning);
	},
	watch: {
		clearScreen: false
	}
};
