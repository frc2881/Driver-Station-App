<script lang="ts">
  import Video_02 from "carbon-pictograms-svelte/lib/Video_02.svelte";
  import { 
		NetworkTables
	} from "../../common";

  export let networkTables: NetworkTables;

  let cameras = {
    left: {
      name: "LEFT",
      stream: "http://10.28.81.18:1183/stream.mjpg",
    },
    right: {
      name: "RIGHT",
      stream: "http://10.28.81.18:1183/stream.mjpg",
    }
  };
</script>

<main>
  <div class="cameraStream">
    <div class="icon"><Video_02 class="placeholder" /></div>
    <img src={ cameras.left.stream } alt="" />
  </div>
  <div class="cameraStream">
    <div class="icon"><Video_02 class="placeholder" /></div>
    <img src={ cameras.right.stream} alt="" />
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
    }

    & .icon {
      position: absolute;
    }
  }
</style>