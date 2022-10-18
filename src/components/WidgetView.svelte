<script lang="ts">
	import LinkWidget from './LinkWidget.svelte';
	console.log('Hello world');
	const data: LinkData[] = [
		{
			text: 'GitHub',
			href: 'https://github.com/cuvar',
			tab: 'new'
		},
		{
			text: 'Google',
			href: 'https://google.com',
			tab: 'new'
		}
	];
</script>

<div>
	<div class="grid grid-flow-col auto-cols-max gap-4">
		{#each data as link}
			<LinkWidget text={link.text} href={link.href} tab={link.tab} />
		{/each}
	</div>
</div>
