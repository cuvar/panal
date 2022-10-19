<script lang="ts">
	export let href: string = '';
	export let tab: 'new' | 'same' = 'new';
</script>

{#if tab === 'new'}
	<a
		{href}
		target="_blank"
		rel="noopener noreferrer"
		class="hover:underline hover:text-gray-400 active:text-gray-500"><slot /></a
	>
{:else}
	<a {href} class=""><slot /></a>
{/if}
