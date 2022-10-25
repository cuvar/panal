<script lang="ts">
	import Button from 'comp/Button.svelte';
	import Toast from 'comp/Toast.svelte';
	import WidgetView from 'comp/WidgetView.svelte';
	import { onMount } from 'svelte';
	import { getTokenFromCookie, verifyPassword, verifyToken } from '../utils/auth';

	let user = '';
	let pwd = '';
	const COOKIE_NAME = 'panal_s';
	let sesh: boolean = false;
	let showToast = false;
	let barText = '';

	function toggleMessageToast(msg: string) {
		barText = msg;
		showToast = true;

		setTimeout(() => {
			showToast = false;
		}, 1000);
	}

	async function passwordAuth() {
		sesh = await verifyPassword(user, pwd, COOKIE_NAME);
		if (!sesh) {
			toggleMessageToast('Wrong credentials');
			pwd = '';
			return;
		}
		user = '';
		pwd = '';
	}

	async function tokenAuth() {
		const token = getTokenFromCookie(COOKIE_NAME);

		if (token !== '') {
			sesh = await verifyToken(token);
		}
	}

	function logout() {
		sesh = false;
		document.cookie = 'panal_s=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	}

	onMount(tokenAuth);
</script>

{#if sesh}
	<div class="w-full flex justify-end mt-4">
		<Button handler={logout} className="">
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
					d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
				/>
			</svg>
		</Button>
	</div>
	<WidgetView />
{:else}
	<div class="flex flex-col space-y-2 justify-center h-full">
		<input
			placeholder="username"
			bind:value={user}
			class="text-black rounded-sm p-2"
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					passwordAuth();
				}
			}}
		/>
		<input
			placeholder="password"
			bind:value={pwd}
			class="text-black rounded-sm p-2"
			type="password"
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					passwordAuth();
				}
			}}
		/>
		<Button handler={async () => await passwordAuth()}>Login</Button>
	</div>
	{#if showToast}
		<Toast text={barText} kind="error" />
	{/if}
{/if}
