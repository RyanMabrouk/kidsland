"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function getProfile() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", session?.user.id)
    .single();
  return { data, error };
}
