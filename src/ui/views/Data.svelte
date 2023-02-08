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
    OverflowMenuItem
  } from "carbon-components-svelte";
  import { 
    Configuration,
    NetworkTables,
	} from "../../common";
  import {
    Utils as UiUtils,
    NetworkTablesTopicSelectionChanged
  } from "../common";

  export let networkTables: NetworkTables;

  // const filters: any = [];
  // const selectedFilterIds: string[] = [];
  // for (let i = 0; i < Configuration.Settings.SUBSCRIPTION_TOPICS.length; i += 1) {
  //   const id = i.toString();
  //   filters.push({ id, text: Configuration.Settings.SUBSCRIPTION_TOPICS[i] });
  //   selectedFilterIds.push(id);
  // }

  let selectedTopicNames: string[] = JSON.parse(window.localStorage.getItem("dataViewSelectedTopicNames")) ?? [];
  let selectedRowIds: number[] = [];

  const onRowSelectionChanged = (e: CustomEvent): void => {
    const { row: topic, selected } = e.detail as NetworkTablesTopicSelectionChanged;
    if (selected) {
      selectedTopicNames.push(topic.name);
      window.scrollTo(0, 0);
    } else {
      selectedTopicNames.splice(selectedTopicNames.indexOf(topic.name), 1);
    }
    window.localStorage.setItem("dataViewSelectedTopicNames", JSON.stringify(selectedTopicNames));
    selectedTopicNames = selectedTopicNames;
  }

  $: topics = Array.from(networkTables.topics.values())
      .filter(topic => !topic.name.includes("."))
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
            <ToolbarMenuItem primaryFocus on:click={ () => {} }>Settings</ToolbarMenuItem>
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
    <DataTableSkeleton headers={ ["Name", "Value", "Timestamp" ] } rows={ 8 } showHeader={ false } showToolbar={ false } />
  { /if }

  <!-- <pre class="debug">{ UiUtils.stringifyNetworkTables(networkTables, 4) }</pre> -->
</main>

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