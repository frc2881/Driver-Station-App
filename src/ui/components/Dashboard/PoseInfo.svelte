<script lang="ts">
	import { CenterSquare, CenterCircle } from "carbon-icons-svelte";
  import { 
    Pose2d,
    PoseInfo,
    Utils
  } from "../../../common";

  export let rearPoseSensorHasTargets: boolean;
  export let sidePoseSensorHasTargets: boolean;
  export let frontNoteObjectSensorHasTarget: boolean;
  export let robotPose: string;

  const poseInfo: PoseInfo = { x: 0, y: 0, rotation: 0 };

  $: {
    const __pose = JSON.parse(robotPose ?? "{}") as Pose2d;
    poseInfo.x = typeof(__pose.translation?.x) === "number" ? __pose.translation?.x ?? 0 : 0;
    poseInfo.y = typeof(__pose.translation?.y) === "number" ? __pose.translation?.y ?? 0 : 0;
    poseInfo.rotation = Utils.radiansToDegrees(typeof(__pose.rotation?.radians) === "number" ? __pose?.rotation?.radians ?? 0 : 0);
  }
</script>

<div class="main">
  <div class="title"><h4>Pose</h4></div>
  <div class="sensors">
    <div class="sensor">
      <CenterSquare
        fill={ rearPoseSensorHasTargets ? "#00CC00" : "#333333" }
        width=80
        height=80 />
      Rear
    </div>
    <div class="sensor">
      <CenterSquare
        fill={ sidePoseSensorHasTargets ? "#00CC00" : "#333333" }
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
    <div>x: { poseInfo.x?.toFixed(3) }</div>
    <div>y: { poseInfo.y?.toFixed(3) }</div>
    <div>r: { poseInfo.rotation?.toFixed(2) }</div>
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
      gap: 1em;
      margin: 2em 0;

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
      font-size: 22px;
      margin-top: 2em;
      gap: 1em;
    }
  }
</style>