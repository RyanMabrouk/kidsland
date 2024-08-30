"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
export default async function signUp({
  firstName,
  lastName,
  tel,
  email,
  password,
}: {
  firstName: string | null;
  lastName: string | null;
  tel: string | null;
  email: string;
  password: string;
}) {
  const headersList = headers();
  const header_url = headersList.get("host") || "";
  const proto = headers().get("x-forwarded-proto") || "http";
  const options = {
    data: {
      firstName,
      lastName,
      tel,
    },
    emailRedirectTo: `${proto}://${header_url}/auth/callback`,
  };
  const supabase = createServerActionClient({ cookies });
  const { data, error: signUpErr } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: options,
  });
  if (signUpErr) {
    return {
      error: { message: signUpErr?.message, type: "SignUp Error" },
    };
  }
  if (data?.user?.identities?.length === 0) {
    return {
      error: { message: "You already have an account", type: "SignUp Error" },
    };
  }
  return { data, error: null };
}
