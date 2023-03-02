<script lang="ts">
  import { 
    NetworkTablesTopic,
    Pose,
    Alliance,
    Utils
	} from "../../../common";

  export let robotPose: NetworkTablesTopic;
  export let isRedAlliance: NetworkTablesTopic;

  const barriers = {
    [Alliance.Blue]: 1.70,
    [Alliance.Red]: 14.78
  }
  const coneNodes = [ 0.51, 1.63, 2.19, 3.31, 3.86, 4.98 ];
  const cubeNodes = [ 1.07, 2.75, 4.42 ];

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
    { #each coneNodes as coneNode }
      <div class="coneNode" style:right={ `${ (coneNode * 100) - 2 }px` } />
    { /each }
    { #each cubeNodes as cubeNode }
      <div class="cubeNode" style:right={ `${ (cubeNode * 100) - 23 }px` } />
    { /each }
    <div class="barrier" 
      style:background={ alliance === Alliance.Red ? "#CC0000" : "#0000CC" } />
    <div class="robot"
      style:opacity={ pose.x === 0 && pose.y === 0 ? 0 : 1 }
      style:left={ alliance === Alliance.Red ? `${ (pose.y * 100) - 24 }px` : null }       
      style:right={ alliance === Alliance.Blue ? `${ (pose.y * 100) - 24 }px` : null } 
      style:bottom={ `${ ((alliance === Alliance.Blue ? pose.x - barriers[Alliance.Blue] : barriers[Alliance.Red] - pose.x) * 100) + 90 }px` }
      style:transform={ `rotate(${ pose.rotation - (alliance === Alliance.Red ? 180 : 0) }deg` }>
      <div class="arm" />
      <div class="arrow" 
        class:aligned={ 
          coneNodes.includes(pose.y) && 
          pose.x === barriers[alliance] && 
          Utils.isNumberInRange(Math.abs(pose.rotation), 179, 181) 
        } />
    </div>
  </div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .zone {
      position: relative;
      width: 549px;
      height: 320px;

      .coneNode {
        position: absolute;
        bottom: 0;
        width: 4px;
        height: 60px;
        margin-top: 5px;
        background: #FFFFFF;
      }

      .cubeNode {
        position: absolute;
        bottom: 0;
        width: 46px;
        height: 60px;
        margin-top: 5px;
        border: 1px solid #CCCCCC;
      }

      .barrier {
        position: absolute;
        width: 549px;
        height: 9px;
        bottom: 81px;
        background: #666666;
      }

      .robot {
        position: absolute;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 48px;
        height: 54px;
        border: 2px solid var(--app-color-pink);

        .arm {
          width: 4px;
          height: 66%;
          margin-top: 3px;
          background: var(--app-color-pink);
        }

        .arrow {
          position: absolute;
          width: 0; 
          height: 0; 
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 24px solid #FFFFFF66;
          transform: translateY(-28px) rotate(180deg);

          &.aligned {
            border-top-color: #00FF00;
          }
        }
        
      }
    }
  }
</style>