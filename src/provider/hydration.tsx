import { QueriesConfig } from "@/constants/QueriesConfig";
import { cartPopulatedQuery } from "@/hooks/data/cart/cartPopulatedQuery";
import { productsQuery } from "@/hooks/data/products/productsQuery";
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
  await Promise.all([
    queryClient.prefetchQuery(
      productsQuery({
        page: 1,
        limit: 8,
        sort: {
          column: "discount",
          ascending: false,
        },
      }),
    ),
    //   queryClient.prefetchQuery(translationQuery()),
    queryClient.prefetchQuery(cartPopulatedQuery()),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
