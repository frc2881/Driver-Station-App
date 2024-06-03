<script lang="ts">
  import Video_02 from "carbon-pictograms-svelte/lib/Video_02.svelte";

  export let deviceLabel: string;
  export let width: string;
  export let height: string;
  export let scale: number;

  let driverStationVideoSource: HTMLVideoElement = null;

  $: {
    if (driverStationVideoSource === null) {
      loadDriverStationVideoStream();
    }
  }

  const loadDriverStationVideoStream = async (): Promise<void> => {
    try {
      let deviceId: string;
      const devices = await navigator.mediaDevices.enumerateDevices();
      for (const device of devices) {
        if (device.label.includes(deviceLabel)) {
          deviceId = device.deviceId;
          break;
        }
      }
      if (deviceId) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: deviceId } }
        });
        driverStationVideoSource.srcObject = stream;
        driverStationVideoSource.play();
      }
    } catch (e) {}
  }
</script>

<div class="main" style:width style:height>
  <div class="icon"><Video_02 class="watermark" /></div>
  <video 
    style={ `transform:scale(${ scale });` }
    bind:this={ driverStationVideoSource }>
    <track kind="captions"/>
  </video>
</div>

<style>
  .main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    & video {
      width: 100%;
      height: 100%;
    }

    & .icon {
      position: absolute;
		  
      & :global {
        & .watermark {
          width: 48px;
          height: 48px;
          transform: scale(2);
          fill: var(--app-color-pink);
          opacity: 0.2;
        }
      }
    }
  }
</style>