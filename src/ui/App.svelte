<script lang="ts">
	import { Theme } from "carbon-components-svelte";
	import "carbon-components-svelte/css/all.css";
	import { AppWindowType } from "../common";
	import { connectNetworkTablesStore } from "./stores/NetworkTables";
	import Symbols from "./graphics/Symbols.svelte";
	import Hud from "./views/Hud.svelte";
	import Dashboard from "./views/Dashboard.svelte";
	import Data from "./views/Data.svelte";

	const views = {
		[AppWindowType.Hud]: Hud,
		[AppWindowType.Dashboard]: Dashboard,
		[AppWindowType.Data]: Data
	}

	const appWindowType = new URLSearchParams(window.location.search).get("appWindowType") as AppWindowType;

	connectNetworkTablesStore(appWindowType);
</script>

<div style="display:none"><Symbols /></div>

<svelte:component this={ views[appWindowType] } />

<Theme
  theme="g100"
  tokens={{
    "interactive-01": "var(--app-color-pink-80)",
    "hover-primary": "var(--app-color-pink-60)",
    "active-primary": "var(--app-color-pink-40)"
  }}
/>

<style global lang="postcss">
	@font-face { font-family: "Roboto"; src: url("./fonts/Roboto-Regular.woff") format("woff"); font-weight: normal; font-style: normal; }
	@font-face { font-family: "Roboto"; src: url("./fonts/Roboto-Bold.woff") format("woff"); font-weight: bold; font-style: normal; }

	* {
		font-family: "Roboto", sans-serif !important;
		font-weight: normal;
		-webkit-font-smoothing: antialiased !important;
	}

	:root {
		--app-color-pink: #FF69B4;
		--app-color-pink-80: #FF69B4CC;
		--app-color-pink-60: #FF69B499;
		--app-color-pink-40: #FF69B466;
		--app-color-green: #00CC00;
		--app-color-red: #CC0000;
		--app-color-blue: #0000CC;
		--app-color-yellow: #CCCC00;
		--app-color-orange: #CC6600;
		--app-color-charcoal: #666666;
		--app-color-smoke: #999999;
		--app-color-black: #000000;
		--app-color-white: #FFFFFF;
	}

	.hidden {
    display: none;
  }
</style>