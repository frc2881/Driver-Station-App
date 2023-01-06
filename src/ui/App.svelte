<script lang="ts">
	import { 
		Utils,
		AppWindowType, 
		ServerMessageType,
		ServerMessage,
		NetworkTablesServiceMessageType,
		NetworkTablesServiceMessage,
		NetworkTablesConnectionChangedMessage,
		NetworkTablesTopicsUpdatedMessage,
		NetworkTables,
		NetworkTablesTopic,
    NetworkTablesDataType
	} from "../common";
	import Symbols from "./graphics/Symbols.svelte";
	import HudView from "./views/Hud.svelte";
	import DashboardView from "./views/Dashboard.svelte";
	import DataView from "./views/Data.svelte";

	const appWindowType = new URLSearchParams(window.location.search).get("appWindowType") as AppWindowType;

	let networkTables: NetworkTables = {
		address: "",
		isConnected: false,
		topics: []
	};

	const server = new WebSocket(`ws://127.0.0.1:62881/ws?appWindowType=${appWindowType}`);
	server.binaryType = "arraybuffer";
	server.onmessage = (e) => onMessageReceived(e);

	const onMessageReceived = (e: MessageEvent): void => {
		const { type, message } = Utils.decodeServerMessage(e.data as Uint8Array) as ServerMessage;
		switch (type) {
			case ServerMessageType.NetworkTablesService:
				switch ((message as NetworkTablesServiceMessage).type) {
					case NetworkTablesServiceMessageType.ConnectionChanged:
						onNetworkTablesConnectionChanged(message as NetworkTablesConnectionChangedMessage);
						break;
					case NetworkTablesServiceMessageType.TopicsUpdated:
						onNetworkTablesTopicsUpdated(message as NetworkTablesTopicsUpdatedMessage);
						break;
					default:
						break;
				}
				networkTables = networkTables;
				break;
			default:
				console.log("Server message:", ServerMessageType[type], message);
				break;
		}
	};

	const onNetworkTablesConnectionChanged = (e: NetworkTablesConnectionChangedMessage): void => {
		const { address, isConnected } = e.data;
		networkTables.address = address;
		networkTables.isConnected = isConnected;
		// TODO: determine if we want to keep last networktables state around when robot disconnects and reset on next connection
		if (!isConnected) {
    	networkTables.topics = []; 
		}
	};

	const onNetworkTablesTopicsUpdated = (e: NetworkTablesTopicsUpdatedMessage): void => {
		for (const topic of e.data.topics) {
			const index = networkTables.topics.findIndex(t => t.name === topic.name);
			if (index !== -1) {
				networkTables.topics[index] = topic;
			} else {
				networkTables.topics.push(topic);
			}
		}
	};

	const sendServerMessage = (type: ServerMessageType, message: Object): void => {
    const serverMessage = Utils.encodeServerMessage(type, message);
    if (server.readyState === WebSocket.OPEN) {
      server.send(serverMessage);
    }
  };

	const updateNetworkTablesTopics = (topics: NetworkTablesTopic[]): void => {
		const message = {
			type: NetworkTablesServiceMessageType.TopicsUpdated,
			data: { topics }
		} as NetworkTablesTopicsUpdatedMessage;
		sendServerMessage(ServerMessageType.NetworkTablesService, message);
	};

	const updateNetworkTablesTopic = (name: string, value: any): void => {
		updateNetworkTablesTopics([{ id: 0, timestamp: 0, type: NetworkTablesDataType.any, name, value }]);
	};

	// HACK: Romi example test update
	// (async () => {
	// 	await Utils.wait(5);
	// 	updateNetworkTablesTopic("/SmartDashboard/SendableChooser[0]/selected", "Auto Routine Time");
	// })();
	
</script>

<div style="display:none"><Symbols /></div>

{#if appWindowType === AppWindowType.HUD}
<HudView networkTables={networkTables} />
{/if}
{#if appWindowType === AppWindowType.DASHBOARD}
<DashboardView networkTables={networkTables} />
{/if}
{#if appWindowType === AppWindowType.DATA}
<DataView networkTables={networkTables} />
{/if}

<style global lang="postcss">
	@font-face { font-family: "Roboto"; src: url("./fonts/Roboto-Regular.woff") format("woff"); font-weight: normal; font-style: normal; }
	@font-face { font-family: "Roboto"; src: url("./fonts/Roboto-Bold.woff") format("woff"); font-weight: bold; font-style: normal; }

	* {
		font-family: "Roboto", sans-serif;
		font-weight: normal;
		-webkit-font-smoothing: antialiased !important;
	}

	:root {
		--_color-black: #000000;
		--_color-white: #FFFFFF;
		--_color-pink: #FF69B4;
		--_color-green: #00FF00;
	}
</style>