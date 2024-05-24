<script lang="ts">
  import Video_02 from "carbon-pictograms-svelte/lib/Video_02.svelte";
  import { Utils } from "../../../common";

  export let stream: string;
  export let width: string;
  export let height: string;

  const transparentPixelImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  let image: HTMLImageElement;

  (async (): Promise<void> => {
    while (true) {
      if (image) {
        setTransparentImage();
        await Utils.wait(0.001);
        image.src = `${ stream }?${ new Date().getTime() }`;
      }
      await Utils.wait(60);
    }
  })();

  const setTransparentImage = (): void => {
    image.src = transparentPixelImage;
  };
</script>

<div class="main" style:width style:height>
  <div class="icon"><Video_02 class="watermark" /></div>
  <img 
    src={ stream } 
    bind:this={ image } 
    on:error={ setTransparentImage }
    alt="" />
</div>

<style>
  .main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    & .icon {
      position: absolute;
		  
      & :global {
        & .watermark {
          width: 48px;
          height: 48px;
          transform: scale(4);
          fill: var(--app-color-pink);
          opacity: 0.2;
        }
      }
    }

    & img {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
</style>