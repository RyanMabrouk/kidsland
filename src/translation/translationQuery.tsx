import getTranslation from "./getTranslation";

export const translationQuery = (locale: "en" | "fr") => ({
  queryKey: ["lang", locale],
  queryFn: async () => {
    const langRes = await getTranslation(locale);
    return langRes;
  },
});
