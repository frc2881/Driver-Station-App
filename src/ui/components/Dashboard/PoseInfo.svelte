<script lang="ts">
	import { CenterSquare, CenterCircle } from "carbon-icons-svelte";
  import { Pose2d } from "../../../common";

  export let robotPose: [number, number, number];
  export let rearPoseSensorHasTarget: boolean;
  export let sidePoseSensorHasTarget: boolean;
  export let frontNoteObjectSensorHasTarget: boolean;
  export let targetYaw: number;
  export let targetDistance: number;

  let poseInfo: Pose2d = { x: 0, y: 0, rotation: 0 };

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
      <CenterSquare
        fill={ rearPoseSensorHasTarget ? "#00CC00" : "#333333" }
        width=80
        height=80 />
      Rear
    </div>
    <div class="sensor">
      <CenterSquare
        fill={ sidePoseSensorHasTarget ? "#00CC00" : "#333333" }
        width=80
        height=80 />
      Side
    </div>
    <div class="sensor">
      <CenterCircle
        fill={ frontNoteObjectSensorHasTarget ? "#CC6600" : "#333333" }
        width=80
        height=80 />
      Front
    </div>
  </div>
  <div class="pose">
    <div>x: { poseInfo.x?.toFixed(3) } m</div>
    <div>y: { poseInfo.y?.toFixed(3) } m</div>
    <div>r: { poseInfo.rotation?.toFixed(2) } &deg;</div>
  </div>
  <div class="target">
    <div>td: { targetDistance?.toFixed(3) ?? 0 } m</div>
    <div>ty: { targetYaw?.toFixed(2) ?? 0 } &deg;</div>
  </div>
</div>

<style lang="postcss">
  .main {
    .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }

    .sensors {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1.5em;
      margin-top: 2em;

      .sensor {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .pose {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 150%;
      margin-top: 2em;
      gap: 1em;
    }

    .target {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 120%;
      margin-top: 1.5em;
      gap: 1.5em;
    }
  }
</style>