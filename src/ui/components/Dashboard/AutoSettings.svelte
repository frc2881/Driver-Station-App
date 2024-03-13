<script lang="ts">
  import { Configuration } from "../../../config";
  import { NetworkTables, Alliance } from "../../../common";
  import { NetworkTablesStore } from "../../stores/NetworkTables";
  import SendableChooser from "../SendableChooser.svelte";

  let alliance: Alliance;
  let activeCommand = "";

  const { Topics } = Configuration.Settings.NetworkTables;

  let nt: NetworkTables;
  $: { 
    nt = $NetworkTablesStore; 
    activeCommand = nt.topics.get(`${Topics.AutoCommand}/active`)?.value ?? "";
    alliance = nt.topics.get(Topics.Alliance)?.value
  }
</script>

<div class="main">
  <div class="title"><h4>Auto</h4></div>
  <div>
    <SendableChooser
      name="Auto Command"
      options={ nt.topics.get(`${Topics.AutoCommand}/options`) }
      active={ nt.topics.get(`${Topics.AutoCommand}/active`) } />
  </div>
  <div 
    class="active"
    class:none={ activeCommand === "None" }>
    <h4>{ activeCommand }</h4>
  </div>
  <div class="auto">
    <div class="field { alliance?.toLowerCase() }">
      <img src="./assets/field.png" />
      <div class="pose p1" class:starting={ activeCommand.startsWith("/") }></div>
      <div class="pose p2" class:starting={ activeCommand.startsWith("|") }></div>
      <div class="pose p3" class:starting={ activeCommand.startsWith("\\") }></div>
      <div class="pose s01" class:scoring={ activeCommand.startsWith("/ > 0 > 1") || activeCommand.startsWith("/ 0 > 1") }></div>
      <div class="pose s02" class:scoring={ activeCommand.startsWith("| > 0 > 2") || activeCommand.startsWith("| 0 > 2") }></div>
      <div class="pose s03" class:scoring={ activeCommand.startsWith("\\ > 0 > 3") || activeCommand.startsWith("\\ 0 > 3") }></div>
      <div class="pose s1" class:scoring={ activeCommand.startsWith("/ > 0 > 1") }></div>
      <div class="pose s2" class:scoring={ activeCommand.startsWith("| > 0 > 2") }></div>
      <div class="pose s3" class:scoring={ activeCommand.startsWith("\\ > 0 > 3") }></div>
      <div class="pose s4" class:scoring={ activeCommand.startsWith("/ > 0 > 1 > 4") }></div>
      <div class="pose s5" class:scoring={ activeCommand.startsWith("/ > 0 > 1 > 5") }></div>
    </div>
  </div>
</div>

<style lang="postcss">
  .main {
    .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }
    .active {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      height: 100%;
      margin-top: 3em;
      padding: 1em;
      text-align: center;
      color: var(--app-color-green);
      border: 1px solid var(--app-color-green);

      &.none {
        color: var(--app-color-charcoal);
        border-color: var(--app-color-charcoal);
      }
    }
    .auto {
      display: flex;
      justify-content: center;
      margin-top: 12em;

      .field {
        position: relative;
        width: 380px;
        &.blue { transform: rotate(0); }
        &.red { transform: rotate(180deg); }
        img { width: 100%; }

        .pose {
          position: absolute;
          left: 0;
          top: 0;
          width: 10px;
          height: 10px;

          &.starting {
            background: var(--app-color-pink);
          }

          &.scoring {
            background: var(--app-color-green);
          }
          
          &.p1 {
            left: 12px;
            top: 32px;
            transform: rotate(45deg);
          }

          &.p2 {
            left: 24px;
            top: 56px;
            transform: rotate(0deg);
          }

          &.p3 {
            left: 12px;
            top: 80px;
            transform: rotate(-45deg);
          }

          &.s01 {
            left: 36px;
            top: 26px;
            transform: rotate(45deg);
          }

          &.s02 {
            left: 40px;
            top: 56px;
            transform: rotate(0deg);
          }

          &.s03 {
            left: 36px;
            top: 84px;
            transform: rotate(-45deg);
          }

          &.s1 {
            left: 64px;
            top: 24px;
            transform: rotate(60deg);
          }

          &.s2 {
            left: 64px;
            top: 56px;
            transform: rotate(0deg);
          }

          &.s3 {
            left: 62px;
            top: 90px;
            transform: rotate(-55deg);
          }

          &.s4 {
            left: 184px;
            top: 14px;
            transform: rotate(0deg);
          }

          &.s5 {
            left: 184px;
            top: 48px;
            transform: rotate(0deg);
          }
        }
      }
    }
  }
</style>