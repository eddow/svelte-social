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

const en = {
	signin_with: "Sign in with %",
	signup_with: 'Sign up with %',
	continue_with: 'Continue with %',
	signin: 'Sign in'
};

export const defaultTexts: Dictionary = {
	'en-US': en,
	'en-UK': en,
	'fr-FR': {
		signin_with: "Se connecter avec %",
		signup_with: "S'enregistrer avec %",
		continue_with: 'Continuer avec %',
		signin: 'Se connecter'
	}
};

export function getLocalized(parm: string, key: keyof Locale, texts: Record<string, Locale> = defaultTexts, locale: string|null = null) {
	const langs = [...(locale?[locale]:[]), ...navigator.languages],
		dicGvn = [...langs, 'en-US'].find(l => texts[l]),
		dicDft = !dicGvn && langs.find(l => defaultTexts[l]);
	return (dicGvn?texts[dicGvn]:defaultTexts[dicDft||'en-US'])[key].replace('%', parm);
}