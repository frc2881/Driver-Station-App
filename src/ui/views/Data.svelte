<script lang="ts">
  import { 
		NetworkTables
	} from "../../common";

  export let networkTables: NetworkTables;
</script>

<main>
  <pre>{ JSON.stringify(networkTables, null, 4) }</pre>
</main>

<style lang="postcss">
	pre {
    margin: 0;
    padding: 1em;
		color: var(--_color-green);
    font-size: 80%;
	}
</style>