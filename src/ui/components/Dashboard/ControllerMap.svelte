<script lang="ts">
  import { CloseOutline } from "carbon-icons-svelte";

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
      <div class="na">LT: ----------</div>
    </div>
    <div class="text right" style="right:1025px;bottom:570px;">
      <div class="na">RT: ----------</div>
    </div>
    <div class="text" style="left:325px;bottom:480px;">
      <div>LB: Left Align Target</div>
    </div>
    <div class="text right" style="right:1025px;bottom:480px;">
      <div>RB: Right Align Target</div>
    </div>
    <div class="text" style="left:325px;bottom:380px;">
      <div>L-R: Drive L/R</div>
      <div>U-D: Drive F/B</div>
      <div>Hold: Lock "X"</div>
    </div>
    <div class="text right" style="right:1025px;bottom:380px;">
      <div class="na">A: ----------</div>
      <div class="na">B: ----------</div>
      <div class="na">Y: ----------</div>
      <div class="na">X: ----------</div>
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
      <div class="na">Hold: ----------</div>
    </div>
    <div class="text" style="left:325px;bottom:180px;">
      <div>Back: Reset Gyro (Hold)</div>
    </div>
    <div class="text right" style="right:1025px;bottom:180px;">
      <div class="na">Start: ----------</div>
    </div>
    <div class="text notes" style="left:60px;top:160px;">
      <div>
        Notes:
        <ul>
          <li>Reset gyro to desired field orientation after robot power cycle or during teleop driving as needed (hold for &gt; 0.5 seconds)</li>
        </ul>
      </div>
    </div>
    <!-- OPERATOR -->
    <div class="text title" style="right:465px;top:50px;"><h3>Operator</h3></div>
    <div class="text" style="left:1025px;bottom:570px;">
      <div class="na">LT: ----------</div>
    </div>
    <div class="text right" style="right:325px;bottom:570px;">
      <div class="na">RT: ----------</div>
    </div>
    <div class="text" style="left:1025px;bottom:480px;">
      <div class="na">LB: ----------</div>
    </div>
    <div class="text right" style="right:325px;bottom:480px;">
      <div class="na">RB: ----------</div>
    </div>
    <div class="text" style="left:1025px;bottom:380px;">
      <div class="na">L-R: ----------</div>
      <div class="na">U-D: ----------</div>
      <div class="na">Hold: ----------</div>
    </div>
    <div class="text right" style="right:325px;bottom:380px;">
      <div class="na">A: ----------</div>
      <div class="na">B: ----------</div>
      <div class="na">Y: ----------</div>
      <div class="na">X: ----------</div>
    </div>
    <div class="text" style="left:1025px;bottom:290px;">
      <div class="na">U: ----------</div>
      <div class="na">R: ----------</div>
      <div class="na">D: ----------</div>
      <div class="na">L: ----------</div>
    </div>
    <div class="text right" style="right:325px;bottom:290px;">
      <div class="na">L-R: ----------</div>
      <div class="na">U-D: ----------</div>
      <div class="na">Hold: ----------</div>
    </div>
    <div class="text" style="left:1025px;bottom:156px;">
      <div class="na">Back: ----------</div>
    </div>
    <div class="text right" style="right:325px;bottom:141px;">
      <div class="na">Start: ----------</div>
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