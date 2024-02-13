<script lang="ts">
  import CenterSquare from "carbon-icons-svelte/lib/CenterSquare.svelte";
  import { 
    NetworkTablesTopic,
    Pose2d,
    PoseInfo,
    Utils
  } from "../../../common";
	import { CircleFill, CircleSolid, CircleStroke, CenterCircle } from "carbon-icons-svelte";

  export let rearSensorHasTargetsTopic: NetworkTablesTopic;
  export let sideSensorHasTargetsTopic: NetworkTablesTopic;
  export let frontSensorHasTargetsTopic: NetworkTablesTopic;
  export let poseTopic: NetworkTablesTopic;

  let rearSensorHasTargets: boolean = false;
  let sideSensorHasTargets: boolean = false;
  let frontSensorHasTargets: boolean = false;
  let poseInfo: PoseInfo = { x: 0, y: 0, rotation: 0 };

  $: {
    rearSensorHasTargets = rearSensorHasTargetsTopic?.value as boolean;
    sideSensorHasTargets = sideSensorHasTargetsTopic?.value as boolean;
    frontSensorHasTargets = frontSensorHasTargetsTopic?.value as boolean;
    
    poseInfo = { x: 0, y: 0, rotation: 0 };
    if (poseTopic?.value) {
      const __pose = JSON.parse(poseTopic.value) as Pose2d;
      poseInfo.x = __pose.translation.x ?? 0;
      poseInfo.y = __pose.translation.y ?? 0;
      poseInfo.rotation = Utils.radiansToDegrees(__pose.rotation?.radians ?? 0);
    }
  }
</script>

<div class="main">
  <div class="title"><h4>Pose</h4></div>
  <div class="sensors">
    <div class="sensor">
      <CenterSquare
        fill={ rearSensorHasTargets ? "#00CC00" : "#333333" }
        width=80
        height=80 />
      Rear
    </div>
    <div class="sensor">
      <CenterSquare
        fill={ sideSensorHasTargets ? "#00CC00" : "#333333" }
        width=80
        height=80 />
      Side
    </div>
    <div class="sensor">
      <CenterCircle
        fill={ frontSensorHasTargets ? "#F3481A" : "#333333" }
        width=80
        height=80 />
      Front
    </div>
  </div>
  <div class="pose">
    <div>x: { poseInfo?.x?.toFixed(3) }</div>
    <div>y: { poseInfo?.y?.toFixed(3) }</div>
    <div>r: { poseInfo?.rotation?.toFixed(2) }</div>
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

      & div {
        margin: 0 5px;
      }
    }
  }
</style>