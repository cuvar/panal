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

<footer>
  <p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
