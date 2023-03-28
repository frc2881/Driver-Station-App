<script lang="ts">
  import { 
    NetworkTablesTopic, 
    Pose 
  } from "../../../common";

  export let robotPose: NetworkTablesTopic;

  let pose: Pose = { x: 0, y: 0, rotation: 0 };

  $: {
    pose.x = 0;
    pose.y = 0;
    pose.rotation = 0;
    if (robotPose?.value) {
      [ pose.x, pose.y, pose.rotation ] = robotPose?.value as Array<number>;
    }
  }
</script>

<div class="main">
  <div class="pose">{ pose.x.toFixed(4) } | { pose.y.toFixed(4) } | { pose.rotation.toFixed(4) }</div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .pose {
      margin: 10px 0;
      font-size: 24px;
    }
  }
</style>