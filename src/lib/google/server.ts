import {OAuth2Client} from "google-auth-library";
const client = new OAuth2Client();

export default async function serverLogin(lt: GoogleToken, clientId: string): Promise<LoggedIn|undefined> {
	try {
		console.assert(lt.provider === 'google', 'Invalid provider');
		const ticket = await client.verifyIdToken({
			idToken: lt.token,
			audience: clientId
		});
		const rv = ticket.getPayload();
		return rv && {
			provider: 'google',
			email: rv.email!,
			firstName: rv.given_name,
			lastName: rv.family_name,
			name: rv.name,
			verified: rv.email_verified,
			picture: rv.picture
		};
	} catch (e) { /* returns `undefined` */ }
}