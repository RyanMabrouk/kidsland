"use server";
import { createClient } from "@/lib/supabase";
export default async function getProfile() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return { data: null, error: null };
  }
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .match({ user_id: session?.user.id })
    .single();
  return { data, error };
}
