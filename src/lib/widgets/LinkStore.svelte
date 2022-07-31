<script lang="ts">
  export let widgetConfig: ILinkWidgetConfig;
</script>

<div class="flex justify-center items-center text-center">
  {#if widgetConfig.sametab}
    <a href={widgetConfig.href}>{widgetConfig.title}</a>
  {:else}
    <a href={widgetConfig.href} target="_blank" rel="noopener">{widgetConfig.title}</a>
  {/if}
</div>
