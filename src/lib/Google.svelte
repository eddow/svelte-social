<script lang="ts">
	import { createEventDispatcher, afterUpdate } from "svelte";

	const dispatch = createEventDispatcher();
	let gglBtn: HTMLElement;
	export let
		clientId: string,
		type: 'standard' | 'icon' = 'standard',
		theme: 'outline' | 'filled_blue' | 'filled_black' = 'outline',
		size: 'small' | 'medium' | 'large' = 'medium',
		text: 'signin_with' | 'signup_with' | 'continue_with' | 'signin' = 'signin_with',
		shape: 'rectangular' | 'pill' | 'circle' | 'square' = 'pill',
		logo_alignment: 'left' | 'center' = 'left',
		width: string|undefined = undefined,
		locale: string|undefined = undefined;
	if(typeof google !== 'undefined') {
		afterUpdate(() => {
			const handleCredentialResponse = (response: any) => {
				dispatch('token', response.credential);
			};
			google.accounts.id.initialize({
				client_id: clientId,
				callback: handleCredentialResponse
			});
			google.accounts.id.prompt();
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
	<span style="display: inline-block;" bind:this={gglBtn}></span>
{/if}