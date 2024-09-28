"use client";
import getTranslation from "./getTranslation";

export const translationClientQuery = () => {
  let locale = "fr";
  try {
    locale = localStorage.getItem("locale") ?? "";
  } catch (error) {
    console.error("Error getting locale from localStorage", error);
  }
  if (!["en", "fr"].includes(locale)) {
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
