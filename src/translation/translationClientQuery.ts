"use client";
import getTranslation from "./getTranslation";

export const translationClientQuery = () => {
  let locale = localStorage.getItem("locale");
  if (!["en", "fr"].includes(locale ?? "")) {
    locale = "fr";
  }
  return {
    queryKey: ["lang", locale],
    queryFn: async () => {
      const langRes = await getTranslation(locale as "en" | "fr");
      return langRes;
    },
  };
};
