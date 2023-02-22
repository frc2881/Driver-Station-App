<script lang="ts">
  import { 
    Configuration,
		NetworkTables
	} from "../../common";
  import CameraStream from "../components/CameraStream.svelte";

  export let networkTables: NetworkTables;
</script>

<main>
  <CameraStream 
    stream={ Configuration.Settings.CAMERA_STREAMS.LEFT }
    isConnected={ networkTables.isConnected }
    width={ "960px" } height={ "540px" }  />
  <CameraStream 
    stream={ Configuration.Settings.CAMERA_STREAMS.RIGHT }
    isConnected={ networkTables.isConnected }
    width={ "960px" } height={ "540px" }  />
</main>

<style lang="postcss">
  main {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>