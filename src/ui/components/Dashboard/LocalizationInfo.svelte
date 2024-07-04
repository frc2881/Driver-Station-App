<script lang="ts">
	import { CenterSquare, CenterCircle } from "carbon-icons-svelte";
  import { Modal } from "carbon-components-svelte";
  import { Configuration, type Pose2d } from "../../../common/index.js";
  import CameraStream from "../../components/CameraStream.svelte";

  export let robotPose: [number, number, number];
  export let rearPoseSensorHasTarget: boolean;
  export let leftPoseSensorHasTarget: boolean;
  export let rightPoseSensorHasTarget: boolean;
  export let frontNoteObjectSensorHasTarget: boolean;
  export let targetHeading: number;
  export let targetDistance: number;

  let poseInfo: Pose2d = { x: 0, y: 0, rotation: 0 };
  let isCameraStreamModalOpen: boolean = false;
  let cameraStreamUrl: string = null;
  let cameraStreamName: string = null;

  $: {
    poseInfo.x = robotPose?.[0] ?? 0;
    poseInfo.y = robotPose?.[1] ?? 0;
    poseInfo.rotation = robotPose?.[2] ?? 0;
  }
</script>

<div class="main">
  <div class="title"><h4>Pose</h4></div>
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
    </button>
    </div>
    <div class="sensor">
      <button 
        on:click={ () => { 
          isCameraStreamModalOpen = true; 
          cameraStreamUrl = Configuration.Settings.Cameras.Robot.Left; 
          cameraStreamName = "Left" 
        } }>
        <CenterSquare
          fill={ leftPoseSensorHasTarget ? "#00CC00" : "#333333" }
          width=80
          height=80 />
        Left
      </button>
    </div>
    <div class="sensor">
      <button 
        on:click={ () => { 
          isCameraStreamModalOpen = true; 
          cameraStreamUrl = Configuration.Settings.Cameras.Robot.Right; 
          cameraStreamName = "Right" 
        } }>
        <CenterSquare
          fill={ rightPoseSensorHasTarget ? "#00CC00" : "#333333" }
          width=80
          height=80 />
        Right
      </button>
    </div>
    <div class="sensor">
      <button 
        on:click={ () => { 
          isCameraStreamModalOpen = true; 
          cameraStreamUrl = Configuration.Settings.Cameras.Robot.Front; 
          cameraStreamName = "Front" 
        } }>
        <CenterCircle
          fill={ frontNoteObjectSensorHasTarget ? "#CC6600" : "#333333" }
          width=80
          height=80 />
        Front
      </button>
    </div>
  </div>
  <div class="pose">
    <div>x: { poseInfo.x?.toFixed(3) } m</div>
    <div>y: { poseInfo.y?.toFixed(3) } m</div>
    <div>r: { poseInfo.rotation?.toFixed(2) } &deg;</div>
  </div>
  <div class="target">
    <div>td: { targetDistance?.toFixed(3) ?? 0 } m</div>
    <div>th: { targetHeading?.toFixed(2) ?? 0 } &deg;</div>
  </div>
</div>

<Modal
  passiveModal
  modalHeading={ cameraStreamName }
  size="lg"
  primaryButtonText="Close"
  bind:open={ isCameraStreamModalOpen }
  on:submit={ () => { isCameraStreamModalOpen = false; cameraStreamUrl = null; cameraStreamName = null; } }>
  <div class="cameraStream">
    <CameraStream
      streamInfo={ { url: cameraStreamUrl } } 
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
          padding: 0;
          border: none;
          background: transparent;
          color: var(--app-color-white);
          cursor: pointer;
        }
      }
    }

    & .pose {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 150%;
      margin-top: 2em;
      gap: 1em;
    }

    & .target {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 120%;
      margin-top: 1.5em;
      gap: 1.5em;
    }
  }

  .cameraStream {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>