
export default async function serverLogin(lt: SvelteSocial.GitHubToken, clientId: string, clientSecret: string): Promise<SvelteSocial.LoggedIn|undefined> {
	try {
		console.assert(lt.provider === 'GitHub', 'Invalid provider');
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
			const bearingData = await bearing.formData();
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
	} catch (e) { /* returns `undefined` */ }
}