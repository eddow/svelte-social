interface SocialIds {
	Google?: string;
}

interface GoogleToken extends LoginToken {
	provider: 'Google';
	token: string;
}