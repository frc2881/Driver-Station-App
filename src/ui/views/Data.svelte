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
    InlineNotification
  } from "carbon-components-svelte";
  import { LineChart } from "@carbon/charts-svelte";
  import { ChartTheme, ScaleTypes } from "../../../node_modules/@carbon/charts/interfaces";
  import { 
    Configuration,
    NetworkTables,
    NetworkTablesDataType,
    NetworkTablesTopic
	} from "../../common";
  import {
    Utils as UiUtils,
    RowSelectionChanged
  } from "../common";

  export let networkTables: NetworkTables;

  let isMetadataPropsEnabled: boolean = false;

  let selectedTopicNames: string[] = JSON.parse(window.localStorage.getItem("App.Data.SelectedTopicNames")) ?? [];

  const subscriptions = Configuration.Settings.SUBSCRIPTIONS;
  let selectedSubscriptions: string[] = JSON.parse(window.localStorage.getItem("App.Data.SelectedSubscriptions")) ?? subscriptions;
  let isSubscriptionsModalOpen: boolean = false;

  let graphModalTopicName: string = null;
  let graphModalTopicValues: NetworkTablesTopic[] = [];
  let isGraphModalOpen: boolean = false;

  let selectedRowIds: number[] = [];
  
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
    graphModalTopicName = topicName;
    const topic = networkTables.topics.get(topicName);
    graphModalTopicValues.push(topic); 
    graphModalTopicValues = graphModalTopicValues;
    isGraphModalOpen = true;
  }

  const onGraphModalClosed = (): void => {
    isGraphModalOpen = false;
    graphModalTopicValues = [];
    graphModalTopicValues = graphModalTopicValues;
    graphModalTopicName = null;
  }

  const isGraphOptionEnabled = (type: NetworkTablesDataType): boolean => {
    switch (type) {
      case NetworkTablesDataType.Boolean:
      case NetworkTablesDataType.Double:
      case NetworkTablesDataType.Integer:
      case NetworkTablesDataType.Float:
        return true;
      default:
        return false;
    }
  }

  $: topics = Array.from(networkTables.topics.values())
      .filter(topic => isMetadataPropsEnabled || !topic.name.includes("."))
      .filter(topic => selectedSubscriptions.some(subscription => topic.name.startsWith(subscription)))
      .sort((a, b) => (selectedTopicNames.includes(b.name) ? 1 : 0) - (selectedTopicNames.includes(a.name) ? 1 : 0));

  $: selectedRowIds = selectedTopicNames.map(topicName => networkTables.topics.get(topicName)?.id);

  $: {
    if (isGraphModalOpen) {
      const topic = networkTables.topics.get(graphModalTopicName);
      if (topic.value !== graphModalTopicValues[graphModalTopicValues.length - 1].value) {
        graphModalTopicValues.push(networkTables.topics.get(graphModalTopicName));
        graphModalTopicValues = graphModalTopicValues;
      }
    }
  }
</script>

<main>
  { #if networkTables.isConnected }
    <DataTable
      headers={ [
        { key: "name", value: "Name", width: "50%" },
        { key: "value", value: "Value", width: "30%", sort: false },
        { key: "timestamp", value: "Timestamp", width: "10%" },
        { key: "overflow", empty: true }
      ] }
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
          </ToolbarMenu>
        </ToolbarContent>
      </Toolbar>
      <svelte:fragment slot="cell" let:row let:cell>
        { #if cell.key === "name" }
          <span class="topicName" title={ cell.value }>{ cell.value }</span>
        { :else if cell.key === "timestamp" }
          { UiUtils.formatFPGATimestamp(cell.value / 1000) }
        { :else if cell.key === "overflow" }
          <OverflowMenu flipped direction="top">
            <OverflowMenuItem on:click={ () => { } } disabled>Edit</OverflowMenuItem>
            <OverflowMenuItem on:click={ () => { openGraphModal(row.name) } } disabled={ !isGraphOptionEnabled(row.type) }>Graph</OverflowMenuItem>
          </OverflowMenu>
        { :else }
          { cell.value }
        { /if }
      </svelte:fragment>
    </DataTable>
  { :else }
    <InlineNotification
      title="Robot Not Connected:"
      subtitle={`Attempting to restart connection to ${ networkTables.address } ...`}
      kind="warning-alt"
      lowContrast
      hideCloseButton/>
    <DataTableSkeleton headers={ ["Name", "Value", "Timestamp" ] } rows={ 10 } showHeader={ false } showToolbar={ false } />
  { /if }
</main>

<Modal
  modalHeading="Subscriptions"
  size="xs"
  primaryButtonText="Ok"
  bind:open = { isSubscriptionsModalOpen }
  on:submit = { () => { isSubscriptionsModalOpen = false; } }
  on:close = { onSubscriptionsModalClosed }>
  {#each subscriptions as subscription}
    <Checkbox bind:group = { selectedSubscriptions } labelText={ subscription } value = { subscription } />
  {/each}
</Modal>

<Modal
  modalHeading="Value Graph"
  size="lg"
  passiveModal
  preventCloseOnClickOutside
  selectorPrimaryFocus=".noop"
  bind:open = { isGraphModalOpen }
  on:close = { onGraphModalClosed }>
  <span class="noop"></span>
  <LineChart 
    data={ graphModalTopicValues }
    options={{
      title: graphModalTopicName,
      height: "540px",
      theme: ChartTheme.G100,
      legend: { clickable: false },
      data: { groupMapsTo: "name" },
      axes: {
        left: {
          mapsTo: "value",
          scaleType: ScaleTypes.LINEAR
        },
        bottom: {
          mapsTo: "timestamp",
          scaleType: ScaleTypes.TIME
        }
      }
    }}
  />
</Modal>

<!-- <pre class="debug">{ UiUtils.stringifyNetworkTables(networkTables, 4) }</pre> -->

<style lang="postcss">
  main {
    display: flex;
    flex-direction: column;
    padding: var(--cds-spacing-06);
  }

  .topicName {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

	/* .debug {
    display: block;
    margin: 0;
    padding: 1em;
		color: var(--_color-green);
    font-size: 80%;
	} */
</style>