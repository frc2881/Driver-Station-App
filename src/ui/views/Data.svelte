<script lang="ts">
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
  import Plot, { Data } from "svelte-plotly.js";
  import { Configuration } from "../../config";
  import { 
    Utils,
    NetworkTables,
    NetworkTablesTopic,
    NetworkTablesDataType
	} from "../../common";
  import { 
    NetworkTablesStore, 
    updateNetworkTablesTopics 
  } from "../stores/NetworkTables";

  let networkTables: NetworkTables;
  $: { networkTables = $NetworkTablesStore; }

  let isMetadataPropsEnabled: boolean = false;
  let isAllTelemetryEnabled: boolean = false;
  let isDebugEnabled: boolean = false;

  let selectedTopicNames: string[] = JSON.parse(window.localStorage.getItem("App.Data.SelectedTopicNames")) ?? [];

  let selectedSubscriptions: string[] = JSON.parse(window.localStorage.getItem("App.Data.SelectedSubscriptions")) ?? Configuration.Settings.NetworkTables.Subscriptions;
  let isSubscriptionsModalOpen: boolean = false;

  let graphModalTopicName: string = null;
  let graphModalData: Data[] = [];
  let graphModalDataMovingAverageSamples: number[] = [];
  let graphModalDataMovingAverageSamplesCount: number = 50;
  let graphModalDataMovingAverage: number = 0;
  let isGraphModalOpen: boolean = false;

  let selectedRowIds: number[] = [];

  type RowSelectionChanged = {
    selected: boolean;
    row: NetworkTablesTopic;
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
    const topic = networkTables.topics.get(topicName);
    graphModalData = [{
      name: topic.name,
      x: [ Utils.convertTimestamp(topic.timestamp) ],
      y: [ topic.value ],
      type: "scattergl"
    }];
  }

  const onGraphModalClosed = (): void => {
    isGraphModalOpen = false;
    graphModalTopicName = null;
    graphModalData = [];
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

  $: topics = Array.from(networkTables.topics.values())
    .reverse()
    .filter(topic => isMetadataPropsEnabled || !topic.name.includes("."))
    .filter(topic => selectedSubscriptions.some(subscription => topic.name.startsWith(subscription)));

  $: selectedRowIds = selectedTopicNames.map(topicName => networkTables.topics.get(topicName)?.id);

  $: {
    if (isGraphModalOpen) {
      if (networkTables.isConnected) {
        const topic = networkTables.topics.get(graphModalTopicName);
        if (topic.value !== graphModalData.at(0)["y"].at(-1).value) {
          graphModalData.at(0)["x"].push(Utils.convertTimestamp(topic.timestamp));
          graphModalData.at(0)["y"].push(topic.value);
          graphModalData = graphModalData;

          graphModalDataMovingAverageSamples.push(topic.value);
          if (graphModalDataMovingAverageSamples.length > graphModalDataMovingAverageSamplesCount) {
            graphModalDataMovingAverageSamples.shift();
          }
          graphModalDataMovingAverage = graphModalDataMovingAverageSamples.reduce((a, b) => a + b) / graphModalDataMovingAverageSamples.length;
        }
      } else {
        isGraphModalOpen = false;
      }
    }
  }

  $: {
    isAllTelemetryEnabled = networkTables.topics.get("/SmartDashboard/Robot/IsAllTelemetryEnabled")?.value ?? false;
  }
</script>

<main>
{ #if networkTables.isConnected }
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
              name: "/SmartDashboard/Robot/IsAllTelemetryEnabled", 
              type: NetworkTablesDataType.Boolean, 
              value: !isAllTelemetryEnabled 
            }]) } }>
            { isAllTelemetryEnabled ? "Disable": "Enable" } Telemetry
          </ToolbarMenuItem>
          <ToolbarMenuItem on:click={ () => { isDebugEnabled = !isDebugEnabled; networkTables = networkTables; } }>
            { isDebugEnabled ? "Hide": "Show" } Debug
          </ToolbarMenuItem>
        </ToolbarMenu>
      </ToolbarContent>
    </Toolbar>
    <svelte:fragment slot="cell" let:row let:cell>
      { #if cell.key === "name" }
        <span class="topicName" title={ cell.value }>{ cell.value }</span>
      { :else if cell.key === "timestamp" }
        { Utils.formatTimestamp(cell.value) }
      { :else if cell.key === "overflow" }
        <OverflowMenu flipped direction="top">
          <OverflowMenuItem on:click={ () => { } } disabled>Edit</OverflowMenuItem>
          <OverflowMenuItem on:click={ () => { openGraphModal(row.name) } } disabled={ !isGraphOptionEnabled(row.type) }>Graph</OverflowMenuItem>
        </OverflowMenu>
      { :else }
        <span title={ `<${ NetworkTablesDataType[row.type] }> ${ formatValue(cell.value, row.type) }` }>{ formatValue(cell.value, row.type) }</span>
      { /if }
    </svelte:fragment>
  </DataTable>
{ :else }
  <div class="inlineNotification">
    <InlineNotification
      title="Robot Not Connected:"
      subtitle={`Attempting to restart connection to ${ networkTables.address } ...`}
      kind="warning-alt"
      lowContrast
      hideCloseButton />
  </div>
  <DataTableSkeleton headers={ [ "Name", "Value", "Timestamp" ] } rows={ 13 } showHeader={ false } showToolbar={ false } />
{ /if }
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
    <Plot
      data={ graphModalData }
      config={{ responsive: true }}
      fillParent="width"
      layout={{
        height: 600,
        margin: { t: 60, b: 40 },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        colorway: [ "#FF69B4", "#AA00FF", "#FFFFFF" ],
        font: { color: "#FFFFFF" },
        title: {
          text: graphModalTopicName,
          x: 0,
          y: 1,
          pad: { l: 20 }
        },
        hoverlabel: { font: { color: "#FFFFFF" } },
        xaxis: {
          gridcolor: "#666666",
          tickformat: "%-H:%M:%S",
          hoverformat: "%-H:%M:%S.%L",
        },
        yaxis: {
          gridcolor: "#666666"
        },
        modebar: {
          bgcolor: "transparent",
          activecolor: "#FF69B4",
          remove: [ "lasso2d", "pan2d", "pan3d", "autoScale2d" ]
        }
      }} />
    <div class="movingAverage">
      Moving Average:
      <span class="value">{ graphModalDataMovingAverage.toFixed(6) }</span>
      <span class="input"><NumberInput bind:value={ graphModalDataMovingAverageSamplesCount } step={ 50 } min={ 50 } max={ 3000 } size="sm" /></span>samples
    </div>
  </div>
</Modal>

{ #if isDebugEnabled }
<pre class="debug">{ Utils.stringifyNetworkTables(networkTables, 4) }</pre>
{ /if }

<style lang="postcss">
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
    .movingAverage {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 30px 0 0 50px;

      .value {
        margin: 0 10px;
        font-weight: bold;
        font-size: 120%;
      }

      .input {
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