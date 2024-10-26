"use server";
import { createClient } from "@/lib/supabase";
export default async function getProfile() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return { data: null, error: null };
  }
  const { data: profile, error } = await supabase
    .from("profiles")
    .select()
    .match({ user_id: data?.user.id })
    .single();

  return { data: profile, error };
}
