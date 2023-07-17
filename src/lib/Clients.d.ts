type SocialProvider = keyof SocialData;

interface LoginToken {
	provider: SocialProvider;
}

interface LoggedIn {
	provider: SocialProvider;
	email: string;
	verified?: boolean;
	firstName?: string;
	lastName?: string;
	picture?: string;
}
