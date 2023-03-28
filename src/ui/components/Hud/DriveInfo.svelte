<script lang="ts">
  import CaretDown from "carbon-icons-svelte/lib/CaretDown.svelte";
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import CloseFilled from "carbon-icons-svelte/lib/CloseFilled.svelte";
  import { 
    NetworkTablesTopic,
    Pose,
    Alliance,
    Utils
	} from "../../../common";

  export let robotPose: NetworkTablesTopic;
  export let isRedAlliance: NetworkTablesTopic;
  export let isXConfiguration: NetworkTablesTopic;

  enum NodeType {
    Cone,
    Cube
  }

  type Node = {
    y: number;
    slot: number;
    type: NodeType;
  }

  const targetGridX = 1.760;

  const nodes = {
    [Alliance.Blue]: [
      { y: 0.594, slot: 1, type: NodeType.Cone }, // 0.594
      { y: 1.140, slot: 2, type: NodeType.Cube }, // 1.140
      { y: 1.686, slot: 3, type: NodeType.Cone }, // 1.686
      { y: 2.232, slot: 4, type: NodeType.Cone }, // 2.232
      { y: 2.778, slot: 5, type: NodeType.Cube }, // 2.778
      { y: 3.324, slot: 6, type: NodeType.Cone }, // 3.324
      { y: 3.870, slot: 7, type: NodeType.Cone }, // 3.870
      { y: 4.416, slot: 8, type: NodeType.Cube }, // 4.416
      { y: 4.962, slot: 9, type: NodeType.Cone }  // 4.962
    ] as Node[],
    [Alliance.Red]: [
      { y: 3.053, slot: 9, type: NodeType.Cone }, // 3.053
      { y: 3.599, slot: 8, type: NodeType.Cube }, // 3.599
      { y: 4.145, slot: 7, type: NodeType.Cone }, // 4.145
      { y: 4.691, slot: 6, type: NodeType.Cone }, // 4.691
      { y: 5.237, slot: 5, type: NodeType.Cube }, // 5.237
      { y: 5.783, slot: 4, type: NodeType.Cone }, // 5.783
      { y: 6.329, slot: 3, type: NodeType.Cone }, // 6.329
      { y: 6.875, slot: 2, type: NodeType.Cube }, // 6.875
      { y: 7.421, slot: 1, type: NodeType.Cone }  // 7.421
    ] as Node[]
  };

  let alliance: Alliance = Alliance.Blue;
  let pose: Pose = { x: 0, y: 0, rotation: 0 };
  let targetNode: Node = null;

  let isInRange: boolean = false;
  let isAligned: boolean = false;
  let isHorizontalAligned: boolean = false;
  let isVerticalAligned: boolean = false;
  let isRotationAligned: boolean = false;
  let transform: string = null;

  let isRobotXLocked: boolean = false;

  $: {
    alliance = isRedAlliance?.value ? Alliance.Red : Alliance.Blue;

    pose.x = 0;
    pose.y = 0;
    pose.rotation = 0;
    
    if (robotPose?.value) {
      [ pose.x, pose.y, pose.rotation ] = robotPose?.value as Array<number>;
    }

    isRobotXLocked = isXConfiguration?.value as boolean;
    isRobotXLocked = false;

    if (!isRobotXLocked) {
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
      isInRange = targetNode != null;
      if (isInRange) {
        isHorizontalAligned = Utils.isNumberInRange(pose.y, targetNode.y - 0.05, targetNode.y + 0.05);
        isVerticalAligned = Utils.isNumberInRange(pose.x, targetGridX - 0.05, targetGridX + 0.05);
        isRotationAligned = Utils.isNumberInRange(Math.abs(pose.rotation), 177, 184) || Utils.isNumberInRange(pose.rotation, -3, 3);
        isAligned = isHorizontalAligned && isVerticalAligned && isRotationAligned;
        const translateX = -(pose.y - targetNode.y) * 400;
        const translateY = (targetGridX - pose.x) * 400;
        transform = `translate(${ translateX }px, ${ translateY }px) rotate(${ -pose.rotation - 180 }deg)`;
      }
    } else {
      transform = `translate(${ 0 }px, ${ -40 }px) rotate(${ -pose.rotation - 180 }deg)`;
    }
  }
</script>

<div class="main">
  <div class="zone">
    <div class="slot" 
      style:display={ isInRange ? "block" : "none" }>
      <span>{ targetNode?.slot ?? "" }</span>
    </div>
    <div class="barrier" 
      style:display={ isInRange ? "block" : "none"} 
      style:background={ alliance === Alliance.Red ? "#CC0000" : "#0000CC" } />
    <div class="target"
      style:opacity={ isInRange ? 1 : 0 } 
      style:width={ targetNode?.type === NodeType.Cube ? "160px" : "20px" } />
    <div class="robot"
      style:opacity={ isInRange || isRobotXLocked ? 1 : 0 }
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
      <div class="xconfig">
        <div class="wheel frontLeft"></div>
        <div class="wheel frontRight"></div>
        <div class="wheel rearLeft"></div>
        <div class="wheel rearRight"></div>
        <CloseFilled fill="#CC0000" width=100 height=100 />
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    flex-direction: column;
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

        .xconfig {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          .wheel {
            position: absolute;
            width: 40px;
            height: 15px;
            background-color: #FFFFFF;
            transform-origin: 50% 50%;

            &.frontLeft {
              top: 20px;
              left: 8px;
              transform: rotate(45deg);
            }

            &.frontRight {
              top: 20px;
              right: 8px;
              transform: rotate(-45deg);
            }

            &.rearLeft {
              bottom: 20px;
              left: 8px;
              transform: rotate(-45deg);
            }

            &.rearRight {
              bottom: 20px;
              right: 8px;
              transform: rotate(45deg);
            }
          }
        }
      }
    }
  }
</style>