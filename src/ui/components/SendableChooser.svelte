<script lang="ts">
  import { Dropdown } from "carbon-components-svelte";
  import { NetworkTablesTopic } from "../../common";
  import { updateNetworkTablesTopics } from "../stores/NetworkTables";

  export let name: string;
  export let options: NetworkTablesTopic;
  export let active: NetworkTablesTopic;

  let items: { id: number; text: string; }[] = [];
  let selectedItemId = 0;

  $: {
    if (options && active) {
      items = [];
      let id = 0;
      for (const option of options?.value as Array<string>) {
        items.push({ id, text: option });
        if (option === active?.value) { selectedItemId = id; }
        id += 1;
      }
    }
  }
</script>

<div class="main">
  <div class="title"><h4>{ name }</h4></div>
  <div>
    <Dropdown
      selectedId={ selectedItemId }
      items={ items }
      on:select={ (e) => {
        updateNetworkTablesTopics([{
          id: 0,
          name: active.name.replace("/active", "/selected"),
          type: active.type,
          value: e.detail.selectedItem.text
        }]);
      } } />
  </div>
</div>

<style lang="postcss">
  .main {
    display: grid;
    grid-template-rows: 50px auto;
    width: 100%;
    height: 100%;

    .title {
      color: var(--app-color-smoke);
    }
  }
</style>