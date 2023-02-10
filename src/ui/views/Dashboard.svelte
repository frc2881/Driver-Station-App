<script lang="ts">
  import Dashboard from "carbon-pictograms-svelte/lib/Dashboard.svelte";
  import { 
		NetworkTables,
    Utils
	} from "../../common";

  export let networkTables: NetworkTables;
</script>

<main>
  <Dashboard class="placeholder" />
</main>

<style lang="postcss">
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }
</style>