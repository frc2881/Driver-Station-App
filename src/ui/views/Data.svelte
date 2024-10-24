<script lang="ts">
  import { run } from "svelte/legacy";
  import { 
    DataTable, 
    DataTableSkeleton,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    ToolbarMenu,
    ToolbarMenuItem,
    OverflowMenu,
    OverflowMenuItem,
    Modal,
    Checkbox,
    InlineNotification,
    NumberInput
  } from "carbon-components-svelte";
	import { type DataTableRow } from 'carbon-components-svelte/src/DataTable/DataTable.svelte';
  import { LineChart, type LineChartOptions, ScaleTypes } from "@carbon/charts-svelte";
  import { 
    Configuration,
    Utils,
    NetworkTablesDataType
	} from "../../common/index.js";
  import { 
    NetworkTablesService as nt, 
    updateNetworkTablesTopics 
  } from "../services/NetworkTables.svelte";

  let isMetadataPropsEnabled: boolean = $state(false);
  let isAllTelemetryEnabled: boolean = $state(false);
  let isDebugEnabled: boolean = $state(false);

  let selectedTopicNames: string[] = $state(JSON.parse(window.localStorage.getItem("App.Data.SelectedTopicNames") ?? "{}") ?? []);

  let selectedSubscriptions: string[] = $state(JSON.parse(window.localStorage.getItem("App.Data.SelectedSubscriptions") ?? "null") ?? Configuration.Settings.NetworkTables.Subscriptions);
  let isSubscriptionsModalOpen: boolean = $state(false);

  let graphModalTopicName: string = $state("");
  let graphModalChartData: any[] = $state([]);
  let graphModalDataMovingAverageSamples: number[] = $state([]);
  let graphModalDataMovingAverageSamplesCount: number = $state(50);
  let graphModalDataMovingAverage: number = $state(0);
  let isGraphModalOpen: boolean = $state(false);

  let selectedRowIds: (number | undefined)[] = $state([]);

  type RowSelectionChanged = {
    selected: boolean;
    row: DataTableRow;
  }
  
  const onRowSelectionChanged = (e: CustomEvent<RowSelectionChanged>): void => {
    const { row: topic, selected } = e.detail;
    if (selected) {
      selectedTopicNames.push(topic.name);
      window.scrollTo(0, 0);
    } else {
      selectedTopicNames.splice(selectedTopicNames.indexOf(topic.name), 1);
    }
    window.localStorage.setItem("App.Data.SelectedTopicNames", JSON.stringify(selectedTopicNames));
    selectedTopicNames = selectedTopicNames;
  }

  const onSubscriptionsModalClosed = (): void => {
    window.localStorage.setItem("App.Data.SelectedSubscriptions", JSON.stringify(selectedSubscriptions));
  }

  const openGraphModal = (topicName: string): void => {
    isGraphModalOpen = true;
    graphModalTopicName = topicName;
    const topic = nt.topics.get(topicName);
  }

  const onGraphModalClosed = (): void => {
    isGraphModalOpen = false;
    graphModalTopicName = "";
    graphModalChartData = [];
    graphModalDataMovingAverageSamples = [];
    graphModalDataMovingAverage = 0;
  }

  const isGraphOptionEnabled = (type: NetworkTablesDataType): boolean => {
    switch (type) {
      case NetworkTablesDataType.Double:
      case NetworkTablesDataType.Integer:
      case NetworkTablesDataType.Float:
        return true;
      default:
        return false;
    }
  }

  const formatValue = (value: any, type: NetworkTablesDataType): string => {
    switch (type) {
      case NetworkTablesDataType.BooleanArray:
      case NetworkTablesDataType.DoubleArray:
      case NetworkTablesDataType.FloatArray:
      case NetworkTablesDataType.IntegerArray:
      case NetworkTablesDataType.StringArray:
        return `[${ value }]`;
      default:
        return value;
    }
  }

  const graphModalChartOptions: LineChartOptions = {
    axes: {
      bottom: {
        mapsTo: "timestamp",
        scaleType: ScaleTypes.TIME
      },
      left: {
        mapsTo: "value",
        scaleType: ScaleTypes.LINEAR,
        includeZero: false
      }
    },
    timeScale: {
      timeIntervalFormats: {
        "15seconds": {
          primary: "mm:ss",
          secondary: "mm:ss"
        }
      }
    },
    toolbar: { enabled: false },
    legend: { enabled: false },
    theme: "g100",
    color: { scale: { "values": "#FF69B4" } },
    animations: false
  };

  let topics = $derived(Array.from(nt.topics.values())
    .reverse()
    .filter(topic => isMetadataPropsEnabled || !topic.name.includes("."))
    .filter(topic => selectedSubscriptions.some(subscription => topic.name.startsWith(subscription)))
    .sort((a, b) => (selectedTopicNames.includes(b.name) ? 1 : 0) - (selectedTopicNames.includes(a.name) ? 1 : 0)));

  run(() => {
    selectedRowIds = selectedTopicNames.map(topicName => nt.topics.get(topicName)?.id);
  });

  run(() => {
    if (isGraphModalOpen) {
      if (nt.isConnected) {
        const topic = nt.topics.get(graphModalTopicName);
        graphModalChartData.push({ timestamp: Utils.convertTimestamp(topic?.timestamp ?? 0), value: topic?.value, group: "values" });
        graphModalChartData = graphModalChartData;
        graphModalDataMovingAverageSamples.push(topic?.value);
        if (graphModalDataMovingAverageSamples.length > graphModalDataMovingAverageSamplesCount) {
          graphModalDataMovingAverageSamples.shift();
        }
        graphModalDataMovingAverage = graphModalDataMovingAverageSamples.reduce((a, b) => a + b) / graphModalDataMovingAverageSamples.length;
      } else {
        isGraphModalOpen = false;
      }
    }
  });

  run(() => {
    isAllTelemetryEnabled = nt.topics.get(Configuration.Settings.NetworkTables.Topics.IsAllTelemetryEnabled ?? "")?.value ?? false;
  });
