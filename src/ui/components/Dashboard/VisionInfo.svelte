<script lang="ts">
  import CenterSquare from "carbon-icons-svelte/lib/CenterSquare.svelte";
  import { 
    NetworkTablesTopic,
    Pose,
    Utils
  } from "../../../common";

  export let photonVisionFrontCameraHasTarget: NetworkTablesTopic;
  export let photonVisionBackCameraHasTarget: NetworkTablesTopic;
  export let robotPose: NetworkTablesTopic;

  let hasTargetFrontCamera: boolean = false;
  let hasTargetBackCamera: boolean = false;
  let pose: Pose = { x: 0, y: 0, rotation: 0 };

  $: {
    hasTargetFrontCamera = photonVisionFrontCameraHasTarget?.value as boolean;
    hasTargetBackCamera = photonVisionBackCameraHasTarget?.value as boolean;
    
    pose.x = 0;
    pose.y = 0;
    pose.rotation = 0;
    
    if (robotPose?.value) {
      const __pose = JSON.parse(robotPose.value);
      pose.x = __pose.translation.x ?? 0;
      pose.y = __pose.translation.y ?? 0;
      pose.rotation = Utils.radiansToDegrees(__pose.rotation?.radians ?? 0);
    }
  }
</script>

<div class="main">
  <div class="title"><h4>Vision</h4></div>
  <div class="cameras">
    <div class="camera">
      <CenterSquare
        fill={ hasTargetFrontCamera ? "#00CC00" : "#333333" }
        width=140
        height=140 />
    </div>
    <div class="camera">
      <CenterSquare
        fill={ hasTargetBackCamera ? "#00CC00" : "#333333" }
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