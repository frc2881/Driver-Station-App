<script lang="ts">
  import Video_02 from "carbon-pictograms-svelte/lib/Video_02.svelte";
  import { Utils } from "../../common/index.js";

  interface Props {
    streamUrl?: string;
    deviceLabel?: string;
    width: number;
    height: number;
    scale?: number;
  }

  let {
    streamUrl = "",
    deviceLabel = "",
    width,
    height,
    scale = 1
  }: Props = $props();

  const transparentPixelImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  let image: HTMLImageElement | undefined = $state();
  let video: HTMLVideoElement | undefined = $state();

  const loadVideoStream = async (): Promise<void> => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      for (const device of devices) {
        if (device.label.includes(deviceLabel)) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: device.deviceId } }
          });
          video!.srcObject = stream;
          video!.play();
          break;
        }
      }
    } catch (e) {}
  }

  // svelte-ignore state_referenced_locally
  if (deviceLabel) {
    loadVideoStream();
  }

  (async (): Promise<void> => {
    while (true) {
      if (streamUrl && image!) {
        image!.src = `${ streamUrl }?${ new Date().getTime() }`;
      }
      await Utils.wait(15);
    }
  })();
</script>

<div class="main">
  <div class="icon"><Video_02 class="watermark" /></div>
  <div class="media" style={ `width:${width}px;height:${height}px;` }>
  {#if streamUrl}
    <img 
      src={ `${ streamUrl }?${ new Date().getTime() }` }
      bind:this={ image } 
      onerror={() => { image!.src = transparentPixelImage; }}
      alt="" />
  {/if}
  {#if deviceLabel}
    <video 
      bind:this={ video }
      style={ `transform:scale(${ scale });` }>
      <track kind="captions"/>
    </video>
  {/if}
  </div>
</div>

<style>
  .main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    & .media {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      & img {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 9998;
      }

      & video {
        width: 100%;
        height: 100%;
        z-index: 9998;
      }
    }

    & .icon {
      position: absolute;
		  
      & :global(.watermark) {
        width: 48px;
        height: 48px;
        transform: scale(4);
        fill: var(--app-color-pink);
        opacity: 0.2;
      }
    }
  }
</style>