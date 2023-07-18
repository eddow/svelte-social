import { json, error, type RequestEvent } from "@sveltejs/kit";
import { socialsLogin } from "$lib/server.ts";
import { clientIds } from "./ids.ts";
import { clientSecrets } from "./secrets.server.ts";

export async function POST(event: RequestEvent) {
	const rv = await socialsLogin(await event.request.json(), clientIds, clientSecrets);
	return rv ? json(rv) : error(401, "Unauthorized");
}