</script>

<main>
{#if nt.isConnected}
  <DataTable
    headers={[
      { key: "name", value: "Name", width: "35%" },
      { key: "value", value: "Value", width: "35%", sort: false },
      { key: "timestamp", value: "Timestamp", width: "10%" },
      { key: "overflow", empty: true }
    ]}
    rows={ topics }
    sortable
    selectable
    size="short"
    bind:selectedRowIds
    on:click:row--select={ onRowSelectionChanged }>
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch shouldFilterRows />
        <ToolbarMenu>
          <ToolbarMenuItem on:click={ () => { isSubscriptionsModalOpen = true; } }>Edit Subscriptions</ToolbarMenuItem>
          <ToolbarMenuItem on:click={ () => { isMetadataPropsEnabled = !isMetadataPropsEnabled; } }>{ isMetadataPropsEnabled ? "Hide": "Show" } Metadata</ToolbarMenuItem>
          <ToolbarMenuItem on:click={ () => { 
            updateNetworkTablesTopics([{ 
              id: 0, 
              name: Configuration.Settings.NetworkTables.Topics.IsAllTelemetryEnabled ?? "", 
              type: NetworkTablesDataType.Boolean, 
              value: !isAllTelemetryEnabled 
            }]) } }>
            { isAllTelemetryEnabled ? "Disable": "Enable" } Telemetry
          </ToolbarMenuItem>
          <ToolbarMenuItem on:click={ () => { isDebugEnabled = !isDebugEnabled; } }>
            { isDebugEnabled ? "Hide": "Show" } Debug
          </ToolbarMenuItem>
        </ToolbarMenu>
      </ToolbarContent>
    </Toolbar>
    <svelte:fragment slot="cell" let:row let:cell>  
      {#if cell.key === "name"}
        <span class="topicName" title={ cell.value }>{ cell.value }</span>
      {:else if cell.key === "timestamp"}
        { Utils.formatTimestamp(cell.value) }
      {:else if cell.key === "overflow"}
        <OverflowMenu flipped direction="top">
          <OverflowMenuItem on:click={ () => { } } disabled>Edit</OverflowMenuItem>
          <OverflowMenuItem on:click={ () => { openGraphModal(row.name) } } disabled={ !isGraphOptionEnabled(row.type) }>Graph</OverflowMenuItem>
        </OverflowMenu>
      {:else}
        <span title={ `<${ NetworkTablesDataType[row.type] }> ${ formatValue(cell.value, row.type) }` }>{ formatValue(cell.value, row.type) }</span>
      {/if}
    </svelte:fragment>
  </DataTable>
{:else}
  <div class="inlineNotification">
    <InlineNotification
      title="Robot Not Connected:"
      subtitle={`Attempting to restart connection to ${ nt.address } ...`}
      kind="warning-alt"
      lowContrast
      hideCloseButton />
  </div>
  <DataTableSkeleton headers={ [ "Name", "Value", "Timestamp" ] } rows={ 13 } showHeader={ false } showToolbar={ false } />
{/if}
</main>

<Modal
  modalHeading="Subscriptions"
  size="xs"
  primaryButtonText="Ok"
  bind:open={ isSubscriptionsModalOpen }
  on:submit={ () => { isSubscriptionsModalOpen = false; } }
  on:close={ onSubscriptionsModalClosed }>
  {#each Configuration.Settings.NetworkTables.Subscriptions as subscription}
    <Checkbox bind:group={ selectedSubscriptions } labelText={ subscription } value = { subscription } />
  {/each}
</Modal>

<Modal
  modalHeading=""
  size="lg"
  passiveModal
  preventCloseOnClickOutside
  selectorPrimaryFocus=".noop"
  bind:open={ isGraphModalOpen }
  on:close={ onGraphModalClosed }>
  <span class="noop"></span>
  <div class="graphModal" class:hidden={ !isGraphModalOpen }>
    <div class="chart">
      <LineChart 
        data={ graphModalChartData } 
        options={ graphModalChartOptions } />
    </div>
    <div class="movingAverage">
      Moving Average:
      <span class="value">{ graphModalDataMovingAverage?.toFixed(6) }</span>
      <span class="input"><NumberInput bind:value={ graphModalDataMovingAverageSamplesCount } step={ 50 } min={ 50 } max={ 3000 } size="sm" /></span>samples
    </div>
  </div>
</Modal>

{#if isDebugEnabled }
<pre class="debug">{ Utils.stringifyNetworkTables(nt, 4) }</pre>
{/if }

<style>
  main {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .topicName {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .graphModal {
    &.hidden {
      display: none;
    }

    & .chart {
      margin: 2em;
      width: 1240px;
      height: 480px;
    }

    & .movingAverage {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 30px 0 0 50px;

      & .value {
        margin: 0 10px;
        font-weight: bold;
        font-size: 120%;
      }

      & .input {
        margin: 0 10px;
        display: inline-block;
        width: 150px;
      }
    }
  }

  .inlineNotification {
    padding: .75em 2em;
  }

	.debug {
    display: block;
    margin: 0;
    padding: 1em 2.5em 2.5em 2.5em;
		color: var(--app-color-green);
    font-size: 80%;
	}
</style>