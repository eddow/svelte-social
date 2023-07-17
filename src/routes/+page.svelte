<script lang="ts">
import Socials from '$lib/Socials.svelte';
import {clientIds} from './ids.ts';

let loggedIn: LoggedIn|null = null;
function token({detail}: CustomEvent) {
	fetch('', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(detail)
	}).then(res => {
		if(res.ok) {
			return res.json();
		}
		throw new Error('Log-in failure.');
	}).then(res => {
		loggedIn = <LoggedIn>res;
	}).catch(err => {
		console.error(err);
	});
}
</script>
<Socials ids={clientIds} on:token={token} style="width: 200px; border: 1px solid black;" />
{#if loggedIn}
	<p>Logged in with {loggedIn.provider} as {loggedIn.email}.</p>
	{#if loggedIn.verified !== undefined}
		<input type="checkbox" checked={loggedIn.verified} readonly disabled /> Verified
	{/if}
	{#if loggedIn.firstName !== undefined}
		<p>First name: {loggedIn.firstName}</p>
	{/if}
	{#if loggedIn.lastName !== undefined}
		<p>Last name: {loggedIn.lastName}</p>
	{/if}
	{#if loggedIn.picture !== undefined}
		<img src={loggedIn.picture} alt="Profile" />
	{/if}

{/if}