"use client";
import getTranslation from "@/translation/getTranslation";
import { useQuery } from "@tanstack/react-query";
export default function useTranslation() {
  return useQuery({
    queryKey: ["lang"],
    queryFn: async () => {
      const langRes = await getTranslation();
      return langRes;
    },
  });
}
