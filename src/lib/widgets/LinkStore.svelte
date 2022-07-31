<script lang="ts">
  export let widgetConfig: ILinkWidgetConfig;
</script>

<div class="flex justify-center items-center text-center">
  {#if widgetConfig.sametab}
    <a href={widgetConfig.href ?? '/'}>{widgetConfig.title ?? 'Link'}</a>
  {:else}
    <a href={widgetConfig.href ?? '/'} target="_blank" rel="noopener">{widgetConfig.title ?? 'Link'}</a>
  {/if}
</div>
