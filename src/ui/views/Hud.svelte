<script lang="ts">
  import Video_02 from "carbon-pictograms-svelte/lib/Video_02.svelte";
  import { 
    Configuration,
		NetworkTables
	} from "../../common";

  export let networkTables: NetworkTables;

  let leftCameraImage: HTMLImageElement;
  let rightCameraImage: HTMLImageElement;
</script>

<main>
  <div class="cameraStream">
    <div class="icon"><Video_02 class="placeholder" /></div>
    <img bind:this={ leftCameraImage } on:load={ (e) => { console.log(e); } }  on:error={ () => { const src = leftCameraImage.src; leftCameraImage.src = ""; leftCameraImage.src = src; } } src={ networkTables.isConnected ? Configuration.Settings.CAMERA_STREAMS.LEFT : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" } alt="" />
  </div>
  <div class="cameraStream">
    <div class="icon"><Video_02 class="placeholder" /></div>
    <img bind:this={ rightCameraImage } on:load={ (e) => { console.log(e); } } on:error={ () => { const src = rightCameraImage.src; rightCameraImage.src = ""; rightCameraImage.src = src; } } src={ networkTables.isConnected ? Configuration.Settings.CAMERA_STREAMS.RIGHT : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" } alt="" />
  </div>
</main>

<style lang="postcss">
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }

  .cameraStream {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 960px;
    height: 540px;

    & img {
      position: relative;
      width: 100%;
      height: 100%;

      &::before, &::after {
        display: none;
      }
    }

    & .icon {
      position: absolute;
    }
  }
</style>