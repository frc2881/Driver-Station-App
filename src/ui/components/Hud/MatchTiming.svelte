<script lang="ts">
  import { IntentRequestActive, IntentRequestInactive, IntentRequestUninstall, CloseOutline, CheckmarkOutline, Unknown } from "carbon-icons-svelte";
  import { Alliance } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let matchTime = $derived(nt.topics.get("/SmartDashboard/Match/Time")?.value ?? 0 as number);
  let matchStateTime = $derived(nt.topics.get("/SmartDashboard/Match/StateTime")?.value ?? 0 as number);
  let matchState = $derived(nt.topics.get("/SmartDashboard/Match/State")?.value ?? "Unknown" as string);
  let hubState = $derived(nt.topics.get("/SmartDashboard/Match/Hub")?.value ?? "Inactive" as string);
  let alliance = $derived(nt.topics.get("/SmartDashboard/Match/Alliance")?.value as Alliance);
  let selectedAlliance = $derived(nt.topics.get("/SmartDashboard/Match/SelectedAlliance")?.value as Alliance);
</script>

<div class="main">
  <div class="state">
    <div class="hub" class:ending={ matchTime > 0 && matchStateTime <= 5 }>
    {#if matchTime > 0 }
      {#if hubState == "Active" }
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
      { matchState }
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