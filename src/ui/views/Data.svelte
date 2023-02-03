<script lang="ts">
  import { 
    DataTable, 
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
  } from "carbon-components-svelte";
  import { 
    Configuration,
    Utils,
    NetworkTables
	} from "../../common";

  export let networkTables: NetworkTables;

  const dataTableHeaders: any = [
    { key: "name", value: "Name", width: "50%" },
    { key: "value", value: "Value", width: "35%", sort: false },
    { key: "timestamp", value: "Timestamp", width: "10%" }
  ];

  // const filters: any = [];
  // const selectedFilterIds: string[] = [];
  // for (let i = 0; i < Configuration.Settings.SUBSCRIPTION_TOPICS.length; i += 1) {
  //   const id = i.toString();
  //   filters.push({ id, text: Configuration.Settings.SUBSCRIPTION_TOPICS[i] });
  //   selectedFilterIds.push(id);
  // }

  let selectedTopicIds: number[] = [];

  $: topics = Array.from(networkTables.topics.values()).filter(topic => !topic.name.includes("."));
  $: defaultTopics = topics.filter(topic => !selectedTopicIds.includes(topic.id));
  $: selectedTopics = topics.filter(topic => selectedTopicIds.includes(topic.id));
</script>

<main>
  { #if selectedTopicIds.length > 0 }
    <div class="pinnedTopics">
      <DataTable
        headers={ dataTableHeaders }
        rows={ selectedTopics }
        size="medium"
        sortable
        batchSelection
        bind:selectedRowIds={ selectedTopicIds }>
        <svelte:fragment slot="cell" let:row let:cell>
          { #if cell.key === "name" }
            <div class="name" title={ cell.value }>{ cell.value }</div>
          { :else if cell.key === "timestamp" }
            { Utils.formatFPGATimestamp(cell.value / 1000) }
          { :else }
            { cell.value }
          { /if }
        </svelte:fragment>
      </DataTable>
    </div>
  { /if }
  <DataTable
    headers={ dataTableHeaders }
    rows={ defaultTopics }
    size="medium"
    sortable
    selectable
    bind:selectedRowIds={ selectedTopicIds }>
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch shouldFilterRows />
      </ToolbarContent>
    </Toolbar>
    <svelte:fragment slot="cell" let:row let:cell>
      { #if cell.key === "name" }
        <span class="name" title={ cell.value }>{ cell.value }</span>
      { :else if cell.key === "timestamp" }
        { Utils.formatFPGATimestamp(cell.value / 1000) }
      { :else }
        { cell.value }
      { /if }
    </svelte:fragment>
  </DataTable>

  <!-- <pre class="debug">{ Utils.stringifyNetworkTables(networkTables, 4) }</pre> -->
</main>

<style lang="postcss">
  main {
    margin: 0;
  }

  .pinnedTopics {
    margin-bottom: 3.5em;
  }

  .name {
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