"use client";
import { tableType } from "@/types/database.tables.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
type optionsType = {
  event: "UPDATE" | "INSERT" | "DELETE" | "*";
  schema: string;
  table: tableType;
  filter?: string;
};
export default function useRealTime({
  filters,
  tableName,
  event = "*",
  onReceive,
}: {
  tableName: tableType;
  filters?: {
    column: string;
    value: string | number;
  }[];
  event?: "UPDATE" | "INSERT" | "DELETE" | "*";
  onReceive: (payload: any) => void;
}) {
  const supabase = createClientComponentClient();
  const channelName = tableName + "_" + event;
  const filterString = filters?.reduce(
    (acc, e, i) =>
      acc +
      `${e.column}=eq.${e.value}${i === filters?.length - 1 ? "" : " and "}`,
    "",
  );
  let options: optionsType = {
    event,
    table: tableName,
    schema: "public",
  };
  if (filterString) {
    options = {
      ...options,
      filter: filterString,
    };
  }
  useEffect(() => {
    const channel = supabase
      .channel(channelName)
      .on(
        // @ts-ignore : works perfectly <3
        "postgres_changes",
        options,
        onReceive,
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // dependencies are correctly set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName, event, filterString, onReceive, channelName, supabase]);
}
