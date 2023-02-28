<script lang="ts">
  import { 
    NetworkTablesTopic,
    Pose,
    Alliance
	} from "../../../common";

  export let robotPose: NetworkTablesTopic;
  export let isRedAlliance: NetworkTablesTopic;

  const zoneLimits = {
    [Alliance.Blue]: 1.70,
    [Alliance.Red]: 14.78
  }

  let alliance: Alliance = Alliance.Blue;
  let pose: Pose = { x: 0, y: 0, rotation: 0 };

  $: {
    alliance = isRedAlliance?.value ? Alliance.Red : Alliance.Blue;

    if (robotPose?.value) {
      [ pose.x, pose.y, pose.rotation ] = robotPose?.value as Array<number>;
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
      style:left={ `${ alliance === Alliance.Red ? ((pose.y * 100) - 25) : 0 }px` }       
      style:right={ `${ alliance === Alliance.Blue ? ((pose.y * 100) - 22) : 0 }px` } 
      style:bottom={ `${ ((pose.x - (alliance === Alliance.Blue ? 1.70 : 14.78)) * 100) + 90 }px` }
      style:transform={ `rotate(${ -pose.rotation }deg` }>
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
    overflow: hidden;

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
          width: 7px;
          height: 75%;
          background: var(--app-color-pink);
        }
      }
    }
  }
</style>