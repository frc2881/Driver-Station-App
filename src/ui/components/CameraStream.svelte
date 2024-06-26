<script lang="ts">
  import Video_02 from "carbon-pictograms-svelte/lib/Video_02.svelte";
  import { type CameraStreamInfo, Utils } from "../../common/index.js";

  export let streamInfo: CameraStreamInfo;
  export let width: number;
  export let height: number;
  export let scale: number = 1;

  const transparentPixelImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  let image: HTMLImageElement = null;
  let video: HTMLVideoElement = null;

  const loadVideoStream = async (): Promise<void> => {
    try {
      let deviceId: string;
      const devices = await navigator.mediaDevices.enumerateDevices();
      for (const device of devices) {
        if (device.label.includes(streamInfo.device)) {
          deviceId = device.deviceId;
          break;
        }
      }
      if (deviceId) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: deviceId } }
        });
        video.srcObject = stream;
        video.play();
      }
    } catch (e) {}
  }

  if (streamInfo.device) {
    loadVideoStream();
  }

  if (streamInfo.url) {
    (async (): Promise<void> => {
      while (true) {
        if (image) {
          image.src = transparentPixelImage;
          await Utils.wait(0.01);
          image.src = `${ streamInfo.url }?${ new Date().getTime() }`;
        }
        await Utils.wait(60);
      }
    })();
  }
</script>

<div class="main" style={ `width:${width}px;height:${height}px;` }>
  <div class="icon"><Video_02 class="watermark" /></div>
{ #if streamInfo.url }
  <img 
    src={ streamInfo.url } 
    bind:this={ image } 
    on:error={ () => { image.src = transparentPixelImage; } }
    alt="" />
{ /if }
{ #if streamInfo.device }
  <video 
    bind:this={ video }
    style={ `transform:scale(${ scale });` }>
    <track kind="captions"/>
  </video>
{ /if }
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
      z-index: 9999;
    }

    & video {
      width: 100%;
      height: 100%;
      z-index: 9999;
    }
  }
</style>