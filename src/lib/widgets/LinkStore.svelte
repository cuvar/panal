<script lang="ts">
  export let widgetConfig: ILinkWidgetConfig;
</script>

{#if widgetConfig.links.length == 1}
  <div class="flex justify-center items-center text-center w-full h-full bg-pblue-500 rounded-md">
    {#if widgetConfig.links[0].sametab}
      <a href={widgetConfig.links[0].href ?? '/'}>{widgetConfig.links[0].title ?? 'Link'}</a>
    {:else}
      <a href={widgetConfig.links[0].href ?? '/'} target="_blank" rel="noopener">{widgetConfig.links[0].title ?? 'Home'}</a>
    {/if}
  </div>
{:else if widgetConfig.links.length > 1}
  <div class="w-full h-full rounded-md bg-plightgreen-500 flex flex-wrap items-center justify-center p-5">
    {#each widgetConfig.links as link}
      <a class="bg-pblue-500 p-2 m-1 rounded-sm" href={link.href ?? '/'} target="_blank" rel="noopener">{link.title ?? 'Home'}</a>
    {/each}
  </div>
{:else}
  <div class="flex justify-center items-center text-center w-full h-full bg-pblue-500 rounded-md">
    <a href={widgetConfig.links[0].href ?? '/'} target="_blank" rel="noopener">{widgetConfig.links[0].title ?? 'Home'}</a>
  </div>
{/if}
