import googleLogin from "./google/server.js";
import githubLogin from "./github/server.js";

export default async function serverLogin(lt: LoginToken, ids: SocialIds, secrets: SocialSecrets) {
	return {
		google: ()=> googleLogin(<GoogleToken>lt, ids.google!),
		github: ()=> githubLogin(<GitHubToken>lt, ids.github!, secrets.github!)
	}[lt.provider]?.() ?? undefined;
}