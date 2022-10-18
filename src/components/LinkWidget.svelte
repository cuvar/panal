<script lang="ts">
	export let text: string = 'Link';
	export let href: string = '#';
	export let tab: 'new' | 'same' = 'same';
</script>

{#if tab === 'new'}
	<a
		{href}
		target="_blank"
		rel="noopener noreferrer"
		class="bg-teal-200 hover:bg-teal-300 text-black p-5 rounded-md">{text}</a
	>
{:else}
	<a {href} class="bg-teal-200 hover:bg-teal-300 text-black p-5 rounded-md">{text}</a>
{/if}
