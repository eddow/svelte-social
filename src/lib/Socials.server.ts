import googleLogin from "./Google/server.ts";
import githubLogin from "./GitHub/server.ts";

export default async function serverLogin(lt: LoginToken, ids: SocialIds, secrets: SocialSecrets) {
	return {
		Google: ()=> googleLogin(<GoogleToken>lt, ids.Google!),
		GitHub: ()=> githubLogin(<GitHubToken>lt, ids.GitHub!, secrets.GitHub!)
	}[lt.provider]?.() ?? undefined;
}