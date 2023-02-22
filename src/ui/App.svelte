<script lang="ts">
	import { Theme } from "carbon-components-svelte";
	import "carbon-components-svelte/css/all.css";
	import { 
		Configuration,
		Utils,
		AppWindowType, 
		AppServerMessageType,
		AppServerMessage,
		NetworkTables,
		NetworkTablesTopic,
		NetworkTablesTopics,
		NetworkTablesServiceMessageType,
		NetworkTablesServiceMessage,
		NetworkTablesConnectionChangedMessage,
		NetworkTablesTopicsUpdatedMessage,
		NetworkTablesTopicsRemovedMessage,
		NetworkTablesDataType
	} from "../common";
	import Symbols from "./graphics/Symbols.svelte";
	import Hud from "./views/Hud.svelte";
	import Dashboard from "./views/Dashboard.svelte";
	import Data from "./views/Data.svelte";

	const appWindowType = new URLSearchParams(window.location.search).get("appWindowType") as AppWindowType;

	const views = {
		[AppWindowType.Hud]: Hud,
		[AppWindowType.Dashboard]: Dashboard,
		[AppWindowType.Data]: Data
	}

	let networkTables: NetworkTables = {
		address: "",
		isConnected: false,
		topics: new Map() as NetworkTablesTopics
	};

	const webSocket = new WebSocket(`ws://127.0.0.1:${ Configuration.Settings.APP_SERVER_PORT }/ws?appWindowType=${ appWindowType }`);
	webSocket.binaryType = "arraybuffer";
	webSocket.onmessage = (e) => onMessageReceived(e);
	webSocket.onerror = (e) => { console.log(e); }

	const onMessageReceived = (e: MessageEvent): void => {
		const { type, message } = Utils.decodeAppServerMessage(e.data as Uint8Array) as AppServerMessage;
		switch (type) {
			case AppServerMessageType.NetworkTablesService:
				switch ((message as NetworkTablesServiceMessage).type) {
					case NetworkTablesServiceMessageType.ConnectionChanged:
						onNetworkTablesConnectionChanged(message as NetworkTablesConnectionChangedMessage);
						break;
					case NetworkTablesServiceMessageType.TopicsUpdated:
						onNetworkTablesTopicsUpdated(message as NetworkTablesTopicsUpdatedMessage);
						break;
					case NetworkTablesServiceMessageType.TopicsRemoved:
						onNetworkTablesTopicsRemoved(message as NetworkTablesTopicsRemovedMessage);
						break;
					default:
						break;
				}
				networkTables = networkTables;
				break;
			default:
				console.log("Server message:", AppServerMessageType[type], message);
				break;
		}
	}

	const onNetworkTablesConnectionChanged = (e: NetworkTablesConnectionChangedMessage): void => {
		const { address, isConnected } = e.data;
		networkTables.address = address;
		networkTables.isConnected = isConnected;
		if (!isConnected) {
    	networkTables.topics.clear(); 
		}
	}

	const onNetworkTablesTopicsUpdated = (e: NetworkTablesTopicsUpdatedMessage): void => {
		for (const topic of e.data.topics) {
			networkTables.topics.set(topic.name, topic);
		}
	}

	const onNetworkTablesTopicsRemoved = (e: NetworkTablesTopicsRemovedMessage): void => {
		for (const topic of e.data.topics) {
			networkTables.topics.delete(topic.name);
		}
	}

	const updateNetworkTablesTopics = (topics: NetworkTablesTopic[]): void => {
		const topicsUpdatedMessage = {
			type: NetworkTablesServiceMessageType.TopicsUpdated,
			data: { topics }
		} as NetworkTablesTopicsUpdatedMessage;
		sendServerMessage(AppServerMessageType.NetworkTablesService, topicsUpdatedMessage);
	}

	const updateNetworkTablesTopic = (topic: NetworkTablesTopic): void => {
		updateNetworkTablesTopics([topic]);
	}

	const sendServerMessage = (type: AppServerMessageType, message: Object): void => {
    const appServerMessage = Utils.encodeAppServerMessage(type, message);
    if (webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(appServerMessage);
    }
  }
</script>

<div style="display:none"><Symbols /></div>

<!-- <button on:click={ () => { updateNetworkTablesTopic({
	name: "/SmartDashboard/AutonomousMode/selected",
	type: NetworkTablesDataType.String,
	value: "Time"
}) } }>Time</button>

<button on:click={ () => { updateNetworkTablesTopic({
	name: "/SmartDashboard/AutonomousMode/selected",
	type: NetworkTablesDataType.String,
	value: "Distance"
}) } }>Distance</button> -->

<svelte:component this={ views[appWindowType] } networkTables={ networkTables } />

<Theme
  theme="g100"
  tokens={{
    "interactive-01": "var(--_color-pink-80)",
    "hover-primary": "var(--_color-pink-60)",
    "active-primary": "var(--_color-pink-40)"
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
		--_color-pink: #FF69B4;
		--_color-pink-80: #FF69B4CC;
		--_color-pink-60: #FF69B499;
		--_color-pink-40: #FF69B466;
		--_color-green: #00CC00;
		--_color-red: #CC0000;
		--_color-yellow: #CCCC00;
		--_color-charcoal: #666666;
	}

	.hidden {
    display: none;
  }

	@keyframes pulse-animation {
		0%    { opacity: 0.75; transform: scale(1);  }
		50%   { opacity: 1; transform: scale(1.025); }
		100%  { opacity: 0.75; transform: scale(1); }
	}
</style>