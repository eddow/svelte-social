import { json, type RequestEvent } from "@sveltejs/kit";
import socialsLogin from "$lib/Socials.server.js";
import { clientIds } from "./ids.ts";

export async function POST(event: RequestEvent) {
	return json(await socialsLogin(await event.request.json(), clientIds));
}