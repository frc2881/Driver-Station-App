<script lang="ts">
  import CaretUp from "carbon-icons-svelte/lib/CaretUp.svelte";
  import CaretDown from "carbon-icons-svelte/lib/CaretDown.svelte";
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import CloseFilled from "carbon-icons-svelte/lib/CloseFilled.svelte";
  import Cone from "carbon-icons-svelte/lib/TrafficCone.svelte";
  import Cube from "carbon-icons-svelte/lib/Cube.svelte";
  import { 
    NetworkTablesTopic,
    Pose2d,
    Pose,
    Alliance,
    Utils
	} from "../../../common";

  export let isRedAlliance: NetworkTablesTopic;
  export let nodes: NetworkTablesTopic;
  export let robotPose: NetworkTablesTopic;
  export let isXConfiguration: NetworkTablesTopic;

  enum NodeType {
    Cone = "CONE",
    Cube = "CUBE"
  }

  type Node = {
    pose: Pose2d;
    nodeType: NodeType;
    slot: number;
  }

  let alliance: Alliance = Alliance.Blue;
  let _nodes: any;
  let targetNodes: Node[] = [];
  let targetNode: Node = null;
  let pose: Pose = { x: 0, y: 0, rotation: 0 };
  let isInRange: boolean = false;
  let isAligned: boolean = false;
  let isHorizontalAligned: boolean = false;
  let isVerticalAligned: boolean = false;
  let isRotationAligned: boolean = false;
  let transform: string = null;
  let isRobotXLocked: boolean = false;
  let targetNodesX: number = 0;

  $: _nodes = nodes?.value;
  $: targetNodes = JSON.parse(_nodes ?? null) ?? [];

  $: {
    alliance = isRedAlliance?.value ? Alliance.Red : Alliance.Blue;

    if (targetNodes.length === 0) { break $; }

    targetNodesX = targetNodes[0].pose.translation.x;

    pose = { x: 0, y: 0, rotation: 0 };
    if (robotPose?.value) {
      [ pose.x, pose.y, pose.rotation ] = robotPose?.value as Array<number>;
    }

    pose.x = 1.75;
    pose.y = 6.875;
    pose.rotation = 180;
    
    isRobotXLocked = isXConfiguration?.value as boolean;

    if (!isRobotXLocked) {
      targetNode = null;
      if (Utils.isNumberInRange(pose.x, targetNodesX - 0.5, targetNodesX + 0.5)) {
        for (const __targetNode of targetNodes) {
          const y = __targetNode.pose.translation.y;
          if (Utils.isNumberInRange(pose.y, y - 0.25, y + 0.25)) {
            targetNode = __targetNode;
            break;
          }
        }
      }
      isInRange = targetNode != null;
      if (isInRange) {
        isHorizontalAligned = Utils.isNumberInRange(
          pose.y, 
          targetNode.pose.translation.y - (targetNode.nodeType === NodeType.Cone ? 0.06 : 0.15), 
          targetNode.pose.translation.y + (targetNode.nodeType === NodeType.Cone ? 0.06 : 0.15)
        );
        isVerticalAligned = Utils.isNumberInRange(pose.x, targetNodesX - 0.06, targetNodesX + 0.06);
        isRotationAligned = Utils.isNumberInRange(Math.abs(pose.rotation), 176, 184);
        isAligned = isHorizontalAligned && isVerticalAligned && isRotationAligned;
        const translateX = -(pose.y - targetNode.pose.translation.y) * 400;
        const translateY = (targetNodesX - pose.x) * 400;
        transform = `translate(${ translateX }px, ${ translateY }px) rotate(${ -pose.rotation - 180 }deg)`;
      } else {
        transform = `translate(${ (-pose.y * 100) / 4 }px, ${ (-pose.x * 100) / 4 }px) rotate(${ -pose.rotation - 360 }deg)`;
      }
    } else {
      transform = `translate(${ 0 }px, ${ -40 }px) rotate(${ -pose.rotation - 180 }deg)`;
    }
  }
</script>

<div class="main">
  <div class="field" style:display={ !isInRange && !isRobotXLocked ? "block" : "none" }>
    <div class="center"></div>
    <div class="barrier"
      style:bottom={ `${(targetNodesX * 100) / 4}px` }
      style:left={ alliance === Alliance.Red ? "0px" : null } 
      style:right={ alliance === Alliance.Blue ? "0px" : null } 
      style:background={ alliance === Alliance.Red ? "#CC0000" : "#0000CC" }></div>
    <div class="barrier"
      style:top={ `${(targetNodesX * 100) / 4}px` } 
      style:left={ alliance === Alliance.Red ? "0px" : null } 
      style:right={ alliance === Alliance.Blue ? "0px" : null } 
      style:background={ alliance === Alliance.Blue ? "#CC0000" : "#0000CC" }></div>
    <div class="robot" style:transform={ transform }>
      <div class="arrow">
        <CaretUp
          stroke="#FFFFFF"
          fill="#FFFFFF"
          width=12 height=12 />
      </div>
    </div>
  </div>
  <div class="zone">
    <div class="slot" 
      style:opacity={ isInRange ? 1 : 0 }>
      <div class="nodeType">
        { #if targetNode?.nodeType === NodeType.Cone }
          <Cone width=100 height=100 fill="#E88800" stroke="#E88800" />
        { :else if targetNode?.nodeType === NodeType.Cube }
          <Cube width=100 height=100 fill="#5D33D5" stroke="#5D33D5" />
        { /if }
      </div>
      <div class="slotNum">{ targetNode?.slot ?? "" }</div>
    </div>
    <div class="barrier" 
      style:opacity={ isInRange ? 1 : 0 } 
      style:background={ alliance === Alliance.Red ? "#CC0000" : "#0000CC" } />
    <div class="target"
      style:opacity={ isInRange ? 1 : 0 } 
      style:width={ targetNode?.nodeType === NodeType.Cube ? "184px" : "24px" } />
    <div class="robot"
      style:display={ isInRange || isRobotXLocked ? "block" : "none" }
      style:background={ isAligned ? "#00CC00" : "transparent" }
      style:border-color={ isAligned ? "#00CC00" : "" }
      style:transform={ transform }>
      <div class="checkmark">
        <CheckmarkFilled
          fill={ isAligned ? "#000000" : "transparent" }
          width=128
          height=128 />
      </div>
      <div class="arrow">
        <CaretDown
          stroke="#FFFFFFCC"
          fill="transparent"
          width=200 height=200 />
      </div>
      <div 
        class="xconfig" 
        style:opacity={ isRobotXLocked ? 1 : 0 }>
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .field {
      position: absolute;
      width: 200px;
      height: 413px;
      border: 1px solid #CCCCCC;

      .barrier {
        position: absolute;
        width: 138px;
        height: 2px;
      }

      .center {
        position: absolute;
        top: 206.5px;
        width: 100%;
        height: 2px;
        background: #666666;
      }

      .robot {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 13.5px;
        background-color: var(--app-color-pink);

        .arrow {
          position: absolute;
          top: -10px;
        }
      }
    }

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
        top: 40px;
        width: 220px;
        height: 140px;
        font-size: 120px;
        line-height: 140px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .slotNum {
          margin-left: 20px;
        }

        .nodeType {
          margin-top: 15px;
        }
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
        border: 8px solid var(--app-color-pink);
        bottom: 132px;

        .checkmark {
          position: absolute;
          top: 32px;
          left: 26px;
        }

        .arrow {
          position: absolute;
          bottom: -142px;
          left: -11px;
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