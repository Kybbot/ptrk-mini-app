import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL | Location) {
	const [, lang] = url.pathname.split("/");
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function localizedUrl(url: URL, locale: string | undefined): URL {
	url = new URL(url);

	if (locale === "ru") {
		url.pathname = url.pathname.includes("ua") ? url.pathname.replace("/ua", "") : url.pathname;
		return url;
	} else {
		if (url.pathname.includes("ua")) {
			return url;
		} else {
			url.pathname = "/" + locale + url.pathname;
			return url;
		}
	}
}
