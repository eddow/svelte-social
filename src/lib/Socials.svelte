<script lang="ts">
	import Google from './Google.svelte';
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
		 * filled_blue  A blue-filled button theme:
		 * filled_black  A black-filled button theme:
		 */
		theme: 'outline' | 'filled_blue' | 'filled_black' = 'outline',

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
		shape: 'rectangular' | 'pill' | 'circle' | 'square' = 'pill',

		/**
		 * The alignment of the Google logo. The default value is left.
		 * This attribute only applies to the standard button type.
		 */
		logo_alignment: 'left' | 'center' = 'center',
		locale: string|undefined = undefined;
	let sClass = '', sStyle = '';
	export {sClass as class, sStyle as style};
	function googled({detail}: CustomEvent) { dispatch('token', {provider: 'google', token: detail}); }
</script>
<div class={["social", sClass]}, style={sStyle}>
	<Google clientId={ids.google} on:token={googled} {type} {theme} {size} {text} {shape} {logo_alignment} {locale} />
</div>
<style>
	.social {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}
</style>