import { ui, defaultLang } from "../i18n/ui";

export function getLangFromUrl(url: URL | string): keyof typeof ui {
  let pathname = typeof url === "string" ? url : url.pathname;
  const [, lang] = pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(p0: string, p1: { symbol: string; }, key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: keyof typeof ui) {
  // Remove any existing language prefix
  const basePath = path.replace(/^\/[a-z]{2}\//, "/");
  // Add new language prefix (except for default language)
  return lang === defaultLang ? basePath : `/${lang}${basePath}`;
}

export function getAllLanguageUrls(path: string, siteUrl: string) {
  const urls = Object.keys(ui).map((lang) => {
    const localizedPath = getLocalizedPath(path, lang as keyof typeof ui);
    return {
      lang,
      url: new URL(localizedPath, siteUrl).href,
    };
  });

  return urls;
}
