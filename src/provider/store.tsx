"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueriesConfig } from "@/constants/queries";
export default function Store({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient(QueriesConfig));
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
