import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
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
	treeshake: false,
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
			onwarn: (warning, handler) => {
				if (warning.code.startsWith("a11y-")) { return; }
				handler(warning);
			},
			compilerOptions: { 
				dev: true,
				sourcemap: false
			}
		}),
		alias({
			entries: [
				{ find: "plotly.js-dist", replacement: "plotly.js-basic-dist-min" }
			]
    }),
		css({ output: "bundle.css" }),
		resolve({
			browser: true,
			dedupe: ["svelte"]
		}),
		commonjs()
	],
	watch: {
		clearScreen: false
	}
};
