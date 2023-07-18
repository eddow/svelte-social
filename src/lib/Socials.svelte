<script lang="ts">
	import GitHub from './GitHub/Button.svelte';
	import Google from './Google/Button.svelte';
	import { type Dictionary, defaultTexts } from './consts'
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
		texts: Dictionary = defaultTexts,
		text: 'signin_with' | 'signup_with' | 'continue_with' | 'signin' = 'signin_with',
		order: SocialProvider[] = [],
		googlePrompt: boolean = true,
		inline: boolean = false;
	let sClass = '', sStyle = '', cWidth: string | undefined, socialsList: SocialProvider[];
	export {sClass as class, sStyle as style};
	function token({detail}: CustomEvent) { dispatch('token', detail); }
	const dftWidth = {
		standard: '175px',
		icon: '30px'
	}
	$: cWidth = width || dftWidth[type];
	$: {
		socialsList = order.concat(['Google', 'GitHub']);
		(function() {
			let already: Record<SocialProvider, boolean> = {};
			socialsList = socialsList.filter(s => {
				if (already[s]) return false;
				already[s] = true;
				return true;
			});
		})();
	}
</script>
<div class={`social-logins ${sClass}${inline?' inline':''}`} style={sStyle}>
	{#each socialsList as social}
		{#if social==='Google'}
			<Google clientId={ids.Google} on:token={token} {type} theme={theme==='filled'?'filled_blue':theme} {size} {text} {shape} {logo_alignment}
				{locale} prompt={googlePrompt} width={cWidth} />
		{:else if social==='GitHub'}
			<GitHub clientId={ids.GitHub} on:token={token} {type} {theme} {size} {text} {shape} {logo_alignment} {locale} width={cWidth} />
		{/if}
	{/each}
</div>
<style lang="scss" global>
	.social-logins.inline {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}
</style>