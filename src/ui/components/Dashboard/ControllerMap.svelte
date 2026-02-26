<script lang="ts">
  import { CloseOutline } from "carbon-icons-svelte";
  import { RobotType, type ControllerMapAnnotations } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte";

  interface Props {
    isControllerMapVisible?: boolean;
  }

  let { isControllerMapVisible = $bindable(false) }: Props = $props();

  const ANNOTATIONS_COMPETITION: ControllerMapAnnotations = {
    driver: {
      stickLeftX: "Drive L/R",
      stickLeftY: "Drive F/B",
      stickLeftButton: "Lock Drive (X)",
      stickRightX: "Rotate",
      stickRightY: "",
      stickRightButton: "Align Hub",
      triggerLeft: "Retract Intake",
      triggerRight: "Run Intake",
      bumperLeft: "Align Trench Left",
      bumperRight: "Align Trench Right",
      buttonA: "Align Corner Left",
      buttonB: "Align Tower Right",
      buttonY: "",
      buttonX: "Align Tower Left",
      dpadUp: "Climb Up",
      dpadRight: "Align Climb Right",
      dpadDown: "Climb Down",
      dpadLeft: "Align Climb Left",
      buttonBack: [ "Reset Gyro" ],
      buttonStart: [ "" ],
      notes: [
        "Reset gyro to desired field orientation after robot power cycle or during teleop driving as needed (hold for &gt; 0.5 seconds)"
      ]
    },
    operator: {
      stickLeftX: "",
      stickLeftY: "",
      stickLeftButton: "",
      stickRightX: "",
      stickRightY: "",
      stickRightButton: "",
      triggerLeft: "",
      triggerRight: "Score Fuel",
      bumperLeft: "Agitate Hopper",
      bumperRight: "",
      buttonA: "Align Turret Hub",
      buttonB: "",
      buttonY: "Set Turret 0&deg;",
      buttonX: "",
      dpadUp: "Home Turret",
      dpadRight: "",
      dpadDown: "Home Intake",
      dpadLeft: "r",
      buttonBack: [ "" ],
      buttonStart: [ "" ],
      notes: [
        "Mechanisms must be homed in the correct order (if applicable)"
      ]
    }
  }

  const ANNOTATIONS_DEFAULT: ControllerMapAnnotations = {
    driver: {
      stickLeftX: "Drive L/R",
      stickLeftY: "Drive F/B",
      stickLeftButton: "Lock Drive (X)",
      stickRightX: "Rotate",
      stickRightY: "",
      stickRightButton: "Align Hub",
      triggerLeft: "",
      triggerRight: "",
      bumperLeft: "Align Trench Left",
      bumperRight: "Align Trench Right",
      buttonA: "Align Corner Left",
      buttonB: "Align Tower Right",
      buttonY: "",
      buttonX: "Align Tower Left",
      dpadUp: "",
      dpadRight: "",
      dpadDown: "",
      dpadLeft: "",
      buttonBack: [ "Reset Gyro" ],
      buttonStart: [ "" ],
      notes: [
        "Reset gyro to desired field orientation after robot power cycle or during teleop driving as needed (hold for &gt; 0.5 seconds)"
      ]
    },
    operator: {
      stickLeftX: "",
      stickLeftY: "",
      stickLeftButton: "",
      stickRightX: "",
      stickRightY: "",
      stickRightButton: "",
      triggerLeft: "",
      triggerRight: "",
      bumperLeft: "",
      bumperRight: "",
      buttonA: "",
      buttonB: "",
      buttonY: "",
      buttonX: "",
      dpadUp: "",
      dpadRight: "",
      dpadDown: "",
      dpadLeft: "",
      buttonBack: [ "" ],
      buttonStart: [ "" ],
      notes: [
        "Mechanisms must be homed in the correct order (if applicable)"
      ]
    }
  }

  let annotations = $derived.by(() => {
    const robotType = nt.topics.get("/SmartDashboard/Game/Robot/Type")?.value as RobotType;
    switch (robotType) {
      case RobotType.Competition:
        return ANNOTATIONS_COMPETITION;
      default:
        return ANNOTATIONS_DEFAULT;
    }
  });
