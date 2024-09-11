"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default async function signInWithOAuth({
  provider,
}: {
  provider: Provider;
}) {
  const supabase = createServerActionClient({ cookies });

  const headersList = headers();
  const header_url = headersList.get("host") || "";
  const proto = headersList.get("x-forwarded-proto") || "http";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${proto}://${header_url}/auth/callback`,
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
  redirect(data?.url);
  
  
}
