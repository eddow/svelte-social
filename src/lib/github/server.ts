import { fromQuery } from "$lib/urls.ts";

export default async function serverLogin(lt: GitHubToken, clientId: string, clientSecret: string): Promise<LoggedIn|undefined> {
	try {/*
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: clientId
		});
		const rv = ticket.getPayload();*/
		try {
			const bearing = await fetch('https://github.com/login/oauth/access_token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					client_id: clientId,
					client_secret: clientSecret,
					code: lt.token,
					accept: 'json'
				})
			});
			if(!bearing.ok) throw new Error('Log-in failure.');
			const bearingData = await bearing.formData(); //fromQuery(await bearing.text(), '&', decodeURIComponent);
			if(bearingData.get('error')) throw new Error(<string>bearingData.get('error'));
			const emails = await fetch('https://api.github.com/user', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + bearingData.get('access_token')
				}
			});
			if(!emails.ok) throw new Error('Log-in failure.');
			const rv = await emails.json();
			return rv && {
				provider: 'github',
				email: rv.email!,
				name: rv.name,
				picture: rv.avatar_url
			}
		} catch(err) {
			console.error(err);
		}
		/*
		return rv && {
			provider: 'google',
			email: rv.email!,
			firstName: rv.given_name,
			lastName: rv.family_name,
			verified: rv.email_verified,
			picture: rv.picture
		};*/
	} catch (e) { /* returns `undefined` */ }
}