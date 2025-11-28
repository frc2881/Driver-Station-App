<script lang="ts">
  import { Dropdown, Toggle } from "carbon-components-svelte";
  import { NetworkTablesDataType } from "../../common/index.js";
  import { NetworkTablesService as nt, updateNetworkTablesTopics } from "../services/NetworkTables.svelte";

  interface Props {
    name?: string;
    key: string;
    useInline?: boolean;
    useToggle?: boolean;
    invertToggle?: boolean;
  }

  let {
    name,
    key,
    useInline = false,
    useToggle = false,
    invertToggle = false
  }: Props = $props();

  let options = $derived(nt.topics.get(`${ key }/options`))
  let active = $derived(nt.topics.get(`${ key }/active`))

  let items: { id: number; text: string; }[] = $derived.by(() => {
    if (options?.value && active?.value) {
      const __items = [];
      let id = 0;
      for (const option of options?.value as Array<string>) {
        __items.push({ id, text: option });
        id += 1;
      }
      return __items;
    } else {
      return [];
    }
  });

  let selectedItemId = $derived.by(() => {
    if (options?.value && active?.value) {
      let id = 0;
      for (const option of options?.value as Array<string>) {
        if (option === active?.value) { return id; }
        id += 1;
      }
    } else {
      return 0;
    }
  });
</script>

<div class="main">
  {#if useToggle }
  <div class="toggle">
    <div class="label">{ name }</div>
    <div>
      <Toggle
        hideLabel={ true }
        labelA={ items[invertToggle ? 1: 0]?.text }
        labelB={ items[invertToggle ? 0: 1]?.text }
        toggled={ invertToggle ? !selectedItemId : !!selectedItemId }
        on:toggle={ (e: any) => {
        updateNetworkTablesTopics([{
          id: 0,
          name: active?.name.replace("/active", "/selected") ?? "",
          type: active?.type ?? NetworkTablesDataType.Raw,
          value: e.detail.toggled ? items[invertToggle ? 0: 1]?.text : items[invertToggle ? 1: 0]?.text
        }]);
      }} />
    </div>
  </div>
  {:else}
  <Dropdown
    type={ useInline ? "inline" : "default" }
    labelText={ name }
    selectedId={ selectedItemId }
    items={ items }
    on:select={ (e: any) => {
      updateNetworkTablesTopics([{
        id: 0,
        name: active?.name.replace("/active", "/selected") ?? "",
        type: active?.type ?? NetworkTablesDataType.Raw,
        value: e.detail.selectedItem.text
      }]);
    }} />
  {/if}
</div>

<style>
  .main {
    margin-bottom: 1em;

    & :global(.bx--label) {
      min-width: 130px;
      font-size: 1.1rem;
      white-space: nowrap;
    }

    & :global(.bx--list-box__label) {
      font-size: 1.1rem;
      margin-right: 0.5em;
    }

    & :global(.bx--list-box__menu-item__option) {
      font-size: 1.1rem;
    }

    & .toggle {
      display: flex;
      align-items: center;
      min-height: 3em;

        & .label {
          min-width: 130px;
          font-size: 1.1rem;
          margin: 0 30px 0 0;
          color: var(--app-color-silver);
        }

        & :global(.bx--toggle__text--off), :global(.bx--toggle__text--on) {
          font-size: 1.1rem;
          padding: 0 0 0 0.5em;
          color: #FFFFFF !important;
        }
    }
  }
</style>