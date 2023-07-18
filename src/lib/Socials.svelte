<script lang="ts">
	import GitHub from './github/Button.svelte';
	import Google from './google/Button.svelte';
	import { createEventDispatcher, afterUpdate } from "svelte";

	const dispatch = createEventDispatcher();
	export let
		ids: SocialIds,
		/**
		 * The button type: icon, or standard button.
		 */
		type: 'standard' | 'icon' = 'icon',

		/**
		 * The button theme. For example, filled_blue or filled_black.
		 * outline  A standard button theme:
		 * filled  A theme-filled button theme:
		 * filled_black  A black-filled button theme:
		 */
		theme: 'outline' | 'filled' | 'filled_black' = 'outline',

		/**
		 * The button size. For example, small or large.
		 */
		size: 'small' | 'medium' | 'large' = 'medium',

		/**
		 * The button text. The default value is signin_with.
		 * There are no visual differences for the text of icon buttons that
		 * have different text attributes. The only exception is when the
		 * text is read for screen accessibility.
		 *
		 * signin_with  The button text is “Sign in with Google”:
		 * signup_with  The button text is “Sign up with Google”:
		 * continue_with  The button text is “Continue with Google”:
		 * signup_with  The button text is “Sign in”:
		 */
		text: 'signin_with' | 'signup_with' | 'continue_with' | 'signin' = 'signin_with',

		/**
		 * The button shape. The default value is rectangular.
		 */
		shape: 'rectangular' | 'pill' = 'pill',

		width: string|undefined = undefined,
		/**
		 * The alignment of the Google logo. The default value is left.
		 * This attribute only applies to the standard button type.
		 */
		logo_alignment: 'left' | 'center' = 'center',
		locale: string|undefined = undefined,
		googlePrompt: boolean = true,
		inline: boolean = false;
	let sClass = '', sStyle = '', cWidth: string | undefined;
	export {sClass as class, sStyle as style};
	function token({detail}: CustomEvent) { dispatch('token', detail); }
	const dftWidth = {
		standard: '175px',
		icon: '30px'
	}
	$: cWidth = width || dftWidth[type];
</script>
<div class={`social-logins ${sClass}${inline?' inline':''}`} style={sStyle}>
	<Google clientId={ids.google} on:token={token} {type} theme={theme==='filled'?'filled_blue':theme} {size} {text} {shape} {logo_alignment}
		{locale} prompt={googlePrompt} width={cWidth} />
	<GitHub clientId={ids.github} on:token={token} {type} {theme} {size} {text} {shape} {logo_alignment} {locale} width={cWidth} />
</div>
<style lang="scss" global>
	.social-logins.inline {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}
</style>