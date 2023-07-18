declare namespace SvelteSocial {
	type Provider = keyof SvelteSocial.SocialIds;
	interface LoginToken {
		provider: SvelteSocial.Provider;
	}

	interface LoggedIn {
		provider: SvelteSocial.Provider;
		email: string;
		name?: string;
		picture?: string;
		verified?: boolean;
		firstName?: string;
		lastName?: string;
	}
}