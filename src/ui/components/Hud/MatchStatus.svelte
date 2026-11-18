<script lang="ts">
  import { IntentRequestActive, IntentRequestInactive, IntentRequestUninstall, CloseOutline, CheckmarkOutline, Unknown, ArrowShiftDown } from "carbon-icons-svelte";
  import { Alliance } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  const enum MatchState {
    Stopped = "STOPPED",
    Auto = "AUTO",
    Teleop = "TELEOP",
    EndGame = "END_GAME"
  }

  let matchTime = $derived(nt.topics.get("/Telemetry/Match/Time")?.value ?? 0 as number);
  let matchStateTime = $derived(nt.topics.get("/Telemetry/Match/StateTime")?.value ?? 0 as number);
  let matchState = $derived(nt.topics.get("/Telemetry/Match/State")?.value ?? MatchState.Stopped as MatchState);
</script>

<div class="main">
  <div class="state">
    <div class="timing">
      { String(matchStateTime).padStart(2, "0") }
    </div>
  </div>
  <div class="info">
    <div class="matchState">
      { matchState.replace("_", " ") }
    </div>
  </div>
</div>

<style>
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
  }
</style>