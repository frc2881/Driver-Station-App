<script lang="ts">
  import CenterSquare from "carbon-icons-svelte/lib/CenterSquare.svelte";
  import { 
    NetworkTablesTopic,
    Pose
  } from "../../../common";

  export let photonVisionLeftCameraHasTarget: NetworkTablesTopic;
  export let photonVisionRightCameraHasTarget: NetworkTablesTopic;
  export let robotPose: NetworkTablesTopic;

  let hasTargetLeftCamera: boolean = false;
  let hasTargetRightCamera: boolean = false;
  let pose: Pose = { x: 0, y: 0, rotation: 0 };

  $: {
    hasTargetLeftCamera = photonVisionLeftCameraHasTarget?.value as boolean;
    hasTargetRightCamera = photonVisionRightCameraHasTarget?.value as boolean;
    
    pose.x = 0;
    pose.y = 0;
    pose.rotation = 0;
    
    if (robotPose?.value) {
      [ pose.x, pose.y, pose.rotation ] = robotPose?.value as Array<number>;
    }
  }
</script>

<div class="main">
  <div class="title"><h4>Vision</h4></div>
  <div class="cameras">
    <div class="camera">
      <CenterSquare
        fill={ hasTargetLeftCamera ? "#00CC00" : "#333333" }
        width=140
        height=140 />
    </div>
    <div class="camera">
      <CenterSquare
        fill={ hasTargetRightCamera ? "#00CC00" : "#333333" }
        width=140
        height=140 />
    </div>
  </div>
  <div class="pose">
    <div>x: { pose.x.toFixed(3) }</div>
    <div>y: { pose.y.toFixed(3) }</div>
    <div>r: { pose.rotation.toFixed(2) }</div>
  </div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    width: 100%;
    height: 100%;

    .cameras {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .camera {
        margin: 0 10px;
      }
    }

    .pose {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 10px;
      font-size: 24px;

      & div {
        margin: 0 5px;
      }
    }
  }
</style>