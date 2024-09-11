import getSession from "@/api/getSession";
import LoginForm from "@/app/(auth)/login/components/LoginForm";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const { session, error } = await getSession();
  console.log(session?.user.id);
  if (session) redirect("/home");
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Content */}
      <div className="z-10 w-full">
        <LoginForm />
      </div>
    </div>
  );
}
