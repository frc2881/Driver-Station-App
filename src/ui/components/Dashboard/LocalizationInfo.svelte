<script lang="ts">
	import { CenterSquare } from "carbon-icons-svelte";
  import { Modal } from "carbon-components-svelte";
  import { type Pose2d } from "../../../common/index.js";
  import CameraStream from "../../components/CameraStream.svelte";

  export let robotPose: [number, number, number];
  export let frontPoseSensorIsConnected: boolean;
  export let frontPoseSensorHasTarget: boolean;
  export let frontPoseSensorTargetCount: number;
  export let rearPoseSensorIsConnected: boolean;
  export let rearPoseSensorHasTarget: boolean;
  export let rearPoseSensorTargetCount: number;
  export let leftPoseSensorIsConnected: boolean;
  export let leftPoseSensorHasTarget: boolean;
  export let leftPoseSensorTargetCount: number;
  export let rightPoseSensorIsConnected: boolean;
  export let rightPoseSensorHasTarget: boolean;
  export let rightPoseSensorTargetCount: number;
  export let cameraStreams: Record<string, string>;

  let poseInfo: Pose2d = { x: 0, y: 0, rotation: 0 };
  let isCameraStreamModalOpen: boolean = false;
  let cameraStreamUrl: string = "";
  let cameraStreamName: string = "";

  $: {
    poseInfo.x = robotPose?.[0] ?? 0;
    poseInfo.y = robotPose?.[1] ?? 0;
    poseInfo.rotation = robotPose?.[2] ?? 0;
  }
</script>

<div class="main">
  <div class="title"><h4>Localization</h4></div>
  <div class="info">
    <div class="robot">
      <div class="sensor">
        <button 
          title="Front"
          on:click={ () => { 
            isCameraStreamModalOpen = true; 
            cameraStreamUrl = cameraStreams["Front"] ?? ""; 
            cameraStreamName = "Front" 
          } }>
          <CenterSquare
            fill={ frontPoseSensorHasTarget ? "#00CC00" : "#666666" }
            width=60
            height=60 />
          { #if frontPoseSensorIsConnected }
          <div class="connection"></div>
          { /if }
          { #if frontPoseSensorTargetCount > 1 }
          <div class="targetCount">{ frontPoseSensorTargetCount }</div>
          { /if }
        </button>
      </div>
      <div style="display:flex;flex-direction:row;justify-content:center;gap:3em;">
        <div class="sensor">
          <button 
            title="Left"
            on:click={ () => { 
              isCameraStreamModalOpen = true; 
              cameraStreamUrl = cameraStreams["Left"] ?? ""; 
              cameraStreamName = "Left" 
            } }>
            <CenterSquare
              fill={ leftPoseSensorHasTarget ? "#00CC00" : "#666666" }
              width=60
              height=60 />
            { #if leftPoseSensorIsConnected }
            <div class="connection"></div>
            { /if }
            { #if leftPoseSensorTargetCount > 1 }
            <div class="targetCount">{ leftPoseSensorTargetCount }</div>
            { /if }
          </button>
        </div>
        <div class="sensor">
          <button 
            title="Right"
            on:click={ () => { 
              isCameraStreamModalOpen = true; 
              cameraStreamUrl = cameraStreams["Right"] ?? ""; 
              cameraStreamName = "Right" 
            } }>
            <CenterSquare
              fill={ rightPoseSensorHasTarget ? "#00CC00" : "#666666" }
              width=60
              height=60 />
            { #if rightPoseSensorIsConnected }
            <div class="connection"></div>
            { /if }
            { #if rightPoseSensorTargetCount > 1 }
            <div class="targetCount">{ rightPoseSensorTargetCount }</div>
            { /if }
          </button>
        </div>
      </div>
      <div class="sensor">
        <button
          title="Rear" 
          on:click={ () => { 
            isCameraStreamModalOpen = true; 
            cameraStreamUrl = cameraStreams["Rear"] ?? ""; 
            cameraStreamName = "Rear" 
          } }>
          <CenterSquare
            fill={ rearPoseSensorHasTarget ? "#00CC00" : "#666666" }
            width=60
            height=60 />
          { #if rearPoseSensorIsConnected }
          <div class="connection"></div>
          { /if }
          { #if rearPoseSensorTargetCount > 1 }
          <div class="targetCount">{ rearPoseSensorTargetCount }</div>
          { /if }
        </button>
      </div>
    </div>
    <div class="poseInfo">
      <div><span class="label">X</span>{ poseInfo.x?.toFixed(3) } m</div>
      <div><span class="label">Y</span>{ poseInfo.y?.toFixed(3) } m</div>
      <div><span class="label">Heading</span>{ poseInfo.rotation?.toFixed(2) } &deg;</div>
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
      gap: .75em;
      width: 215px;
      height: 245px;
      border: 2px solid var(--app-color-charcoal);

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