<script lang="ts">
  import CloseOutline from "carbon-icons-svelte/lib/CloseOutline.svelte";

  interface Props {
    isControllerMapVisible?: boolean;
  }

  let { isControllerMapVisible = $bindable(false) }: Props = $props();
</script>

{#if isControllerMapVisible}
<div class="main">
  <div class="close-button">
    <button onclick={() => { isControllerMapVisible = false; }}>
      <CloseOutline width=48 height=48 fill="#FFFFFF" />
    </button>
  </div>
  <div class="controllers">
    <!-- DRIVER -->
    <div class="text title" style="left:465px;top:50px;"><h3>Driver</h3></div>
    <div class="text" style="left:325px;bottom:570px;">
      <div>LT: Intake Coral</div>
    </div>
    <div class="text right" style="right:1025px;bottom:570px;">
      <div>RT: Score Coral</div>
    </div>
    <div class="text" style="left:325px;bottom:480px;">
      <div>LB: Left Align Target (+ Right Stick)</div>
    </div>
    <div class="text right" style="right:1025px;bottom:480px;">
      <div>RB: Right Align Target (+ Right Stick)</div>
    </div>
    <div class="text" style="left:325px;bottom:380px;">
      <div>L-R: Drive L/R</div>
      <div>U-D: Drive F/B</div>
      <div>Hold: Lock "X"</div>
    </div>
    <div class="text right" style="right:1025px;bottom:380px;">
      <div class="na">A: ----------</div>
      <div>B: Score Coral L1</div>
      <div>Y: Cage Climb Down</div>
      <div>X: Cage Climb Up</div>
    </div>
    <div class="text" style="left:325px;bottom:290px;">
      <div class="na">L: ----------</div>
      <div class="na">U: ----------</div>
      <div class="na">R: ----------</div>
      <div class="na">D: ----------</div>
    </div>
    <div class="text right" style="right:1025px;bottom:290px;">
      <div>L-R: Rotate</div>
      <div class="na">U-D: ----------</div>
      <div>Hold: Align Target (Center)</div>
    </div>
    <div class="text" style="left:325px;bottom:180px;">
      <div>Back: Reset Gyro</div>
    </div>
    <div class="text right" style="right:1025px;bottom:180px;">
      <div class="na">Start: Intake Zero Reset</div>
    </div>
    <div class="text notes" style="left:60px;top:160px;">
      <div>
        Notes:
        <ul>
          <li>Reset gyro to desired field orientation after robot power cycle or during teleop driving as needed</li>
        </ul>
      </div>
    </div>
    <!-- OPERATOR -->
    <div class="text title" style="right:465px;top:50px;"><h3>Operator</h3></div>
    <div class="text" style="left:1025px;bottom:570px;">
      <div>LT: Run Gripper</div>
    </div>
    <div class="text right" style="right:325px;bottom:570px;">
      <div>RT: Release Gripper</div>
    </div>
    <div class="text" style="left:1025px;bottom:480px;">
      <div>LB: Hold Gripper</div>
    </div>
    <div class="text right" style="right:325px;bottom:480px;">
      <div>RB: Lift Coral (Intake)</div>
    </div>
    <div class="text" style="left:1025px;bottom:380px;">
      <div class="na">L-R: ----------</div>
      <div>U-D: Run Elevator</div>
      <div class="na">Hold: ----------</div>
    </div>
    <div class="text right" style="right:325px;bottom:380px;">
      <div>A: Intake Coral Station</div>
      <div>B: Align Reef Algae L2</div>
      <div>Y: Align Reef Algae L3</div>
      <div>X: Setup Cage Climb</div>
    </div>
    <div class="text" style="left:1025px;bottom:290px;">
      <div>U: Align Reef Coral L4</div>
      <div>R: Align Reef Coral L3</div>
      <div>D: Align Reef Coral L2</div>
      <div>L: Align Reef Coral L1</div>
    </div>
    <div class="text right" style="right:325px;bottom:290px;">
      <div class="na">L-R: ----------</div>
      <div>U-D: Run Arm</div>
      <div class="na">Hold: ----------</div>
    </div>
    <div class="text" style="left:1025px;bottom:156px;">
      <div>Back: ----------</div>
      <div>+ Elevator: Run Lower Stage</div>
    </div>
    <div class="text right" style="right:325px;bottom:141px;">
      <div>Start: ----------</div>
      <div>+ D-pad: Zero Resets (see notes)</div>
      <div>+ Elevator: Run Upper Stage</div>
    </div>
    <div class="text notes" style="right:60px;top:160px;">
      <div>
        Notes:
        <ul>
          <li>Mechanisms must be reset to zero positions in the order of arm (Left D-pad), elevator lower stage (Down D-pad), wrist (Right D-pad), elevator upper stage (Up D-pad)</li>
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
      top: 1em;
      right: 1em;

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

        &.title {
          width: 250px;
          padding: 5px 15px;
          background: var(--app-color-pink);
          color: var(--app-color-black);
          text-align: center;
        }

        &.right {
          text-align: right;
        }

        &.notes {
          width: 200px;
          height: 390px;
          padding: 15px;
          border: 1px solid var(--app-color-charcoal);

          & ul {
            margin: 10px 0 0px 15px;
            list-style-type: square;

            & li {
              margin-bottom: 10px;
            }
          }
        }

        & .na {
          opacity: 0.5;
        }

        & .do {
          color: var(--app-color-pink);
        }
      }
    }
  }
</style>