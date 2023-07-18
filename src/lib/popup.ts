// Inspired by https://github.com/JureSotosek/github-oauth-popup

import { toQuery } from "./urls.ts";

// TODO: window.opener.postMessage() instead of PppWindow.resolveLogin

export interface PppWindow extends Window {
	resolveLogin?: (params: Record<string, string>) => void;
}

export function loginPopup(
	url: string,
	params: Record<string, string>,
	options: Record<string, string|number> = { height: 1000, width: 600 },
	id = 'oauth-authorize'
) {
	const query = url + '?' + toQuery(params, '&', encodeURIComponent);
	const popup = <PppWindow>window.open(query, id, toQuery(options, ','));
	if(!popup) throw new Error('Could not open popup window');
	let _iid: number|null = null;
	return new Promise((resolve, reject) => {
		function gotMessage({data}: MessageEvent) {
			resolve(data);
			close();
		}
		function close() {
			if (_iid) {
				clearInterval(_iid);
				_iid = null;
			}
			window.removeEventListener('message', gotMessage);
			popup.close();
		}
		window.addEventListener('message', gotMessage);
		_iid = setInterval(() => {
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