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
    isConnected={ networkTables.isConnected }  />
  <CameraStream 
    stream={ Configuration.Settings.CAMERA_STREAMS.RIGHT }
    isConnected={ networkTables.isConnected }  />
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