"use server";
const dictionaries = {
  en: () => import("./locales/en.json").then((module) => module.default),
  es: () => import("./locales/es.json").then((module) => module.default),
  fr: () => import("./locales/fr.json").then((module) => module.default),
};

export default async function getTranslation() {
  //const { defaultLang, error } = await getPreferredLang();
  const lang = await dictionaries?.["en"]?.();
  return {
    lang,
  };
}
