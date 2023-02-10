<script lang="ts">
  import Video_02 from "carbon-pictograms-svelte/lib/Video_02.svelte";
  import { 
		NetworkTables,
    Utils
	} from "../../common";

  export let networkTables: NetworkTables;
</script>

<main>
  <Video_02 class="placeholder" />
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