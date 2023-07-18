<script lang="ts">
import { Socials } from '$lib/client.ts';
import { clientIds } from './ids.ts';

let loggedIn: LoggedIn|null = null;
async function token({detail}: CustomEvent) {
	try {
		const ssLogin = await fetch('', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(detail)
		});
		if(!ssLogin.ok) throw new Error('Log-in failure.');
		loggedIn = await ssLogin.json();
	} catch(err) {
		console.error(err);
	}
}
</script>
<Socials inline ids={clientIds} on:token={token} style="width: 400px; border: 1px solid black;" googlePrompt={false} />
{#if loggedIn}
	<p>Logged in with {loggedIn.provider} as {loggedIn.email}.</p>
	{#if loggedIn.verified !== undefined}
		<input type="checkbox" checked={loggedIn.verified} readonly disabled /> Verified
	{/if}
	{#if loggedIn.name !== undefined}
		<p>Name: {loggedIn.name}</p>
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