# Socials

Provide applicaition IDs and use them directly through JS/TS.
The purpose is only to shorten the sign-up/log-in procedure, so this retrieves an email/name/avatar from a social network login.

SPA oriented: All social interractions happen through call-backs and pop-ups (no redirections)

Each provider has a `.svelte` and a `.server.ts` file, with a default export

## Client side

Either use each one separately (`Google`, `GitHub`, ...) providing its `clientId` or use the `Social` component providing its several `ids`

## Server side

Each `.server.ts` file exposes a default function who takes a token - each one defining its own LoginToken, given as the detail of the `token` event and returns the details of the connected person

## Execution flow

The component - either individual or `Socials` displays the login button. Once clicked and the account info filled, the `token` event is raised with the token info needed by the server.
- In the `token` event, the client must post/put/.../ that token (`event.detail`) to the server side
- The server side calls the default server exported function (`xxxLogin`) with the token and the id/ids of the application. (`ids` for `Socials`, `id` for individual ones)
- The return value is of type:
```ts
interface LoggedIn {	// Sorted from more probable to least probable
	provider: SocialProvider;
	email: string;
	name?: string;
	picture?: string;
	verified?: boolean;
	firstName?: string;
	lastName?: string;
}
```

## Auth page

Some providers need an authentication redirection.

These redirections sometimes are *forced* to be https - so configure your app accordingly
The page this authentication should render is this :
```html
<!-- +page.svelte -->
<script lang="ts">
	import { Auther } from '$lib/client.ts';
</script>
<Auther />
```
```ts
// +server.ts
export const prerender = true;
```

## Socials

This is a "all the socials" component who takes a dictionary `{social: id}`. Only socials having a specified id will be displayed.

## Providers

### Google

#### Attributes

The `Google` component has a `prompt` (`googlePrompt` for `Socials`) that indicates if the user must be proposed to log in with google on page load.

#### Registration

Create an [OAuth 2.0 Client ID](https://console.cloud.google.com/apis/credentials)
For localhost debugging, add both `localhost` and `localhost:[port]` as authorised origins.

### GitHub

#### Registration

Create an [OAuth App](https://github.com/settings/developers)
The authentication page should be available with https and configured in GitHub

## TODOs

* The generic `Button.svelte` does not use the `theme: 'outline' | 'filled' | 'filled_black'` nor `logo_alignment: 'left' | 'center'`.
* A windows `certs.cmd` equivalent
* A lot of other social networks have to be implemented - The basic common tools are coded and should be generic enough.

Please do not hesitate to PR your favorite social network!