<script lang="ts">
  import { CheckmarkFilled, WarningAltFilled, CenterSquare } from "carbon-icons-svelte";
  import { Modal } from "carbon-components-svelte";
  import { Utils, type Pose2d } from "../../../common/index.js";
  import CameraStream from "../../components/CameraStream.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let poseSensors = $derived([{
      name: "FrontLeft",
      isConnected: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/FrontLeft/IsConnected")?.value as boolean,
      hasTarget: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/FrontLeft/HasTarget")?.value as boolean,
      targetCount: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/FrontLeft/TargetCount")?.value as number
    },{
      name: "FrontRight",
      isConnected: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/FrontRight/IsConnected")?.value as boolean,
      hasTarget: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/FrontRight/HasTarget")?.value as boolean,
      targetCount: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/FrontRight/TargetCount")?.value as number
    },{
      name: "RearLeft",
      isConnected: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/RearLeft/IsConnected")?.value as boolean,
      hasTarget: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/RearLeft/HasTarget")?.value as boolean,
      targetCount: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/RearLeft/TargetCount")?.value as number
    },{
      name: "RearRight",
      isConnected: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/RearRight/IsConnected")?.value as boolean,
      hasTarget: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/RearRight/HasTarget")?.value as boolean,
      targetCount: nt.topics.get("/SmartDashboard/Robot/Sensors/Pose/RearRight/TargetCount")?.value as number
  }]);

  let hasValidVisionTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Localization/HasValidVisionTarget")?.value as boolean)

  let cameraStreams = $derived(JSON.parse(nt.topics.get("/SmartDashboard/Robot/Sensors/Camera/Streams")?.value) ?? "{}" as any);

  let robotPose = $derived(nt.topics.get("/SmartDashboard/Robot/Localization/Pose")?.value as any);
  let robotPose_: Pose2d = $derived(Utils.decodePose2dFromStruct(robotPose));
  
  let isCameraStreamModalOpen: boolean = $state(false);
  let cameraStreamUrl: string = $state("");
  let cameraStreamName: string = $state("");
</script>

<div class="main">
  <div class="title"><h4>Localization</h4></div>
  <div class="info">
    <div class="robot">
      <div class="sensors">
        <div class="status">
          {#if !hasValidVisionTarget}
            <div><WarningAltFilled width=100 height=100 fill="#CCCC00" /></div>
          {:else}
            <div><CheckmarkFilled width=100 height=100 fill="#009900" /></div>
          {/if}
        </div>
        {#each poseSensors as { name, isConnected, hasTarget, targetCount }}
          <div class="sensor">
            <button 
              title={ name }
              onclick={() => { 
                isCameraStreamModalOpen = true; 
                cameraStreamUrl = cameraStreams[name] ?? ""; 
                cameraStreamName = name 
              }}>
              <CenterSquare
                fill={ hasTarget ? "#00CC00" : "#666666" }
                width=80
                height=80 />
              {#if isConnected}
              <div class="connection"></div>
              {/if}
              {#if targetCount > 1}
              <div class="targetCount">{ targetCount }</div>
              {/if}
            </button>
          </div>
        {/each}
      </div>
    </div>
    <div class="poseInfo">
      <div><span class="label">X</span>{ robotPose_.x?.toFixed(3) } m</div>
      <div><span class="label">Y</span>{ robotPose_.y?.toFixed(3) } m</div>
      <div><span class="label">Heading</span>{ robotPose_.rotation?.toFixed(2) } &deg;</div>
    </div>
  </div>
</div>

<Modal
  passiveModal
  modalHeading={ cameraStreamName }
  size="lg"
  primaryButtonText="Close"
  bind:open={ isCameraStreamModalOpen }
  on:submit={ () => { isCameraStreamModalOpen = false; cameraStreamUrl = ""; cameraStreamName = ""; } }>
  <div class="cameraStream">
    <CameraStream
      streamUrl={ cameraStreamUrl }
      width={ 960 } 
      height={ 540 } />
  </div>
</Modal>

<style>
  .main {
    & .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }

    & .info {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 2em;
      margin: 0 2em 0 0;
    }

    & .robot {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 215px;
      height: 245px;

      & .sensors {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1em;

        & .status {
          position: absolute;
          opacity: 0.5;
        }

        & .sensor {
          display: flex;
          flex-direction: column;
          align-items: center;

          & button {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0;
            border: none;
            background: transparent;
            color: var(--app-color-white);
            cursor: pointer;
            
            & .connection {
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              left: 2px;
              top: 2px;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: var(--app-color-green);
              opacity: .5;
            }

            & .targetCount {
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              right: 0;
              top: 40px;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              color: var(--app-color-white);
              background: var(--app-color-charcoal);
              font-weight: bold;
              opacity: .8;
            }
          }
        }
      }
    }

    & .poseInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 180%;
      gap: 0.75em;

      & .label {
        display: block;
        margin-bottom: .5em;
        font-size: 14px;
        color: var(--app-color-smoke);
      }
    }
  }

  .cameraStream {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>