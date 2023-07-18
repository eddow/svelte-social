interface SocialIds {
	google?: string;
}

interface GoogleToken extends LoginToken {
	provider: 'google';
	token: string;
}