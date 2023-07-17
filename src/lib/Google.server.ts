import {OAuth2Client} from "google-auth-library";
const client = new OAuth2Client();

export default async function serverLogin(token: string, clientId: string): Promise<LoggedIn|undefined> {
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: clientId
		});
		const rv = ticket.getPayload();
		return rv && {
			provider: 'google',
			email: rv.email!,
			firstName: rv.given_name,
			lastName: rv.family_name,
			verified: rv.email_verified,
			picture: rv.picture
		};
	} catch (e) { /* returns `undefined` */ }
}