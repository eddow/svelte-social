interface SocialIds {
	github?: string;
}

interface SocialSecrets {
	github?: string;
}

interface GitHubToken extends LoginToken {
	provider: 'github';
	token: string;
}