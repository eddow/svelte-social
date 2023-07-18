type SocialProvider = keyof SocialIds;

interface LoginToken {
	provider: SocialProvider;
}

interface LoggedIn {
	provider: SocialProvider;
	email: string;
	name?: string;
	picture?: string;
	verified?: boolean;
	firstName?: string;
	lastName?: string;
}
