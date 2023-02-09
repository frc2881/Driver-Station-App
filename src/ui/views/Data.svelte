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
    Checkbox
  } from "carbon-components-svelte";
  import { 
    Configuration,
    NetworkTables,
	} from "../../common";
  import {
    Utils as UiUtils,
    RowSelectionChanged
  } from "../common";

  export let networkTables: NetworkTables;

  let selectedTopicNames: string[] = JSON.parse(window.localStorage.getItem("App.Data.SelectedTopicNames")) ?? [];

  const subscriptions = Configuration.Settings.SUBSCRIPTIONS;
  let selectedSubscriptions: string[] = JSON.parse(window.localStorage.getItem("App.Data.SelectedSubscriptions")) ?? subscriptions;
  let isSubscriptionsModalOpen = false;

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

  $: topics = Array.from(networkTables.topics.values())
      .filter(topic => !topic.name.includes("."))
      .filter(topic => selectedSubscriptions.some(subscription => topic.name.startsWith(subscription)))
      .sort((a, b) => (selectedTopicNames.includes(b.name) ? 1 : 0) - (selectedTopicNames.includes(a.name) ? 1 : 0));

  $: selectedRowIds = selectedTopicNames.map(topicName => networkTables.topics.get(topicName)?.id);
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
            <ToolbarMenuItem on:click={ () => { isSubscriptionsModalOpen = true; } }>Subscriptions</ToolbarMenuItem>
          </ToolbarMenu>
        </ToolbarContent>
      </Toolbar>
      <svelte:fragment slot="cell" let:row let:cell>
        { #if cell.key === "name" }
          <span class="topicName" title={ cell.value }>{ cell.value }</span>
        { :else if cell.key === "timestamp" }
          { UiUtils.formatFPGATimestamp(cell.value / 1000) }
        { :else if cell.key === "overflow" }
          <OverflowMenu flipped>
            <OverflowMenuItem text="Edit" />
          </OverflowMenu>
        { :else }
          { cell.value }
        { /if }
      </svelte:fragment>
    </DataTable>
  { :else }
    <DataTableSkeleton headers={ ["Name", "Value", "Timestamp" ] } rows={ 12 } showHeader={ false } showToolbar={ false } />
  { /if }

  <!-- <pre class="debug">{ UiUtils.stringifyNetworkTables(networkTables, 4) }</pre> -->
</main>

<Modal
  size="xs"
  modalHeading="Subscriptions"
  primaryButtonText="Ok"
  bind:open = { isSubscriptionsModalOpen }
  on:submit = { () => { isSubscriptionsModalOpen = false; } }
  on:close = { onSubscriptionsModalClosed }>
  {#each subscriptions as subscription}
    <Checkbox bind:group = { selectedSubscriptions } labelText={ subscription } value = { subscription } />
  {/each}
</Modal>

<style lang="postcss">
  main {
    margin: 0;
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