<script lang="ts">
	import { createEventDispatcher, afterUpdate } from "svelte";

	const dispatch = createEventDispatcher();
	let gglBtn: HTMLElement;
	export let
		/**
		 * Select wether to propose the user to select an account or not on page load.
		*/
		prompt: boolean = true,
		clientId: string|undefined,
		type: 'standard' | 'icon' = 'standard',
		theme: 'outline' | 'filled_blue' | 'filled_black' = 'outline',
		size: 'small' | 'medium' | 'large' = 'medium',
		text: 'signin_with' | 'signup_with' | 'continue_with' | 'signin' = 'signin_with',
		shape: 'rectangular' | 'pill' = 'pill',
		logo_alignment: 'left' | 'center' = 'left',
		width: string|undefined = undefined,
		locale: string = 'undefined';
	if(typeof google !== 'undefined') {
		afterUpdate(() => {
			const handleCredentialResponse = (response: any) => {
				dispatch('token', {provider: 'google', token: response.credential});
			};
			google.accounts.id.initialize({
				client_id: clientId!,
				callback: handleCredentialResponse
			});
			if(prompt) google.accounts.id.prompt();
			google.accounts.id.renderButton(gglBtn, {
				type, size, theme, text, shape, logo_alignment, width, locale
			});
		});
	}
</script>
<svelte:head>
	{#if clientId}
		<script src="https://accounts.google.com/gsi/client" async></script>
		<meta name="referrer" content="strict-origin-when-cross-origin" />
	{/if}
</svelte:head>
{#if clientId}
	<div class="login-button" bind:this={gglBtn}></div>
{/if}