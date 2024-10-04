"use server";
import { QueriesConfig } from "@/constants/QueriesConfig";
import { translationQuery } from "@/translation/translationQuery";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import React from "react";
export default async function Hydration({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient(QueriesConfig);
  // await Promise.all([
  //   queryClient.prefetchQuery(translationQuery("fr")),
  //   queryClient.prefetchQuery(translationQuery("en")),
  // ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
