import { QueriesConfig } from "@/constants/QueriesConfig";
import { cartPopulatedQuery } from "@/hooks/data/cart/cartPopulatedQuery";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import React from "react";
export default async function CartHydration({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient(QueriesConfig);
  await Promise.all([queryClient.prefetchQuery(cartPopulatedQuery())]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
