"use server";

import getData from "@/api/getData";
import getSession from "@/api/getSession";

const dictionaries = {
  en: () => import("./locales/en.json").then((module) => module.default),
  fr: () => import("./locales/fr.json").then((module) => module.default),
};

export default async function getTranslation(locale: "en" | "fr") {
  const { session } = await getSession();
  let default_language = await getData({
    tableName: "profiles",
    column: "default_language",
    match: { user_id: session?.user.id },
  }).then((res) => res.data?.[0]?.default_language);
  default_language = default_language ?? locale;
  const lang = await dictionaries?.[default_language]?.();
  return { lang, default_language };
}
