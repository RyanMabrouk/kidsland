"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Provider } from "@supabase/supabase-js";

export default async function signInWithOAuth({
  provider,
}: {
  provider: Provider;
}) {
  const supabase = createServerActionClient({ cookies });

  const headersList = headers();
  const headerUrl = headersList.get("host") || "";
  const proto = headersList.get("x-forwarded-proto") || "http";

  const redirectTo = `${proto}://${headerUrl}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });

  if (error) {
    return {
      error: {
        message: error.message,
        type: `${provider} provider Error`,
      },
    };
  }

  return { data, error: null };
}