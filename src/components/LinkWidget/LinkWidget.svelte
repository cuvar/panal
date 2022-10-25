<script lang="ts">
	export let text: string = 'Link';
	export let href: string = '#';
	export let tab: 'new' | 'same' = 'same';

	// ! this needs a web scraper from the backend
	// function getFavicon() {
	// 	const linkTags = document.querySelectorAll("[rel='icon']");
	// 	const faviconRefs = linkTags.forEach((linkTag) => {
	// 		if (linkTag.getAttribute('href') !== null) {
	// 			return linkTag.getAttribute('href');
	// 		}
	// 	});
	// <!-- todo: look in brave dev tools for how they do it

	// 	console.log(faviconRefs);
	// }
	const linkClass =
		'bg-teal-200 hover:bg-teal-300 text-black p-5 rounded-md w-full h-20 flex justify-center items-center';
</script>

{#if tab === 'new'}
	<a {href} target="_blank" rel="noopener noreferrer" class={linkClass}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
			/>
		</svg>
	</a>
{:else}
	<a {href} class={linkClass}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
			/>
		</svg>
	</a>
{/if}
<span class="text-sm w-full text-center">{text}</span>
