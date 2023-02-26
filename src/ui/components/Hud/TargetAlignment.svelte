<script lang="ts">
  import { 
    Utils,
    NetworkTablesTopic,
    Alliance
	} from "../../../common";

  export let robotPose: NetworkTablesTopic;
  export let isRedAlliance: NetworkTablesTopic;

  type Pose = {
    x: number;
    y: number;
    rotation: number;
  }

  let alliance: Alliance = Alliance.Blue;
  let pose: Pose = { x: 0, y: 0, rotation: 0 };
  let isInRange: boolean = false;

  $: {
    alliance = isRedAlliance?.value ? Alliance.Red : Alliance.Blue;

    if (robotPose?.value) {
      [ pose.x, pose.y, pose.rotation ] = robotPose?.value as Array<number>;
    }

    if (alliance === Alliance.Red) {
      isInRange = Math.abs(14.78 - pose.x) <= .30;
    } else {
      isInRange = Math.abs(pose.x - 1.70) <= .30;
    }
  }
</script>

<div class="main">
  <div class="zone">
    <div class="target a" />
    <div class="target b" />
    <div class="target c" />
    <div class="target d" />
    <div class="target e" />
    <div class="target f" />
    <div class="barrier" />
    <div class="robot"      
      style:display={ isInRange ? "block" : "none" } 
      style:right={ `${ (pose.y * 100) }px` } 
      style:bottom={ `${ ((pose.x - 1.70) * 100) + 90 }px` }
      style:transform={ `rotate(${ pose.rotation }deg` }>
      <div class="arm" />
    </div>
  </div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .zone {
      position: relative;
      width: 550px;
      height: 200px;

      .target {
        position: absolute;
        width: 5px;
        height: 80px;
        background: #FFFFFF;
        bottom: 0;

        &.a { right: 51px; }
        &.b { right: 162px; }
        &.c { right: 219px; }
        &.d { right: 331px; }
        &.e { right: 386px; }
        &.f { right: 498px; }
      }

      .barrier {
        position: absolute;
        width: 100%;
        height: 9px;
        bottom: 81px;
        background: #666666;
      }

      .robot {
        position: absolute;
        width: 48px;
        height: 54px;
        border: 1px solid var(--app-color-pink);

        .arm {
          position: absolute;
          left: 20px;
          width: 6px;
          height: 75%;
          background: var(--app-color-pink);
        }
      }
    }
  }
</style>