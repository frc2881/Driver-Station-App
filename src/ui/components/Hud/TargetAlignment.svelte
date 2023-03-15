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

  type Node = {
    y: number;
    slot: number;
    type: NodeType;
  }

  const targetGridX = 1.863;

  const nodes = {
    [Alliance.Blue]: [
      { y: 0.475, slot: 9, type: NodeType.Cone },
      { y: 1.070, slot: 8, type: NodeType.Cube },
      { y: 1.665, slot: 7, type: NodeType.Cone },
      { y: 2.155, slot: 6, type: NodeType.Cone },
      { y: 2.750, slot: 5, type: NodeType.Cube },
      { y: 3.345, slot: 4, type: NodeType.Cone },
      { y: 3.825, slot: 3, type: NodeType.Cone },
      { y: 4.420, slot: 2, type: NodeType.Cube },
      { y: 5.015, slot: 1, type: NodeType.Cone }
    ] as Node[],
    [Alliance.Red]: [
      { y: 3.005, slot: 1, type: NodeType.Cone },
      { y: 3.600, slot: 2, type: NodeType.Cube },
      { y: 4.195, slot: 3, type: NodeType.Cone },
      { y: 4.675, slot: 4, type: NodeType.Cone },
      { y: 5.270, slot: 5, type: NodeType.Cube },
      { y: 5.865, slot: 6, type: NodeType.Cone },
      { y: 6.355, slot: 7, type: NodeType.Cone },
      { y: 6.950, slot: 8, type: NodeType.Cube },
      { y: 7.545, slot: 9, type: NodeType.Cone }
    ] as Node[]
  };

  let alliance: Alliance = Alliance.Blue;
  let pose: Pose = { x: 0, y: 0, rotation: 0 };
  let targetNode: Node = null;

  let isVisible: boolean = false;
  let isAligned: boolean = false;
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

    targetNode = null;
    if (Utils.isNumberInRange(pose.x, targetGridX - 0.3, targetGridX + 0.3)) {
      let index = 0;
      for (const node of nodes[alliance]) {
        if (Utils.isNumberInRange(pose.y, node.y - 0.2, node.y + 0.2)) {
          targetNode = node;
          break;
        }
        index += 1;
      }
    }
    isVisible = targetNode != null;

    if (isVisible) {
      isHorizontalAligned = Utils.isNumberInRange(pose.y, targetNode.y - 0.05, targetNode.y + 0.05);
      isVerticalAligned = Utils.isNumberInRange(pose.x, targetGridX - 0.05, targetGridX + 0.05);
      isRotationAligned = Utils.isNumberInRange(Math.abs(pose.rotation), 177, 184) || Utils.isNumberInRange(pose.rotation, -3, 3);
      isAligned = isHorizontalAligned && isVerticalAligned && isRotationAligned;

      const translateX = -(pose.y - targetNode.y) * 400;
      const translateY = (targetGridX - pose.x) * 400;
      transform = `translate(${ translateX }px, ${ translateY }px) rotate(${ -pose.rotation - 180 }deg)`;
    }
  }
</script>

<div class="main">
  <div class="zone">
    <div class="slot"><span style:display={ isVisible ? "block" : "none" }>{ targetNode?.slot }</span></div>
    <div class="barrier" style:background={ alliance === Alliance.Red ? "#CC0000" : "#0000CC" } />
    <div class="target"
      style:opacity={ isVisible ? 1 : 0 } 
      style:width={ targetNode?.type === NodeType.Cube ? "160px" : "20px" } />
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
        stroke="#FFFFFF99"
        fill="transparent"
        width=178 height=178 />
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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      width: 360px;
      height: 560px;

      .slot {
        position: absolute;
        text-align: center;
        top: 60px;
        width: 160px;
        height: 140px;
        font-size: 120px;
        line-height: 140px;
        border: 1px solid #FFFFFF;
        opacity: .25;
      }

      .barrier {
        width: 100%;
        height: 20px;
      }

      .target {
        height: 80px;
        margin-top: 32px;
        background: #FFFFFF99;
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