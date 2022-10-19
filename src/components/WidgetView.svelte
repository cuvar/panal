<script lang="ts">
	import LinkWidget from './LinkWidget.svelte';
	import SearchWidget from './SearchWidget.svelte';
	import TimeWidget from './TimeWidget.svelte';

	const data: LinkData[] = [
		{
			text: 'GitHub',
			href: 'https://github.com/cuvar',
			tab: 'new'
		},
		{
			text: 'GCalendar',
			href: 'https://calendar.google.com/',
			tab: 'new'
		}
	];
</script>

<TimeWidget />
<SearchWidget />
<div class="grid grid-flow-col auto-cols-max gap-4 my-2">
	{#each data as link}
		<LinkWidget text={link.text} href={link.href} tab={link.tab} />
	{/each}
</div>
