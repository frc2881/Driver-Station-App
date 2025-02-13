<script lang="ts">
	import { CenterSquare } from "carbon-icons-svelte";
  import { Modal } from "carbon-components-svelte";
  import { type Pose2d } from "../../../common/index.js";
  import CameraStream from "../../components/CameraStream.svelte";

  interface Props {
    robotPose: number[];
    frontRightPoseSensorIsConnected: boolean;
    frontRightPoseSensorHasTarget: boolean;
    frontRightPoseSensorTargetCount: number;
    frontLeftPoseSensorIsConnected: boolean;
    frontLeftPoseSensorHasTarget: boolean;
    frontLeftPoseSensorTargetCount: number;
    rearRightPoseSensorIsConnected: boolean;
    rearRightPoseSensorHasTarget: boolean;
    rearRightPoseSensorTargetCount: number;
    rearLeftPoseSensorIsConnected: boolean;
    rearLeftPoseSensorHasTarget: boolean;
    rearLeftPoseSensorTargetCount: number;
    cameraStreams: Record<string, string>;
  }

  let {
    robotPose,
    frontRightPoseSensorIsConnected: frontRightPoseSensorIsConnected,
    frontRightPoseSensorHasTarget: frontRightPoseSensorHasTarget,
    frontRightPoseSensorTargetCount: frontRightPoseSensorTargetCount,
    frontLeftPoseSensorIsConnected: frontLeftPoseSensorIsConnected,
    frontLeftPoseSensorHasTarget: frontLeftPoseSensorHasTarget,
    frontLeftPoseSensorTargetCount: frontLeftPoseSensorTargetCount,
    rearRightPoseSensorIsConnected: rearRightPoseSensorIsConnected,
    rearRightPoseSensorHasTarget: rearRightPoseSensorHasTarget,
    rearRightPoseSensorTargetCount: rearRightPoseSensorTargetCount,
    rearLeftPoseSensorIsConnected: rearLeftPoseSensorIsConnected,
    rearLeftPoseSensorHasTarget: rearLeftPoseSensorHasTarget,
    rearLeftPoseSensorTargetCount: rearLeftPoseSensorTargetCount,
    cameraStreams
  }: Props = $props();

  let robotPose_: Pose2d = $derived({ x: robotPose?.[0] ?? 0, y: robotPose?.[1] ?? 0, rotation: robotPose?.[2] ?? 0 });
  let isCameraStreamModalOpen: boolean = $state(false);
  let cameraStreamUrl: string = $state("");
  let cameraStreamName: string = $state("");
</script>

<div class="main">
  <div class="title"><h4>Localization</h4></div>
  <div class="info">
    <div class="robot">
      <div class="sensors">
        <div class="sensor">
          <button 
            title="FrontLeft"
            onclick={() => { 
              isCameraStreamModalOpen = true; 
              cameraStreamUrl = cameraStreams["FrontLeft"] ?? ""; 
              cameraStreamName = "FrontLeft" 
            }}>
            <CenterSquare
              fill={ frontLeftPoseSensorHasTarget ? "#00CC00" : "#666666" }
              width=80
              height=80 />
            {#if frontLeftPoseSensorIsConnected}
            <div class="connection"></div>
            {/if}
            {#if frontLeftPoseSensorTargetCount > 1}
            <div class="targetCount">{ frontLeftPoseSensorTargetCount }</div>
            {/if}
          </button>
        </div>
        <div class="sensor">
          <button 
            title="FrontRight"
            onclick={() => { 
              isCameraStreamModalOpen = true; 
              cameraStreamUrl = cameraStreams["FrontRight"] ?? ""; 
              cameraStreamName = "FrontRight" 
            }}>
            <CenterSquare
              fill={ frontRightPoseSensorHasTarget ? "#00CC00" : "#666666" }
              width=80
              height=80 />
            {#if frontRightPoseSensorIsConnected}
            <div class="connection"></div>
            {/if}
            {#if frontRightPoseSensorTargetCount > 1}
            <div class="targetCount">{ frontRightPoseSensorTargetCount }</div>
            {/if}
          </button>
        </div>
        <div class="sensor">
          <button 
            title="RearLeft"
            onclick={() => { 
              isCameraStreamModalOpen = true; 
              cameraStreamUrl = cameraStreams["RearLeft"] ?? ""; 
              cameraStreamName = "RearLeft" 
            }}>
            <CenterSquare
              fill={ rearLeftPoseSensorHasTarget ? "#00CC00" : "#666666" }
              width=80
              height=80 />
            {#if rearLeftPoseSensorIsConnected}
            <div class="connection"></div>
            {/if}
            {#if rearLeftPoseSensorTargetCount > 1}
            <div class="targetCount">{ rearLeftPoseSensorTargetCount }</div>
            {/if}
          </button>
        </div>
        <div class="sensor">
          <button
            title="RearRight" 
            onclick={() => { 
              isCameraStreamModalOpen = true; 
              cameraStreamUrl = cameraStreams["RearRight"] ?? ""; 
              cameraStreamName = "RearRight" 
            }}>
            <CenterSquare
              fill={ rearRightPoseSensorHasTarget ? "#00CC00" : "#666666" }
              width=80
              height=80 />
            {#if rearRightPoseSensorIsConnected}
            <div class="connection"></div>
            {/if}
            {#if rearRightPoseSensorTargetCount > 1}
            <div class="targetCount">{ rearRightPoseSensorTargetCount }</div>
            {/if}
          </button>
        </div>
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
      gap: 3.5em;
    }

    & .robot {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 215px;
      height: 245px;

      & .sensors {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1em;

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
      gap: 1em;

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