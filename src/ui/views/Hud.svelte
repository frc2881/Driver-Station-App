<script lang="ts">
  import { InlineNotification, SkeletonPlaceholder } from "carbon-components-svelte";
  import { 
    Configuration,
    Utils,
		NetworkTables
	} from "../../common";
  import CameraStream from "../components/CameraStream.svelte";

  export let networkTables: NetworkTables;

  let matchTime: number;

  $: {
    matchTime = networkTables.topics.get("/SmartDashboard/Timing/MatchTime")?.value ?? 0;
    if (matchTime === -1) { matchTime = 0; }
  }
</script>

<main>
{ #if networkTables.isConnected }
  <div class="cameras">
    <CameraStream 
      stream={ Configuration.Settings.CAMERA_STREAMS.LEFT }
      isConnected={ networkTables.isConnected }
      width={ "800px" } height={ "600px" }  />
    <CameraStream 
      stream={ Configuration.Settings.CAMERA_STREAMS.RIGHT }
      isConnected={ networkTables.isConnected }
      width={ "800px" } height={ "600px" }  />
  </div>
  <div class="info">
    <div></div>
    <div 
      class="matchTime"
      class:inactive={ matchTime === -1 }
      class:normal={ matchTime > 0 }
      class:warning={ 
        Utils.isNumberInRange(
          matchTime, 
          Configuration.Settings.MATCH_TIME_TRIGGERS.CRITICAL, 
          Configuration.Settings.MATCH_TIME_TRIGGERS.WARNING
        ) }
      class:critical={ 
        Utils.isNumberInRange(
          matchTime, 1, Configuration.Settings.MATCH_TIME_TRIGGERS.CRITICAL
        ) }>
      { matchTime }
    </div>
    <div></div>
  </div>
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
    display: grid;
    grid-template-rows: 600px auto;
    row-gap: 20px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    cursor: none;

    .cameras {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .info {
      display: grid;
      grid-template-columns: auto auto auto;
      width: 100%;

      .matchTime {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 200px;
        line-height: 200px;
        font-weight: bold;
        color: var(--app-color-charcoal);

        &.inactive {
          color: var(--app-color-charcoal) !important;
        }

        &.normal {
          color: var(--app-color-white);
        }

        &.warning {
          color: var(--app-color-yellow);
          animation: pulse-animation 1000ms ease-in-out infinite;
        }

        &.critical {
          color: var(--app-color-red);
          animation: pulse-animation 750ms ease-in-out infinite;
        }
      }
    }
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