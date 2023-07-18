declare namespace SvelteSocial {
	interface SocialIds {
		GitHub?: string;
	}

	interface SocialSecrets {
		GitHub?: string;
	}

	interface GitHubToken extends LoginToken {
		provider: 'GitHub';
		token: string;
	}
}