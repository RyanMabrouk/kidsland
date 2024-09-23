"use client";
import { useQuery } from "@tanstack/react-query";
import { translationQuery } from "./translationQuery";
export default function useTranslation() {
  return useQuery(translationQuery());
}
