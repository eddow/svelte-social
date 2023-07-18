// Inspired by https://github.com/JureSotosek/github-oauth-popup

let closeAlreadyOpened: (()=> void)|null = null;

export function toQuery(params: Record<string, string|number>, separator: string, encode = (x:string|number)=>x) {
	return Object.entries(params).map(([key, value]) => `${key}=${encode(value)}`).join(separator);
}

export function loginPopup(
	url: string,
	params: Record<string, string>,
	options: Record<string, string|number> = { height: 1000, width: 600 },
	id = 'oauth-authorize'
) {
	const query = url + '?' + toQuery(params, '&', encodeURIComponent);
	const popup = window.open(query, id, toQuery(options, ','));
	if(!popup) throw new Error('Could not open popup window');
	let interval: number|null = null;
	if(closeAlreadyOpened) {
		closeAlreadyOpened();
		closeAlreadyOpened = null;
	}
	return new Promise((resolve, reject) => {
		function gotMessage({data}: MessageEvent) {
			resolve(
				data.slice(1).split("&")
					.reduce((v: Record<string, string>, param: string)=> {
						const [key, value] = param.split("=");
						return {...v, [key]: decodeURIComponent(value)};
				}, {})
			);
			close();
		}
		function close() {
			if (interval) {
				clearInterval(interval);
				interval = null;
			}
			window.removeEventListener('message', gotMessage);
			popup!.close();
		}
		closeAlreadyOpened = close;
		window.addEventListener('message', gotMessage);
		interval = setInterval(() => {
			try {
				if (!popup || popup.closed !== false) {
					close();
					reject(new Error('The popup was closed'));
					return;
				}
			} catch (error) { /* ignore */ }
		}, 500);
	});
}