"use server";
import { QueriesConfig } from "@/constants/QueriesConfig";
import { productByIdQuery } from "@/hooks/data/products/productByIdQuery";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import React from "react";
export default async function ProductByIdHydration({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const queryClient = new QueryClient(QueriesConfig);
  await Promise.all([
    queryClient.prefetchQuery(
      productByIdQuery({
        id,
      }),
    ),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
