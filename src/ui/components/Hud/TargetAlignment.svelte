<script lang="ts">
  import CaretDown from "carbon-icons-svelte/lib/CaretDown.svelte";
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import { 
    NetworkTablesTopic,
    Pose,
    Alliance,
    Utils
	} from "../../../common";

  export let robotPose: NetworkTablesTopic;
  export let isRedAlliance: NetworkTablesTopic;

  enum NodeType {
    Cone,
    Cube
  }

  const barriers = {
    [Alliance.Blue]: 1.863,
    [Alliance.Red]: 14.677
  }

  const nodes = [ 
    0.475, // cone
    1.07,  // cube
    1.665, // cone
    2.155, // cone
    2.75,  // cube
    3.345, // cone
    3.825, // cone
    4.42,  // cube
    5.015  // cone
  ];

  let alliance: Alliance = Alliance.Blue;
  let pose: Pose = { x: 0, y: 0, rotation: 0 };

  let isVisible: boolean = false;
  let isAligned: boolean = false;
  let targetNodeType: NodeType = NodeType.Cone;
  let isHorizontalAligned: boolean = false;
  let isVerticalAligned: boolean = false;
  let isRotationAligned: boolean = false;
  let transform: string = null;

  $: {
    alliance = isRedAlliance?.value ? Alliance.Red : Alliance.Blue;

    pose.x = 0;
    pose.y = 0;
    pose.rotation = 0;
    
    if (robotPose?.value) {
      [ pose.x, pose.y, pose.rotation ] = robotPose?.value as Array<number>;
    }

    let targetNode: number = 0;
    if (Utils.isNumberInRange(pose.x, barriers[alliance] - 0.3, barriers[alliance] + 0.3)) {
      let index = 0;
      for (const node of nodes) {
        if (Utils.isNumberInRange(pose.y, node - 0.2, node + 0.2)) {
          targetNode = node;
          targetNodeType = [1, 4, 7].includes(index) ? NodeType.Cube : NodeType.Cone;
          break;
        }
        index += 1;
      }
    }
    isVisible = targetNode > 0;

    if (isVisible) {
      isHorizontalAligned = Utils.isNumberInRange(pose.y, targetNode - 0.05, targetNode + 0.05);
      isVerticalAligned = Utils.isNumberInRange(pose.x, barriers[alliance] - 0.05, barriers[alliance] + 0.05);
      isRotationAligned = Utils.isNumberInRange(Math.abs(pose.rotation), 177, 184) || Utils.isNumberInRange(pose.rotation, -3, 3);
      isAligned = isHorizontalAligned && isVerticalAligned && isRotationAligned;

      const deltaY = Math.abs(pose.y - targetNode);
      const translateX = (pose.y < targetNode ? -deltaY : deltaY) * 400;
      const translateY = (alliance === Alliance.Red ? -(barriers[alliance] - pose.x) : (barriers[alliance] - pose.x)) * 400;
      transform = `translate(${ translateX }px, ${ translateY }px) rotate(${ -pose.rotation - (alliance === Alliance.Red ? 0 : 180) }deg)`;
    }
  }
</script>

<div class="main">
  <div class="zone">
    <div class="barrier" style:background={ alliance === Alliance.Red ? "#CC0000" : "#0000CC" } />
    <div class="target"
      style:opacity={ isVisible ? 1 : 0 } 
      style:width={ targetNodeType === NodeType.Cube ? "180px" : "16px" } />
    <div class="robot"
      style:opacity={ isVisible ? 1 : 0 }
      style:transform={ transform }>
      <div class="checkmark">
        <CheckmarkFilled
          fill={ isAligned ? "#00CC00" : "transparent" }
          width=128
          height=128 />
      </div>
      <CaretDown
        stroke="#FFFFFFCC"
        fill="transparent"
        width=178 height=178 />
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

    .zone {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      width: 360px;
      height: 560px;

      .barrier {
        width: 100%;
        height: 20px;
      }

      .target {
        height: 80px;
        margin-top: 32px;
        background: #FFFFFF;
      }

      .robot {
        position: absolute;
        width: 192px;
        height: 216px;
        padding-top: 128px;
        border: 8px solid var(--app-color-pink);
        bottom: 132px;

        .checkmark {
          position: absolute;
          top: 32px;
          left: 26px;
        }
      }
    }
  }
</style>