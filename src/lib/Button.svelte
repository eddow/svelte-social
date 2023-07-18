<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { sizes, type Dictionary, getLocalized, defaultTexts } from './consts'

	const dispatch = createEventDispatcher();
	export let
		type: 'standard' | 'icon' = 'standard',
		theme: 'outline' | 'filled' | 'filled_black' = 'outline',
		size: 'small' | 'medium' | 'large' = 'medium',
		texts: Dictionary = defaultTexts,
		text: 'signin_with' | 'signup_with' | 'continue_with' | 'signin' = 'signin_with',
		shape: 'rectangular' | 'pill' = 'pill',
		// TODO: logo_alignment
		logo_alignment: 'left' | 'center' = 'left',
		width: string|undefined = undefined,
		locale: string|null = null,
		provider: string;
	let pxsz: number, style: string;
	$: pxsz = sizes[size];
	$: style = width ? `width: ${width};` : '';
	function click() {
		dispatch('click', provider);
	}
</script>

<div
	tabindex="0" role="button" aria-labelledby={provider+"-login-label"}
	{style} class={`login-button ${size} ${shape} ${theme} ${type} logo-${logo_alignment}`}
	on:click={click} on:keypress={click}
>
	<div class="content">
		<slot {pxsz} />
		{#if type === 'standard'}
			<div id={provider+"-login-label"} class="label">
				{getLocalized(provider, text, texts, locale)}
			</div>
		{/if}
	</div>
</div>

<style lang="scss" global>
	// TODO: Theme - plus add a parameter for the theme colour
	.social-logins.inline div[role="button"].login-button {
		display: inline-block;
	}
	div[role="button"].login-button {
		.label {
			margin-left: 8px;
		}
		&.rectangular {
			-webkit-border-radius: 4px;
			border-radius: 4px;
		}
		&.pill {
			-webkit-border-radius: 20px;
			border-radius: 20px;
		}
		.content {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-align-items: center;
			align-items: center;
			-webkit-flex-direction: row;
			flex-direction: row;
			justify-content: space-between;
			-webkit-flex-wrap: nowrap;
			flex-wrap: nowrap;
			height: 100%;
			position: relative;
			width: 100%;
			justify-content: center;
		}
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-webkit-transition: background-color .218s,border-color .218s;
		transition: background-color .218s,border-color .218s;
		-webkit-user-select: none;
		user-select: none;
		-webkit-appearance: none;
		appearance: none;
		background-color: #fff;
		background-image: none;
		border: 1px solid #dadce0;
		color: #3c4043;
		cursor: pointer;
		font-family: "Google Sans",arial,sans-serif;
		outline: none;
		overflow: hidden;
		position: relative;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		&.large {
			font-size: 14px;
			height: 40px;
			letter-spacing: 0.25px;
			&.standard {
				padding: 0 12px;
			}
		}
		&.medium {
			font-size: 14px;
			height: 32px;
			letter-spacing: 0.25px;
			&.standard {
				padding: 0 10px;
			}
			.label {
				font-family: "Google Sans",arial,sans-serif;
				font-weight: 500;
				overflow: hidden;
				text-overflow: ellipsis;
				vertical-align: top;
			}
		}
		&.small {
			font-size: 11px;
			height: 20px;
			letter-spacing: 0.3px;
			&.standard {
				padding: 0 8px;
			}
		}
	}
</style>