</script>

{#if isControllerMapVisible}
<div class="main">
  <div class="close-button">
    <button onclick={() => { isControllerMapVisible = false; }}>
      <CloseOutline width=48 height=48 fill="#FFFFFF" />
    </button>
  </div>
  <div class="controllers">
    <div class="text title" style="left:465px;top:50px;">DRIVER</div>
    <div class="text" style="left:325px;bottom:570px;">
      <div>LT <span class="annotation">{@html annotations.driver.triggerLeft }</span></div>
    </div>
    <div class="text" style="right:1025px;bottom:570px;">
      <div>RT <span class="annotation">{@html annotations.driver.triggerRight }</span></div>
    </div>
    <div class="text" style="left:325px;bottom:480px;">
      <div>LB <span class="annotation">{@html annotations.driver.bumperLeft }</span></div>
    </div>
    <div class="text" style="right:1025px;bottom:480px;">
      <div>RB <span class="annotation">{@html annotations.driver.bumperRight }</span></div>
    </div>
    <div class="text" style="left:325px;bottom:380px;">
      <div>L&mdash;R <span class="annotation">{@html annotations.driver.stickLeftX }</span></div>
      <div>U&mdash;D <span class="annotation">{@html annotations.driver.stickLeftY }</span></div>
      <div>Hold <span class="annotation">{@html annotations.driver.stickLeftButton }</span></div>
    </div>
    <div class="text" style="right:1025px;bottom:380px;">
      <div>A <span class="annotation">{@html annotations.driver.buttonA }</span></div>
      <div>B <span class="annotation">{@html annotations.driver.buttonB }</span></div>
      <div>Y <span class="annotation">{@html annotations.driver.buttonY }</span></div>
      <div>X <span class="annotation">{@html annotations.driver.buttonX }</span></div>
    </div>
    <div class="text" style="left:325px;bottom:290px;">
      <div>L <span class="annotation">{@html annotations.driver.dpadLeft }</span></div>
      <div>U <span class="annotation">{@html annotations.driver.dpadUp }</span></div>
      <div>R <span class="annotation">{@html annotations.driver.dpadRight }</span></div>
      <div>D <span class="annotation">{@html annotations.driver.dpadDown }</span></div>
    </div>
    <div class="text" style="right:1025px;bottom:290px;">
      <div>L&mdash;R <span class="annotation">{@html annotations.driver.stickRightX }</span></div>
      <div>U&mdash;D <span class="annotation">{@html annotations.driver.stickRightY }</span></div>
      <div>Hold <span class="annotation">{@html annotations.driver.stickRightButton }</span></div>
    </div>
    <div class="text" style="left:325px;bottom:180px;">
      {#each annotations.driver.buttonBack as annotation, index}
      <div>{#if index == 0}Back{/if}<span class="annotation">{@html annotation }</span></div>
      {/each}
    </div>
    <div class="text" style="right:1025px;bottom:180px;">
      {#each annotations.driver.buttonStart as annotation, index}
      <div>{#if index == 0}Start{/if}<span class="annotation">{@html annotation }</span></div>
      {/each}
    </div>
    <div class="text notes" style="left:60px;top:160px;">
      <div>
        Notes:
        <ul>
          {#each annotations.driver.notes as note}
          <li>{@html note }</li>
          {/each}
        </ul>
      </div>
    </div>
    <div class="text title" style="right:465px;top:50px;">OPERATOR</div>
    <div class="text" style="left:1025px;bottom:570px;">
      <div>LT <span class="annotation">{@html annotations.operator.triggerLeft }</span></div>
    </div>
    <div class="text" style="right:325px;bottom:570px;">
      <div>RT <span class="annotation">{@html annotations.operator.triggerRight }</span></div>
    </div>
    <div class="text" style="left:1025px;bottom:480px;">
      <div>LB <span class="annotation">{@html annotations.operator.bumperLeft }</span></div>
    </div>
    <div class="text" style="right:325px;bottom:480px;">
      <div>RB <span class="annotation">{@html annotations.operator.bumperRight }</span></div>
    </div>
    <div class="text" style="left:1025px;bottom:380px;">
      <div>L&mdash;R <span class="annotation">{@html annotations.operator.stickLeftX }</span></div>
      <div>U&mdash;D <span class="annotation">{@html annotations.operator.stickLeftY }</span></div>
      <div>Hold <span class="annotation">{@html annotations.operator.stickLeftButton }</span></div>
    </div>
    <div class="text" style="right:325px;bottom:380px;">
      <div>A <span class="annotation">{@html annotations.operator.buttonA }</span></div>
      <div>B <span class="annotation">{@html annotations.operator.buttonB }</span></div>
      <div>Y <span class="annotation">{@html annotations.operator.buttonY }</span></div>
      <div>X <span class="annotation">{@html annotations.operator.buttonX }</span></div>
    </div>
    <div class="text" style="left:1025px;bottom:290px;">
      <div>L <span class="annotation">{@html annotations.operator.dpadLeft }</span></div>
      <div>U <span class="annotation">{@html annotations.operator.dpadUp }</span></div>
      <div>R <span class="annotation">{@html annotations.operator.dpadRight }</span></div>
      <div>D <span class="annotation">{@html annotations.operator.dpadDown }</span></div>
    </div>
    <div class="text" style="right:325px;bottom:290px;">
      <div>L&mdash;R <span class="annotation">{@html annotations.operator.stickRightX }</span></div>
      <div>U&mdash;D <span class="annotation">{@html annotations.operator.stickRightY }</span></div>
      <div>Hold <span class="annotation">{@html annotations.operator.stickRightButton }</span></div>
    </div>
    <div class="text" style="left:1025px;bottom:180px;">
      {#each annotations.operator.buttonBack as annotation, index}
      <div>{#if index == 0}Back{/if}<span class="annotation">{@html annotation }</span></div>
      {/each}
    </div>
    <div class="text" style="right:325px;bottom:180px;">
      {#each annotations.operator.buttonStart as annotation, index}
      <div>{#if index == 0}Start{/if}<span class="annotation">{@html annotation }</span></div>
      {/each}
    </div>
    <div class="text notes" style="right:60px;top:160px;">
      <div>
        Notes:
        <ul>
          {#each annotations.operator.notes as note}
          <li>{@html note }</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
{/if}

<style>
  .main {
    position: absolute;
    z-index: 9999;
    width: 1880px;
    height: 720px;
    background: var(--app-color-black);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    & .close-button {
      position: absolute;
      top: 0.5em;
      right: 0.5em;

      & button {
        margin: 6px 0 0 0;
        padding: 0;
        background: transparent;
        border: none;
        cursor: pointer;
      }
    }

    & .controllers {
      width: 1400px;
      height: 720px;
      background-image: url("./assets/images/controllers.png");
      background-position-y: 20px;

      & .text {
        position: absolute;
        color: var(--app-color-white);
        display: flex;
        flex-direction: column;
        gap: .25em;
        font-size: 13px;
        transform: translateY(20px);
        color: var(--app-color-pink);

        &.title {
          width: 250px;
          padding: 5px 15px;
          background: var(--app-color-pink);
          color: var(--app-color-black);
          text-align: center;
          font-size: 1.25rem;
          font-weight: bold;
        }

        &.notes {
          width: 220px;
          height: 390px;
          padding: 15px;
          border: 1px solid var(--app-color-charcoal);

          & ul {
            margin: 10px 0 0px 15px;
            list-style-type: square;

            & li {
              margin-bottom: 10px;
              color: var(--app-color-white);
            }
          }
        }

        & .annotation {
          margin-left: .5rem;
          color: var(--app-color-white);

          &:empty::after {
            content: "----------------";
            opacity: 0.3;
          }
        }
      }
    }
  }
</style>