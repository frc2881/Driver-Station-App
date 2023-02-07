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
    LocalStorage
  } from "carbon-components-svelte";
  import { 
    Configuration,
    Utils,
    NetworkTables,
    NetworkTablesTopic,
    NetworkTablesTopics
	} from "../../common";

  export let networkTables: NetworkTables;

  // const filters: any = [];
  // const selectedFilterIds: string[] = [];
  // for (let i = 0; i < Configuration.Settings.SUBSCRIPTION_TOPICS.length; i += 1) {
  //   const id = i.toString();
  //   filters.push({ id, text: Configuration.Settings.SUBSCRIPTION_TOPICS[i] });
  //   selectedFilterIds.push(id);
  // }

  let selectedTopicNames = new Set<string>(JSON.parse(window.localStorage.getItem("dataViewSelectedTopicNames")));

  let selectedTopicIds: number[] = [];

  // TODO: use Map directly to filter and group selected/default before converting to array for data table

  $: topics = Array.from(networkTables.topics.values()).filter(topic => !topic.name.includes("."));
  $: defaultTopics = topics.filter(topic => !selectedTopicIds.includes(topic.id));
  $: selectedTopics = topics.filter(topic => selectedTopicIds.includes(topic.id));

  const onRowSelectionChanged = (e: CustomEvent): void => {
    const topic = e.detail.row as NetworkTablesTopic;
    if (e.detail.selected) {
      selectedTopicNames.add(topic.name);
      window.scrollTo(0, 0);
    } else {
      selectedTopicNames.delete(topic.name);
    }
    window.localStorage.setItem("dataViewSelectedTopicNames", JSON.stringify(Array.from(selectedTopicNames)));
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
      rows={ selectedTopics.concat(defaultTopics) }
      selectable
      sortable
      bind:selectedRowIds = { selectedTopicIds }
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
          { Utils.formatFPGATimestamp(cell.value / 1000) }
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

  <!-- <pre class="debug">{ Utils.stringifyNetworkTables(networkTables, 4) }</pre> -->
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