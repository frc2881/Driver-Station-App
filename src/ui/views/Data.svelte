<script lang="ts">
  import { DataTable } from "carbon-components-svelte";
  import { 
    Utils,
    NetworkTables,
    NetworkTablesTopics
	} from "../../common";

  export let networkTables: NetworkTables;
</script>

<main>
  <DataTable
    headers={[
      { key: "name", value: "Name" },
      { key: "value", value: "Value", sort: false },
      { key: "type", value: "Type", sort: false },
      { key: "timestamp", value: "Timestamp" }
    ]}
    rows={ [ ...networkTables.topics.values() ] }
    size="medium"
    sortable
  />

  <!-- <pre class="debug">{ Utils.stringifyNetworkTables(networkTables, 4) }</pre> -->
</main>

<style lang="postcss">
	/* .debug {
    display: block;
    margin: 0;
    padding: 1em;
		color: var(--_color-green);
    font-size: 80%;
	} */
</style>