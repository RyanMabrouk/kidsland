"use server";
import { QueriesConfig } from "@/constants/QueriesConfig";
import orderByIdQuery from "@/hooks/data/orders/orderByIdQuery";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import React from "react";
export default async function OrderByIdHydration({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) {
  const queryClient = new QueryClient(QueriesConfig);
  await Promise.all([queryClient.prefetchQuery(orderByIdQuery(id))]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
