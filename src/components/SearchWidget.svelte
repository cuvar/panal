<script lang="ts">
	interface EngineData {
		key: 'google' | 'duckduckgo' | 'ecosia' | 'gdrive';
		displayName: string;
		url: string;
	}

	const engines: EngineData[] = [
		{
			key: 'ecosia',
			displayName: 'Ecosia',
			url: 'https://www.ecosia.org/search?q='
		},
		{
			key: 'google',
			displayName: 'Google',
			url: 'https://google.com/search?q='
		},
		{
			key: 'duckduckgo',
			displayName: 'DuckDuckGo',
			url: 'https://duckduckgo.com/?q='
		},
		{
			key: 'gdrive',
			displayName: 'Google Drive',
			url: 'https://drive.google.com/drive/search?q='
		}
	];

	export let currentEngine: EngineData['key'] = 'ecosia';

	let engineLink: string;
	let searchString: string = '';
	updateEngine();

	function updateEngine() {
		const selectedEngine = engines.find((e) => e.key === currentEngine) ?? engines[0];
		engineLink = selectedEngine.url;
	}

	function handleSearch() {
		const input = document.querySelector('input');
		if (!input) return;

		searchString = engineLink + input.value.trim();
		if (engineLink === searchString) console.warn('No search string provided');
	}

	window.addEventListener('keydown', (e) => {
		if (e.metaKey && e.key === 'k') {
			const input: HTMLInputElement | null = document.querySelector('#searchbar');
			if (!input) return;
			input.focus();
		}
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSearch();
			setTimeout(() => {
				document.getElementById('searchButton')?.click();
			}, 50);
		} else if (event.key === 'Escape') {
			const input = document.querySelector('input');
			if (!input) return;

			input.value = '';
			searchString = '';
		} else if (event.shiftKey && event.key === 'Tab') {
			event.preventDefault();
			selectNextEngine();
		}
	}

	function selectNextEngine() {
		const index = engines.findIndex((e) => e.key === currentEngine);
		const nextIndex = index + 1 >= engines.length ? 0 : index + 1;
		currentEngine = engines[nextIndex].key;
		updateEngine();
	}

	function searchWithEngine(chosenEngine: EngineData['key']) {
		currentEngine = chosenEngine;
		updateEngine();
	}

	function setOutline(useOutline: boolean) {
		const inputContainer: HTMLDivElement | null = document.querySelector('#searchbar-container');
		if (!inputContainer) return;
		if (useOutline) {
			inputContainer.classList.add('outline');
			inputContainer.classList.add('outline-2');
			inputContainer.classList.add('outline-panal-100');
		} else {
			inputContainer.classList.remove('outline');
			inputContainer.classList.add('outline');
			inputContainer.classList.add('outline-2');
		}
	}
</script>

<div class="flex flex-col mt-2 mb-8 w-fit">
	<div
		class="bg-white rounded-full flex justify-between items-center my-2"
		id="searchbar-container"
	>
		<a
			href={searchString}
			target="_blank"
			id="searchButton"
			rel="noopener noreferrer"
			class="text-black pl-2 "
			on:click={handleSearch}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-8 h-8 pr-2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
		</a>
		<input
			type="text"
			id="searchbar"
			class="rounded-r-full w-full pr-1 py-2 text-black focus:outline-none"
			placeholder="Search"
			on:keydown={handleKeyDown}
			on:focusout={() => setOutline(false)}
			on:focusin={() => setOutline(true)}
		/>
		<kbd class="font-sans font-semibold text-slate-500 pl-2 text-xs flex pr-4">
			<abbr title="Command" class="no-underline">⌘</abbr> K
		</kbd>
	</div>
	<div class="flex space-x-2">
		{#each engines as singleEngine}
			{#if singleEngine.key == currentEngine}
				<button
					class="rounded-md p-1 px-2 text-xs text-white bg-panal-200 hover:bg-panal-300 active:bg-panal-400"
					on:click={() => searchWithEngine(singleEngine.key)}>{singleEngine.displayName}</button
				>
			{:else}
				<button
					class="rounded-md p-1 px-2 text-xs text-black bg-gray-100 hover:bg-gray-300 active:bg-gray-400"
					on:click={() => searchWithEngine(singleEngine.key)}>{singleEngine.displayName}</button
				>
			{/if}
		{/each}
	</div>
</div>
