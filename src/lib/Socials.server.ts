import googleLogin from "./Google/server";
import githubLogin from "./GitHub/server";

export default async function serverLogin(lt: SvelteSocial.LoginToken, ids: SvelteSocial.SocialIds, secrets: SvelteSocial.SocialSecrets) {
	return (<SvelteSocial.LoggedIn>await {
		Google: async ()=> await googleLogin(<SvelteSocial.GoogleToken>lt, ids.Google!),
		GitHub: async ()=> await githubLogin(<SvelteSocial.GitHubToken>lt, ids.GitHub!, secrets.GitHub!)
	}[lt.provider]?.()) ?? undefined;
}