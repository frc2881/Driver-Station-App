<script lang="ts">
  import { Tile, InlineNotification, SkeletonPlaceholder } from "carbon-components-svelte";
  import { NetworkTables } from "../../common";
  import RobotInfo from "../components/RobotInfo.svelte";
  import Suction from "../components/Suction.svelte";

  export let networkTables: NetworkTables;
</script>

<main>
{ #if networkTables.isConnected }
  <div class="info">
    <div class="left">
      <RobotInfo 
        mode={ networkTables.topics.get("/SmartDashboard/Robot/Mode") }
        status={ networkTables.topics.get("/SmartDashboard/Robot/Status") }/>
    </div>
    <div class="right"></div>
  </div>
  <div class="widgets">
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget">
      <Suction
        isEnabled={ networkTables.topics.get("/SmartDashboard/Suction/IsEnabled") }
        topPressureCurrent={ networkTables.topics.get("/SmartDashboard/Suction/Top/Pressure/Current") }
        topPressureMinimum={ networkTables.topics.get("/SmartDashboard/Suction/Top/Pressure/Minimum") }
        topPressureTarget={ networkTables.topics.get("/SmartDashboard/Suction/Top/Pressure/Target") }
        topMotorSpeed={ networkTables.topics.get("/SmartDashboard/Suction/Top/Motor/Speed") }
        bottomPressureCurrent={ networkTables.topics.get("/SmartDashboard/Suction/Bottom/Pressure/Current") }
        bottomPressureMinimum={ networkTables.topics.get("/SmartDashboard/Suction/Bottom/Pressure/Minimum") }
        bottomPressureTarget={ networkTables.topics.get("/SmartDashboard/Suction/Bottom/Pressure/Target") }
        bottomMotorSpeed={ networkTables.topics.get("/SmartDashboard/Suction/Bottom/Motor/Speed") }
       />
    </Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
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
    width: 100vw;
    height: 100vh;
    
    .info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 100px;
      padding: 0 20px;

      .left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    .widgets {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 350px;
      column-gap: 20px;
      row-gap: 20px;
      padding: 0 20px 20px 20px;

      :global {
        .widget {
          padding: 2em;

          .main {
            display: grid;
            grid-template-rows: 50px auto;
            width: 100%;
            height: 100%;

            .title {
              color: var(--app-color-smoke);
            }
          }
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