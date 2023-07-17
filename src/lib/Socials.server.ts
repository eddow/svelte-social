import googleLogin from "./Google.server.js";

export default async function serverLogin(lt: LoginToken, ids: SocialIds) {
	return lt.provider === 'google' ?
		await googleLogin((<GoogleToken>lt).token, ids.google) :
		undefined;
}