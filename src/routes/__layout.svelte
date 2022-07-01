<script lang="ts">
  import SiteWrapper from '$lib/SiteWrapper.svelte';
  import '../app.css';
</script>

<SiteWrapper>
  <main class="h-full">
    <!-- <WidgetView {widgetData} /> -->
    <slot />
  </main>
</SiteWrapper>
