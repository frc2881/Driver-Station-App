<script lang="ts">
  import { 
		NetworkTables,
    Utils
	} from "../../common";

  export let networkTables: NetworkTables;
</script>

<main>
  <pre>{ Utils.stringifyNetworkTables(networkTables, 4) }</pre>
</main>

<style lang="postcss">
	pre {
    margin: 0;
    padding: 1em;
		color: var(--_color-pink);
    font-size: 80%;
    opacity: 0.5;
	}
</style>