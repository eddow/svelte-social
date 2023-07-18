# svelte-social

Provide applicaition IDs and use them directly through JS/TS.
The purpose is only to shorten the sign-up/log-in procedure, so this retrieves an email/name/avatar from a social network login.

SPA oriented: All social interractions happen through call-backs and pop-ups (no redirections at usage)

Each provider has a `.svelte` and a `.server.ts` file, with a default export.

> Note: The library is made with SvelteKit but does not need it to be functional

## Usage

### Execution flow

The component - either individual or `Socials` displays the login button(s). Once clicked and the account information filled, the `token` event is raised with the token info needed by the server.
- In the `token` event of that component, the client must post/put/.../ that token (`event.detail`) to the server side to a custom-made login controller
- The server side calls the default server exported function (`xxxLogin`) with the token, the id(s) of the application and the secret(s) if needed. (`ids`/`secrets` for `Socials`, `id`/[`secret`] for individual ones)
- The return value is of type:
```ts
interface SvelteSocial.LoggedIn {	// Sorted from more probable to least probable
	provider: SvelteSocial.Provider; // Name of the provider
	email: string;
	name?: string;
	picture?: string;	// URL
	verified?: boolean;
	firstName?: string;
	lastName?: string;
}
```

### Client side

Either use each one separately (`Google`, `GitHub`, ...) providing its `clientId` or use the `Social` component providing its several `ids`

```html
<script lang="ts">
import { Socials, Google } from "svelte-social";
import { clientIds } from './ids';

async function token({detail}: CustomEvent) {
	try {
		// `detail` contains a provider-dependant token structure as well as the provider specification
		const ssLogin = await fetch('', {	// POST to our server
			method: 'POST',
			body: JSON.stringify(detail)
		});
		if(!ssLogin.ok) throw new Error('Log-in failure.');
		// ... await ssLogin.json();
	} catch(err) {
		console.error(err);
	}
}
</script>
<Socials ids={clientIds} on:token={token} />
-- or --
<Google id={clientIds.Google} on:token={token} />
```

### Server side

Each `...Login` function takes a `LoginToken` given as the detail of the `token` event (provider-dependant) and returns the details of the connected person

```ts
import { /* ..., */type RequestEvent } from "@sveltejs/kit";
import { login, googleLogin } from "svelte-social";
import { clientIds } from "./ids";
import { clientSecrets } from "./secrets.server";

// This is the request fetched manually in the client
export async function POST(event: RequestEvent) {
	const loggedIn: SvelteSocial.LoggedIn = await login(await event.request.json(), clientIds, clientSecrets);	// Select the login procedure knowing the provider
	// or //
	const loggedIn: SvelteSocial.LoggedIn = await googleLogin(await event.request.json(), clientIds.Google);	// google login does not need a secret
	// loggedIn contains at least the provider and the email
	// return loggedIn ? json(loggedIn) : error(401, "Unauthorized");
}
```

### Auth page

Some providers need an authentication redirection.

> These redirections sometimes are *forced* to be https - so configure your app accordingly.

The page this authentication should render is static :
```html
<!-- +page.svelte -->
<script lang="ts">
	import { Auther } from "svelte-social";
</script>
<Auther />
```
```ts
// +server.ts
export const prerender = true;
```

> If you don't use SvelteKit, you can achieve the same with any other framework, or just copy the really short code from `src/lib/Auther.svelte`

Check the `vite.config.js` file of the demo to configure your application

## Running the demo

Just looking at the source code should be quite self-explainatory. In order to have it work:

```sh
npm i
npm run certificates
npm run dev
```

`local.dev` should resolve to `127.0.0.1`
## Socials

This is a "all the socials" component who takes a dictionary `{social: id}`. Only socials having a specified id will be displayed.

All the presentation properties (inspired by the Google widget) are available and applied to each button.

### Properties

- `inline`: Displays buttons on a line rather than on a column
- `order`: Gives a list of providers to display first. (example: `['GitHub', 'Google']`) The providers who are not given but have a specified ID will be placed after in their default order

### Common properties to all social buttons
- `type: 'standard' | 'icon' = 'icon'`
- `theme: 'outline' | 'filled' | 'filled_black' = 'outline'`
	* `outline`	A standard button theme
	* `filled`	A theme-filled button theme
	* `filled_black`	A black-filled button theme
- `size: 'small' | 'medium' | 'large' = 'medium'`
- `shape: 'rectangular' | 'pill' = 'pill'`
	* The button shape (corner-rounding)
- `width: string|undefined = undefined`
	* CSS-specification (`100px`, `42em`)
- `logo_alignment: 'left' | 'center' = 'center'`
	* The alignment of the Google logo. The default value is left.
	* This attribute only applies to the standard button type.

### Texts
Some providers (ex. Google) have a translation functionality - this functionality has been extended so that all have it
- `text: 'signin_with' | 'signup_with' | 'continue_with' | 'signin' = 'signin_with'`
	* This is used to chose which text to display
	* signin_with	The button text is “Sign in with SomeProvider
	* signup_with	The button text is “Sign up with SomeProvider
	* continue_with	The button text is “Continue with SomeProvider”
	* signup_with	The button text is “Sign in”
- `locale: string|null = null`
	* Locale like 'en-US' of 'fr-FR'
	* If none is given, the navigator' one is used and 'en-US' if no texts are found
- `texts: Dictionary = defaultTexts`
	* `{locale: {key: text}}`
		* `locale`: 'en-US', 'fr-FR', ...
		* `key`: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
		* `text` “Do something with %" (The `%` character is replaced by the name of the provider)

> Note: Only `en-US`, `en-UK` and `fr-FR` are provided - don't hesitate to PR your prefered languages in `src/lib/consts.ts`
		
## Providers

### Google

#### Attributes

The `Google` component has a `prompt` (forwarded from `googlePrompt` of the `Socials` component) that indicates if the user must be proposed to log in with google on page load.

#### Registration

Create an [OAuth 2.0 Client ID](https://console.cloud.google.com/apis/credentials)
For localhost debugging, add both `localhost` and `localhost:[port]` as authorised origins.

### GitHub

#### Registration

Create an [OAuth App](https://GitHub.com/settings/developers)
The authentication page should be available with https and configured in GitHub

## TODOs

* The generic `Button.svelte` does not use the `theme: 'outline' | 'filled' | 'filled_black'` nor `logo_alignment: 'left' | 'center'`.
* A windows `certs.cmd` equivalent
* `svelte-social/client` and `svelte-social/server` are not recognised by VSCode
* A lot of other social networks have to be implemented.

> Please do not hesitate to PR your favorite social network!
> 
> The foundations are done (the generic `Button` and the generic popup if redirection is needed)

### Networks

- [x] Google
- [x] GitHub
- [ ] LinkedIn
- [ ] Facebook
- [ ] ...