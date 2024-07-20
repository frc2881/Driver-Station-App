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
      <div class="na">LT: ----------</div>
    </div>
    <div class="text right" style="right:1025px;bottom:570px;">
      <div>RT: Intake Front</div>
      <div>(+ Launch)</div>
    </div>
    <div class="text" style="left:325px;bottom:480px;">
      <div>LB: Align Shuttle</div>
    </div>
    <div class="text right" style="right:1025px;bottom:480px;">
      <div>RB: Eject Intake</div>
    </div>
    <div class="text" style="left:325px;bottom:380px;">
      <div>X: Drive L/R</div>
      <div>Y: Drive F/B</div>
      <div>Press: Lock</div>
    </div>
    <div class="text right" style="right:1025px;bottom:380px;">
      <div>A: Align Amp</div>
      <div>B: Align Subwoofer</div>
      <div>Y: Reload Intake</div>
      <div>X: Climb + Lock</div>
    </div>
    <div class="text" style="left:325px;bottom:290px;">
      <div>L: Climber Unlock</div>
      <div>U: Climber Default</div>
      <div class="na">R: ----------</div>
      <div class="na">D: ----------</div>
    </div>
    <div class="text right" style="right:1025px;bottom:290px;">
      <div>X: Rotate</div>
      <div class="na">Y: ----------</div>
      <div>Press: Align Speaker</div>
    </div>
    <div class="text" style="left:325px;bottom:180px;">
      <div>Back: Reset Gyro</div>
    </div>
    <div class="text right" style="right:1025px;bottom:180px;">
      <div>Start: Calibrate Gyro</div>
    </div>
    <div class="text notes" style="left:60px;top:160px;">
      <div>
        Notes:
        <ul>
          <li>Driver controller launch command requires a target alignment option to be held in combination</li>
          <li>Reset gyro to desired field orientation after robot power cycle or during teleop driving as needed</li>
          <li>Hold X button through end of match to secure climber position and lock</li>
          <li>Calibrate ADIS16470 gyro more than 4 seconds before match countdown and start of autonomous period begins</li>
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
      <div class="na">X: ----------</div>
      <div>Y: Launcher +/-</div>
      <div class="na">Press: ----------</div>
    </div>
    <div class="text right" style="right:325px;bottom:380px;">
      <div class="na">A: ----------</div>
      <div class="na">B: ----------</div>
      <div class="na">Y: ----------</div>
      <div class="na">X: ----------</div>
    </div>
    <div class="text" style="left:1025px;bottom:290px;">
      <div class="na">L: ----------</div>
      <div>U: Align Podium</div>
      <div class="na">R: ----------</div>
      <div>D: Align Subwoofer</div>
    </div>
    <div class="text right" style="right:325px;bottom:290px;">
      <div class="na">X: ----------</div>
      <div class="na">Y: ----------</div>
      <div class="na">Press: ----------</div>
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
          <li>Operator controller launch command requires a target alignment option to be held in combination</li>
          <li>Always reset launcher arm position to zero after robot power cycle</li>
          <li>Always reset climber arm position to zero after robot power cycle</li>
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
      }
    }
  }
</style>