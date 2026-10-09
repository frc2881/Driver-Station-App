<script lang="ts">
  import { IntentRequestActive, IntentRequestInactive, IntentRequestUninstall, CloseOutline, CheckmarkOutline, Unknown, ArrowShiftDown } from "carbon-icons-svelte";
  import { Alliance } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  const enum MatchState {
    Stopped = "STOPPED",
    Auto = "AUTO",
    Transition = "TRANSITION",
    Shift1 = "SHIFT_1",
    Shift2 = "SHIFT_2",
    Shift3 = "SHIFT_3",
    Shift4 = "SHIFT_4",
    EndGame = "END_GAME"
  }

  let matchTime = $derived(nt.topics.get("/Telemetry/Match/Time")?.value ?? 0 as number);
  let matchStateTime = $derived(nt.topics.get("/Telemetry/Match/StateTime")?.value ?? 0 as number);
  let matchState = $derived(nt.topics.get("/Telemetry/Match/State")?.value ?? MatchState.Stopped as MatchState);
  let hubState = $derived(nt.topics.get("/Telemetry/Match/HubState")?.value ?? "Inactive" as string);
  let alliance = $derived(nt.topics.get("/Telemetry/Match/Alliance")?.value as Alliance);
  let selectedAlliance = $derived(nt.topics.get("/Telemetry/Match/SelectedAlliance")?.value as Alliance);

  const getIsReturnAlertState = (): boolean => {
    return ([MatchState.Shift1, MatchState.Shift2, MatchState.Shift3, MatchState.Shift4].includes(matchState) && hubState == "INACTIVE" && matchStateTime <= 7) || (matchState == MatchState.EndGame && matchStateTime <= 20);
  }

  let isReturnActive: boolean = $derived(getIsReturnAlertState());
</script>

<div class="main">
  <div class="state">
    <div class="hub" class:ending={ matchTime > 0 && matchStateTime <= 5 }>
    {#if matchTime > 0 }
      {#if hubState == "ACTIVE" }
        <IntentRequestActive width=240 height=240 fill="#00CC00" />
      {:else}
        <IntentRequestUninstall width=240 height=240 fill="#CC0000" />
      {/if}
    {:else}
      <IntentRequestInactive width=240 height=240 fill="#666666" />
    {/if}
    </div>
    <div class="timing">
      { String(matchStateTime).padStart(2, "0") }
    </div>
  </div>
  <div class="info">
    <div class="matchState">
      { matchState.replace("_", " ") }
    </div>
    <div class="matchTime">
      { matchTime > 0 ? matchTime : 0 }
    </div>
  </div>
  <div class="alliance">
    {#if selectedAlliance != Alliance.None }
      {#if alliance == selectedAlliance }
        <CheckmarkOutline width=120 height=120 fill="#00CC00" />
      {:else}
        <CloseOutline width=120 height=120 fill="#CC0000" />
      {/if}
    {:else}
      <Unknown width=120 height=120 fill="#666666" />
    {/if}
  </div>
</div>

<div 
  class="return"
  class:active={ isReturnActive }
>
  <div class="time">{ matchStateTime }</div>
  <ArrowShiftDown width=320 height=320 fill="#FFFF00" />
</div>

<style>
  .return {
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: .75;
    animation: pulse-expand 500ms ease-in-out infinite;
    &.active { display: flex; }

    & .time {
      font-size: 36rem;
      color: var(--app-color-yellow);
    }
  }

  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    gap: 2em;

    & .state {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1em;

      & .hub {
        &.ending {
          animation: pulse-expand 500ms ease-in-out infinite;
        }
      }

      & .timing {
        width: 200px;
        text-align: center;
        font-size: 10rem;
      }
    }

    & .info {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1em;

      & .matchState {
        width: 240px;
        font-size: 2rem;
        text-align: center;
        text-transform: uppercase;
      }

      & .matchTime {
        width: 180px;
        font-size: 2rem;
        text-align: center;
      }
    }

    & .alliance {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
</style>