<script lang="ts">
  import { InlineNotification } from "carbon-components-svelte";
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
  <div class="watermark"><svg class="icon"><use xlink:href="#iconRobot"/></svg></div>
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

    & .icon {
      width: 48px;
      height: 48px;
      transform: scale(6);
      fill: var(--_color-pink);
      opacity: 0.2;
    }
  }
</style>