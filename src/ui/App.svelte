<script lang="ts">
	import { Theme } from "carbon-components-svelte";
	import "carbon-components-svelte/css/all.css";
	import "@carbon/charts-svelte/styles.min.css";
	import { AppWindowType } from "../common";
	import { connectNetworkTablesStore } from "./stores/NetworkTables";
	import Graphics from "./components/Graphics.svelte";
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

<div style="display:none"><Graphics /></div>

<svelte:component this={ views[appWindowType] } />

<Theme
  theme="g100"
  tokens={{
    "interactive-01": "var(--app-color-pink-80)",
    "hover-primary": "var(--app-color-pink-60)",
    "active-primary": "var(--app-color-pink-40)"
  }}
/>

<style global>
	@font-face { font-family: "Roboto"; src: url("./assets/fonts/Roboto-Regular.woff") format("woff"); font-weight: normal; font-style: normal; }
	@font-face { font-family: "Roboto"; src: url("./assets/fonts/Roboto-Bold.woff") format("woff"); font-weight: bold; font-style: normal; }

	* {
		font-family: "Roboto", sans-serif !important;
		font-weight: normal;
		-webkit-font-smoothing: antialiased !important;
		font-display: swap;
	}

	html, body {
		margin: 0;
		padding: 0;
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

	@keyframes pulse {
    0% { opacity: 0.5; }
    100% { opacity: 0.1; }
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
    100% { transform: rotate(360deg); }
  }

	@keyframes pulse-expand {
		0%    { opacity: 0.75; transform: scale(1);  }
		50%   { opacity: 1; transform: scale(1.05); }
		100%  { opacity: 0.75; transform: scale(1); }
	}
</style>