<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import WidgetView from '$lib/WidgetView.svelte';
  import widgetConfig from '../widgets.config';

  // @ts-ignore
  export let widgetData: IWidgetData[] = widgetConfig;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<WidgetView {widgetData} />
