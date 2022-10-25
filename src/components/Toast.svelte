<script lang="ts">
	type ToastKind = 'error' | 'success' | 'info' | 'warning' | 'normal';
	type ToastColor =
		| { bg: 'bg-red-600'; text: 'text-white' }
		| { bg: 'bg-green-700'; text: 'text-white' }
		| { bg: 'bg-blue-600'; text: 'text-white' }
		| { bg: 'bg-yellow-500'; text: 'text-black' }
		| { bg: 'bg-gray-200'; text: 'text-black' };

	const toastMap: Record<ToastKind, ToastColor> = {
		error: { bg: 'bg-red-600', text: 'text-white' },
		success: { bg: 'bg-green-700', text: 'text-white' },
		info: { bg: 'bg-blue-600', text: 'text-white' },
		warning: { bg: 'bg-yellow-500', text: 'text-black' },
		normal: { bg: 'bg-gray-200', text: 'text-black' }
	};

	export let text = 'Error';
	export let kind: ToastKind = 'normal';
</script>

<div
	id=""
	class={`absolute bottom-16 bg-gray-200 text-black py-2 px-6 my-2 rounded-md ${toastMap[kind].bg} ${toastMap[kind].text}`}
>
	{text}
</div>
