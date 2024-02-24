<script lang="ts">
  import { Tile, InlineNotification, SkeletonPlaceholder } from "carbon-components-svelte";
  import { Configuration } from "../../config";
  import { NetworkTables } from "../../common";
  import { NetworkTablesStore } from "../stores/NetworkTables";
  import RobotInfo from "../components/Dashboard/RobotInfo.svelte";
  import GameInfo from "../components/Dashboard/GameInfo.svelte";
  import BatteryInfo from "../components/Dashboard/BatteryInfo.svelte";
  import PoseInfo from "../components/Dashboard/PoseInfo.svelte";
  import DriveSettings from "../components/Dashboard/DriveSettings.svelte";
  import AutoSettings from "../components/Dashboard/AutoSettings.svelte";

  const { Topics } = Configuration.Settings.NetworkTables;

  let nt: NetworkTables = $NetworkTablesStore;
  $: { nt = $NetworkTablesStore; }

  let isControllerMapVisible: boolean = false;
</script>

<main>
{ #if nt.isConnected }
  <div class="info">
    <div class="left">
      <RobotInfo 
        mode={ nt.topics.get(Topics.RobotMode)?.value } 
        state={ nt.topics.get(Topics.RobotState)?.value } />
      <GameInfo 
        alliance={ nt.topics.get(Topics.Alliance)?.value } 
        stationNumber={ nt.topics.get(Topics.StationNumber)?.value } />
    </div>
    <div class="center">
      <div class="controller-map-button">
        <button on:click={ () => { isControllerMapVisible = !isControllerMapVisible; } }>
          <img src="./assets/controller.png" alt="Controller Map" />
        </button>
      </div>
    </div>
    <div class="right">
      <BatteryInfo 
        voltage={ nt.topics.get(Topics.BatteryVoltage)?.value } />
    </div>
  </div>
  <div class="widgets">
    <Tile class="widget">
      <DriveSettings />
    </Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget">
      <PoseInfo 
        rearPoseSensorHasTargets={ nt.topics.get(Topics.RearPoseSensorHasTargets)?.value }
        sidePoseSensorHasTargets={ nt.topics.get(Topics.SidePoseSensorHasTargets)?.value }
        frontNoteObjectSensorHasTarget={ nt.topics.get(Topics.FrontNoteObjectSensorHasTarget)?.value }
        robotPose={ nt.topics.get(Topics.RobotPose)?.value }
      /> 
    </Tile>
    <Tile class="widget">
      <AutoSettings />
    </Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget">
      <!-- <div class="title"><h4>Calibration</h4></div>
      <div class="data">
        <div>Intake Sensor: { nt.topics.get(Topics.IntakeDistanceSensor)?.value ?? -1 } (Target: { nt.topics.get(Topics.IntakeDistanceSensorHasTarget)?.value ?? false })</div>
        <div>Launcher Sensor: { nt.topics.get(Topics.LauncherDistanceSensor)?.value ?? -1 } (Target: { nt.topics.get(Topics.LauncherDistanceSensorHasTarget)?.value ?? false })</div> 
      </div> -->
    </Tile>
    { #if isControllerMapVisible }
    <div 
      class="controller-map"
      on:click={ () => { isControllerMapVisible = !isControllerMapVisible; } }>
      <div class="controllers">
        <!-- Driver -->
        <div class="text title" style="left:465px;top:50px;"><h3>Driver</h3></div>
        <div class="text" style="left:325px;bottom:570px;">
          <div>LT: Intake Rear</div>
        </div>
        <div class="text right" style="right:1025px;bottom:570px;">
          <div>RT: Intake Front</div>
        </div>
        <div class="text" style="left:325px;bottom:480px;">
          <div>LB: Eject Rear</div>
        </div>
        <div class="text right" style="right:1025px;bottom:480px;">
          <div>RB: Eject Front</div>
        </div>
        <div class="text" style="left:325px;bottom:380px;">
          <div>X: Drive</div>
          <div>Y: Drive</div>
          <div>Press: Lock</div>
        </div>
        <div class="text right" style="right:1025px;bottom:380px;">
          <div>A: Align To Target</div>
          <div>B: Move To Climb</div>
          <div>Y: Climb</div>
          <div>X: -----</div>
        </div>
        <div class="text" style="left:325px;bottom:290px;">
          <div>L: -----</div>
          <div>U: -----</div>
          <div>R: -----</div>
          <div>D: -----</div>
        </div>
        <div class="text right" style="right:1025px;bottom:290px;">
          <div>X: Rotate</div>
          <div>Y: -----</div>
          <div>Press: -----</div>
        </div>
        <div class="text" style="left:325px;bottom:180px;">
          <div>Back: Reset Gyro</div>
        </div>
        <div class="text right" style="right:1025px;bottom:180px;">
          <div>Start: -----</div>
        </div>
        <div class="text notes" style="left:60px;top:160px;">
          <div>
            Notes:
            <ul>
              <li>Reset gyro to field orientation after robot power cycle</li>
            </ul>
          </div>
        </div>
        <!-- Operator -->
        <div class="text title" style="right:465px;top:50px;"><h3>Operator</h3></div>
        <div class="text" style="left:1025px;bottom:570px;">
          <div>LT: -----</div>
        </div>
        <div class="text right" style="right:325px;bottom:570px;">
          <div>RT: Run Launcher</div>
        </div>
        <div class="text" style="left:1025px;bottom:480px;">
          <div>LB: Climber Rollers Out</div>
        </div>
        <div class="text right" style="right:325px;bottom:480px;">
          <div>RB: Climber Rollers In</div>
        </div>
        <div class="text" style="left:1025px;bottom:380px;">
          <div>X: -----</div>
          <div>Y: Launcher +/-</div>
          <div>Press: -----</div>
        </div>
        <div class="text right" style="right:325px;bottom:380px;">
          <div>A: Align To Target</div>
          <div>B: -----</div>
          <div>Y: -----</div>
          <div>X: Run Feeder</div>
        </div>
        <div class="text" style="left:1025px;bottom:290px;">
          <div>L: Long Range</div>
          <div>U: Mid Range</div>
          <div>R: Subwoofer</div>
          <div>D: Amp</div>
        </div>
        <div class="text right" style="right:325px;bottom:290px;">
          <div>X: -----</div>
          <div>Y: Climber +/-</div>
          <div>Press: -----</div>
        </div>
        <div class="text" style="left:1025px;bottom:180px;">
          <div>Back: Reset Subsystems</div>
        </div>
        <div class="text right" style="right:325px;bottom:180px;">
          <div>Start: Reset Launcher</div>
        </div>
        <div class="text notes" style="right:60px;top:160px;">
          <div>
            Notes:
            <ul>
              <li>Always reset subsystems before and after robot power cycle</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    { /if }
  </div>
{ :else }
  <div class="inlineNotification">
    <InlineNotification
      title="Robot Not Connected:"
      subtitle={`Attempting to restart connection to ${ nt.address } ...`}
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
      grid-template-columns: repeat(3, 1fr);
      height: 90px;
      padding: 0 20px;

      .left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1.25em;
      }

      .center {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .controller-map-button {
        button {
          margin: 6px 0 0 0;
          padding: 0;
          background: transparent;
          border: none;
          cursor: pointer;

          img {
            height: 36px;
          }
        }
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

          .title {
            margin-bottom: 1.5em;
            border-bottom: 1px solid var(--app-color-charcoal);
            padding: 0px 3px;
          }

          .data {
            display: grid;
            gap: .75em;
          }
        }
      }

      .controller-map {
        position: absolute;
        z-index: 9999;
        width: calc(100% - 40px);
        height: 720px;
        background: #FFFFFF;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        .controllers {
          width: 1400px;
          height: 720px;
          background-image: url("./assets/controllers.png");

          .text {
            position: absolute;
            color: var(--app-color-black);
            display: flex;
            flex-direction: column;
            gap: .25em;
            font-size: 12px;

            &.title {
              width: 250px;
              padding: 5px 15px;
              border: 1px solid var(--app-color-charcoal);
              text-align: center;
            }

            &.right {
              text-align: right;
            }

            &.notes {
              width: 200px;
              height: 390px;
              padding: 15px;
              border: 1px solid var(--app-color-charcoal);

              ul {
                margin: 10px 0 0 15px;
                list-style-type: square;
              }
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