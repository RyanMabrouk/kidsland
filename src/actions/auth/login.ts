"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Login Error",
      },
    };
  }
  return { error: null };
}
