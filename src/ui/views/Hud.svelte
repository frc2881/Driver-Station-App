<script lang="ts">
  import { InlineNotification, SkeletonPlaceholder } from "carbon-components-svelte";
  import { 
    Configuration,
		NetworkTables
	} from "../../common";
  import CameraStream from "../components/CameraStream.svelte";

  export let networkTables: NetworkTables;
</script>

<main>
{ #if networkTables.isConnected }
  <CameraStream 
    stream={ Configuration.Settings.CAMERA_STREAMS.LEFT }
    isConnected={ networkTables.isConnected }
    width={ "960px" } height={ "540px" }  />
  <CameraStream 
    stream={ Configuration.Settings.CAMERA_STREAMS.RIGHT }
    isConnected={ networkTables.isConnected }
    width={ "960px" } height={ "540px" }  />
{ :else }
  <div class="inlineNotification">
    <InlineNotification
      title="Robot Not Connected:"
      subtitle={`Attempting to restart connection to ${ networkTables.address } ...`}
      kind="warning-alt"
      lowContrast
      hideCloseButton />
  </div>
  <div class="watermark"><SkeletonPlaceholder class="skeleton" /><svg class="icon"><use xlink:href="#iconRobot"/></svg></div>
{ /if }
</main>

<style lang="postcss">
  main {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .inlineNotification {
    padding: .75em 2em;
  }

  .watermark {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-128px, -128px);

    :global {
      .skeleton {
        position: absolute;
        width: 256px;
        height: 256px;
      }
    }

    .icon {
      position: absolute;
      width: 256px;
      height: 256px;
      fill: var(--app-color-pink);
    }
  }
</style>