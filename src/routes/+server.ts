import { json, error, type RequestEvent } from "@sveltejs/kit";
import { socialsLogin } from "svelte-social/server.ts";
import { clientIds } from "./ids.ts";
import { clientSecrets } from "./secrets.server.ts";

export async function POST(event: RequestEvent) {
	const loggedIn = await socialsLogin(await event.request.json(), clientIds, clientSecrets);
	return loggedIn ? json(loggedIn) : error(401, "Unauthorized");
}