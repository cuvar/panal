<script lang="ts">
	import LinkWidget from './LinkWidget.svelte';
	import LinkContainer from './LinkContainer.svelte';

	let data: LinkData[] = [
		{
			text: 'GitHub',
			href: 'https://github.com/cuvar',
			tab: 'new'
		},
		{
			text: 'Google Calendar',
			href: 'https://calendar.google.com/',
			tab: 'new'
		},
		{
			text: 'Panal repo',
			href: 'https://github.com/cuvar/panal',
			tab: 'new'
		}
	];

	function addLink(e: MouseEvent) {
		// <!-- todo functionality
		data = [
			...data,
			{
				text: 'New Link',
				href: 'https://example.com',
				tab: 'new'
			}
		];
	}
</script>

<div
	class="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3 lg:grid-cols-6 lg:grid-rows-2 xl:grid-cols-6 xl:grid-rows-2 gap-4 my-2"
>
	{#each data as link}
		<LinkContainer>
			<LinkWidget text={link.text} href={link.href} tab={link.tab} />
		</LinkContainer>
	{/each}
	{#if data.length < 12}
		<LinkContainer>
			<button
				class="bg-gray-200 text-black rounded-md w-full h-20 flex justify-center items-center"
				on:click={addLink}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</button>
			<span class="text-sm w-full text-center">Add Link</span>
		</LinkContainer>
	{/if}
</div>
