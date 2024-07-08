import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import { sveltePreprocess } from "svelte-preprocess";
import { optimizeImports } from "carbon-preprocess-svelte";

export default {
	input: "src/ui/main.ts",
	output: {
		format: "es",
		name: "ui",
		file: "app/ui/bundle.js",
		sourcemap: true,
		inlineDynamicImports: true
	},
	treeshake: false,
	onwarn: (warning, warn) => {
    if (warning.code === "CIRCULAR_DEPENDENCY" && warning.ids[0].includes("d3-")) { return; }
    warn(warning);
  },
	plugins: [
		typescript({
			tsconfig: "./tsconfig-ui.json"
		}),
		svelte({
			preprocess: [ 
				sveltePreprocess({ typescript: { tsconfigFile: "./tsconfig-ui.json" } }),
				optimizeImports()
			],
			onwarn: (warning, handler) => {
				if (warning.code.startsWith("a11y-")) { return; }
				handler(warning);
			},
			compilerOptions: { 
				dev: false,
				sourcemap: true
			}
		}),
		replace({
			preventAssignment: true,
			"process.env.NODE_ENV": JSON.stringify("production"),
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
