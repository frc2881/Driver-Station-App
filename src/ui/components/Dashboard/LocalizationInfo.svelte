<script lang="ts">
	import { CenterSquare, CenterCircle } from "carbon-icons-svelte";
  import { Modal } from "carbon-components-svelte";
  import { Configuration, type Pose2d } from "../../../common/index.js";
  import CameraStream from "../../components/CameraStream.svelte";

  export let robotPose: [number, number, number];
  export let rearPoseSensorHasTarget: boolean;
  export let rearPoseSensorTargetCount: number;
  export let frontPoseSensorHasTarget: boolean;
  export let frontPoseSensorTargetCount: number;

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
  <div class="sensors">
    <div class="sensor">
      <button 
        on:click={ () => { 
          isCameraStreamModalOpen = true; 
          cameraStreamUrl = Configuration.Settings.Cameras.Robot.Rear; 
          cameraStreamName = "Rear" 
        } }>
        <CenterSquare
          fill={ rearPoseSensorHasTarget ? "#00CC00" : "#333333" }
          width=80
          height=80 />
        Rear
        { #if rearPoseSensorHasTarget }
        <div class="targetCount">{ rearPoseSensorTargetCount }</div>
        { /if }
    </button>
    </div>
    <div class="sensor">
      <button 
        on:click={ () => { 
          isCameraStreamModalOpen = true; 
          cameraStreamUrl = Configuration.Settings.Cameras.Robot.Front; 
          cameraStreamName = "Front" 
        } }>
        <CenterSquare
          fill={ frontPoseSensorHasTarget ? "#00CC00" : "#333333" }
          width=80
          height=80 />
        Front
        { #if frontPoseSensorHasTarget }
        <div class="targetCount">{ frontPoseSensorTargetCount }</div>
        { /if }
      </button>
    </div>
  </div>
  <div class="poseInfo">
    <div>x: { poseInfo.x?.toFixed(3) } m</div>
    <div>y: { poseInfo.y?.toFixed(3) } m</div>
    <div>r: { poseInfo.rotation?.toFixed(2) } &deg;</div>
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

    & .sensors {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1.5em;
      margin-top: 2em;

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
          
          & .targetCount {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 4px;
            top: 58px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            color: var(--app-color-black);
            background: var(--app-color-white);
            font-weight: bold;
            opacity: .8;
          }
        }
      }
    }

    & .poseInfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      font-size: 150%;
      margin-top: 2em;
      gap: 1em;
    }
  }

  .cameraStream {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>