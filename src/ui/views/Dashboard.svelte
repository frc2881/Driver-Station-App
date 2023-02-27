<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Tile, InlineNotification, SkeletonPlaceholder } from "carbon-components-svelte";
  import { NetworkTables, NetworkTablesTopic, NetworkTablesDataType } from "../../common";
  import RobotInfo from "../components/Dashboard/RobotInfo.svelte";
  import AutoCommand from "../components/Dashboard/AutoCommand.svelte";

  export let networkTables: NetworkTables;

  const dispatch = createEventDispatcher();

  const updateNetworkTablesTopic = (topic: NetworkTablesTopic): void => {
    dispatch("updateNetworkTablesTopic", topic);
  }

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
    <Tile class="widget"></Tile>
    <Tile class="widget">
      <AutoCommand
        options={ networkTables.topics.get("/SmartDashboard/Auto/Command/options") }
        active={ networkTables.topics.get("/SmartDashboard/Auto/Command/active") }
        onSelected={ (e) => { 
          updateNetworkTablesTopic({ 
            id: 0, 
            name: "/SmartDashboard/Auto/Command/selected", 
            type: NetworkTablesDataType.String, 
            value: e.detail.selectedItem.text 
          }) } } />
    </Tile>
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
    overflow: hidden;
    
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