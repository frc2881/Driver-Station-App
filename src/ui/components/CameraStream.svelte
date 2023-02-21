<script lang="ts">
  import Video_02 from "carbon-pictograms-svelte/lib/Video_02.svelte";

  export let stream: string;
  export let isConnected: boolean;

  const transparentPixelImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  let image: HTMLImageElement;

  const reloadStream = (): void => {
    image.src = transparentPixelImage;
    image.src = stream;
  }
</script>

<div class="cameraStream">
  <div class="icon"><Video_02 class="placeholder" /></div>
  <img 
    bind:this={ image } 
    on:error={ reloadStream } 
    src={ isConnected ? stream : transparentPixelImage } 
    alt="" />
</div>

<style lang="postcss">
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