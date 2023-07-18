export const sizes = {
	small: 10,
	medium: 14,
	large: 18
}
interface Locale {
	signin_with: string;
	signup_with: string;
	continue_with: string;
	signin: string;
}

export type Dictionary = Record<string, Locale>;

export const defaultTexts: Dictionary = {
	en: {
		signin_with: "Sign in with %",
		signup_with: 'Sign up with %',
		continue_with: 'Continue with %',
		signin: 'Sign in'
	}
};

export function getLocalized(parm: string, key: keyof Locale, texts: Record<string, Locale> = defaultTexts, locale = 'en') {
	return (texts[locale]||texts.en||defaultTexts.en)[key].replace('%', parm);
}