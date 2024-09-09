"use server";
import { Tables } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function getProfile() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session?.user.id);
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", session?.user.id)
    .single();
  return { data, error };
}
