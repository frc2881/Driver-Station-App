<script lang="ts">
  import CloseOutline from "carbon-icons-svelte/lib/CloseOutline.svelte";

  export let isControllerMapVisible = false;
</script>

{ #if isControllerMapVisible }
<div 
  class="main"
  on:click={ () => { isControllerMapVisible = false; } }>
  <CloseOutline width=48 height=48 fill="#000000" style="position:absolute;top:1em;right:1em;" />
  <div class="controllers">
    <!-- DRIVER -->
    <div class="text title" style="left:465px;top:50px;"><h3>Driver</h3></div>
    <div class="text" style="left:325px;bottom:570px;">
      <div>LT: Warmup Shuttle</div>
    </div>
    <div class="text right" style="right:1025px;bottom:570px;">
      <div>RT: Run Intake</div>
    </div>
    <div class="text" style="left:325px;bottom:480px;">
      <div>LB: Eject</div>
    </div>
    <div class="text right" style="right:1025px;bottom:480px;">
      <div>RB: Launch (Shuttle)</div>
    </div>
    <div class="text" style="left:325px;bottom:380px;">
      <div>X: Drive</div>
      <div>Y: Drive</div>
      <div>Press: Lock</div>
    </div>
    <div class="text right" style="right:1025px;bottom:380px;">
      <div>A: Align To Target</div>
      <div>B: Reload Intake</div>
      <div>Y: -----</div>
      <div>X: -----</div>
    </div>
    <div class="text" style="left:325px;bottom:290px;">
      <div>L: -----</div>
      <div>U: -----</div>
      <div>R: -----</div>
      <div>D: -----</div>
    </div>
    <div class="text right" style="right:1025px;bottom:290px;">
      <div>X: Rotate</div>
      <div>Y: -----</div>
      <div>Press: Align To Target</div>
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
          <li>Calibrate gyro immediately before match countdown and start of autonomous period begins</li>
          <li>Reset gyro to desired field orientation after robot power cycle or during teleop driving as needed</li>
        </ul>
      </div>
    </div>
    <!-- OPERATOR -->
    <div class="text title" style="right:465px;top:50px;"><h3>Operator</h3></div>
    <div class="text" style="left:1025px;bottom:570px;">
      <div>LT: Align To Target</div>
    </div>
    <div class="text right" style="right:325px;bottom:570px;">
      <div>RT: Launch (Speaker)</div>
    </div>
    <div class="text" style="left:1025px;bottom:480px;">
      <div>LB: -----</div>
    </div>
    <div class="text right" style="right:325px;bottom:480px;">
      <div>RB: Launch (Amp)</div>
    </div>
    <div class="text" style="left:1025px;bottom:380px;">
      <div>X: -----</div>
      <div>Y: Launcher +/-</div>
      <div>Press: -----</div>
    </div>
    <div class="text right" style="right:325px;bottom:380px;">
      <div>A: -----</div>
      <div>B: -----</div>
      <div>Y: -----</div>
      <div>X: -----</div>
    </div>
    <div class="text" style="left:1025px;bottom:290px;">
      <div>L: Long Range</div>
      <div>U: Mid Range</div>
      <div>R: Short Range</div>
      <div>D: Subwoofer</div>
    </div>
    <div class="text right" style="right:325px;bottom:290px;">
      <div>X: -----</div>
      <div>Y: -----</div>
      <div>Press: -----</div>
    </div>
    <div class="text" style="left:1025px;bottom:180px;">
      <div>Back: Reset Launcher</div>
    </div>
    <div class="text right" style="right:325px;bottom:180px;">
      <div>Start: -----</div>
    </div>
    <div class="text notes" style="right:60px;top:160px;">
      <div>
        Notes:
        <ul>
          <li>Always reset launcher arm position to zero after robot power cycle</li>
        </ul>
      </div>
    </div>
  </div>
</div>
{ /if }

<style lang="postcss">
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

    .controllers {
      width: 1400px;
      height: 720px;
      background-image: url("./assets/controllers.png");
      background-position-y: 20px;

      .text {
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

          ul {
            margin: 10px 0 0px 15px;
            list-style-type: square;

            li {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
</style>