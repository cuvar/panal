<script lang="ts">
  export let widgetConfig: ILinkWidgetConfig;
  export let colspan: {
    sm: number;
    md: number;
    lg: number;
  };
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
  <div class={'w-full h-full rounded-md bg-pdarkgreen-500 overflow-y-auto grid auto-rows-max ' + ` grid-cols-${2} sm:grid-cols-${colspan.sm} md:grid-cols-${colspan.md} lg:grid-cols-${colspan.lg}`}>
    {#each widgetConfig.links as link}
      <a class="bg-plightgreen-500 p-2 m-1 rounded-md flex text-center justify-center items-center" href={link.href ?? '/'} target="_blank" rel="noopener">{link.title ?? 'Home'}</a>
    {/each}
  </div>
{:else}
  <div class="flex justify-center items-center text-center w-full h-full bg-pblue-500 rounded-md">
    <a href={widgetConfig.links[0].href ?? '/'} target="_blank" rel="noopener">{widgetConfig.links[0].title ?? 'Home'}</a>
  </div>
{/if}

<!-- todo: what happens on smaller screen with many links? will overflow -> fix -->
