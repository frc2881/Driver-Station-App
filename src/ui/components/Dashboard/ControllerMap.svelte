<script lang="ts">
  import CloseOutline from "carbon-icons-svelte/lib/CloseOutline.svelte";

  export let isControllerMapVisible = false;
</script>

{ #if isControllerMapVisible }
<div class="main">
  <div class="close-button">
    <button on:click={ () => { isControllerMapVisible = false; } }>
      <CloseOutline width=48 height=48 fill="#000000" />
    </button>
  </div>
  <div class="controllers">
    <!-- DRIVER -->
    <div class="text title" style="left:465px;top:50px;"><h3>Driver</h3></div>
    <div class="text" style="left:325px;bottom:570px;">
      <div class="do">LT: * Align Speaker</div>
    </div>
    <div class="text right" style="right:1025px;bottom:570px;">
      <div class="do">* Launch (if aligned)</div>
      <div>RT: Intake Front</div>
    </div>
    <div class="text" style="left:325px;bottom:480px;">
      <div class="do">LB: * Align Shuttle</div>
    </div>
    <div class="text right" style="right:1025px;bottom:480px;">
      <div class="do">* Intake Rear (+RT)</div>
      <div>RB: Eject Intake</div>
    </div>
    <div class="text" style="left:325px;bottom:380px;">
      <div>L-R: Drive L/R</div>
      <div>U-D: Drive F/B</div>
      <div>Hold: Lock</div>
    </div>
    <div class="text right" style="right:1025px;bottom:380px;">
      <div class="do">A: * Align Amp</div>
      <div class="do">B: * Align Subwoofer</div>
      <div class="do">Y: * Align Podium</div>
      <div>X: Climb + Lock</div>
    </div>
    <div class="text" style="left:325px;bottom:290px;">
      <div>L: Climber Unlock</div>
      <div>U: Climber Default</div>
      <div class="na">R: ----------</div>
      <div class="na">D: ----------</div>
    </div>
    <div class="text right" style="right:1025px;bottom:290px;">
      <div>L-R: Rotate</div>
      <div class="na">U-D: ----------</div>
      <div>Hold: Align Target</div>
    </div>
    <div class="text" style="left:325px;bottom:180px;">
      <div>Back: Reset Gyro</div>
    </div>
    <div class="text right" style="right:1025px;bottom:180px;">
      <div class="na">Start: ----------</div>
    </div>
    <div class="text notes" style="left:60px;top:160px;">
      <div>
        Notes:
        <ul>
          <li>Reset gyro to desired field orientation after robot power cycle or during teleop driving as needed</li>
          <li>* Driver-only mode launch command requires a launcher alignment option to be held in combination</li>
        </ul>
      </div>
    </div>
    <!-- OPERATOR -->
    <div class="text title" style="right:465px;top:50px;"><h3>Operator</h3></div>
    <div class="text" style="left:1025px;bottom:570px;">
      <div>LT: Align Speaker</div>
    </div>
    <div class="text right" style="right:325px;bottom:570px;">
      <div>RT: Launch Speaker</div>
    </div>
    <div class="text" style="left:1025px;bottom:480px;">
      <div>LB: Align Amp</div>
    </div>
    <div class="text right" style="right:325px;bottom:480px;">
      <div>RB: Launch Amp</div>
    </div>
    <div class="text" style="left:1025px;bottom:380px;">
      <div class="na">L-R: ----------</div>
      <div>U-D: Launcher U/D</div>
      <div class="na">Hold: ----------</div>
    </div>
    <div class="text right" style="right:325px;bottom:380px;">
      <div class="na">A: ----------</div>
      <div class="na">B: ----------</div>
      <div class="na">Y: ----------</div>
      <div class="na">X: ----------</div>
    </div>
    <div class="text" style="left:1025px;bottom:290px;">
      <div class="na">L: ----------</div>
      <div>U: Align Shuttle</div>
      <div>R: Align Podium</div>
      <div>D: Align Subwoofer</div>
    </div>
    <div class="text right" style="right:325px;bottom:290px;">
      <div class="na">L-R: ----------</div>
      <div class="na">U-D: ----------</div>
      <div class="na">Hold: ----------</div>
    </div>
    <div class="text" style="left:1025px;bottom:180px;">
      <div>Back: Reset Launcher</div>
    </div>
    <div class="text right" style="right:325px;bottom:180px;">
      <div>Start: Reset Climber</div>
    </div>
    <div class="text notes" style="right:60px;top:160px;">
      <div>
        Notes:
        <ul>
          <li>Always reset launcher and climber arm positions to zero after robot power cycle, roboRIO reboot, or new robot code deployment</li>
          <li>Operator controller launch command requires a launcher alignment option to be held in combination</li>
        </ul>
      </div>
    </div>
  </div>
</div>
{ /if }

<style>
  .main {
    position: absolute;
    z-index: 9999;
    width: 1880px;
    height: 720px;
    background: #FFFFFF;
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
        color: var(--app-color-black);
        display: flex;
        flex-direction: column;
        gap: .25em;
        font-size: 13px;
        font-weight: bold;
        transform: translateY(20px);

        &.title {
          width: 250px;
          padding: 5px 15px;
          border: 1px solid var(--app-color-charcoal);
          text-align: center;
          background: var(--app-color-black);
          color: var(--app-color-white);
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
          opacity: 0.25;
        }

        & .do {
          color: var(--app-color-pink);
        }
      }
    }
  }
</style>