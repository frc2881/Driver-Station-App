<script lang="ts">
  import { Dropdown } from "carbon-components-svelte";
  import { NetworkTablesTopic } from "../../common";
  import { updateNetworkTablesTopics } from "../stores/NetworkTables";

  export let name: string;
  export let inline: boolean = false;
  export let options: NetworkTablesTopic;
  export let active: NetworkTablesTopic;

  let items: { id: number; text: string; }[] = [];
  let selectedItemId = 0;

  $: {
    if (options?.value && active?.value) {
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
  <Dropdown
    type={ inline ? "inline" : "default" }
    titleText={ name }
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

<style lang="postcss">
  .main {
    margin-bottom: 1em;

    :global {
      .bx--label {
        width: 120px;
      }
    }
  }
</style>