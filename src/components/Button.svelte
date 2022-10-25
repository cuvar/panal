<script lang="ts">
	export let handler: () => void;
	export let className: string = '';
</script>

<button
	on:click={handler}
	class={`py-2 px-4 text-white border border-white hover:border-transparent hover:bg-panal-100 active:bg-panal-200 rounded-md ${className}`}
	><slot /></button
>
