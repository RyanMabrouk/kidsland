import getTranslation from "./getTranslation";

export const translationQuery = () => ({
  queryKey: ["lang"],
  queryFn: async () => {
    const langRes = await getTranslation();
    return langRes;
  },
});
