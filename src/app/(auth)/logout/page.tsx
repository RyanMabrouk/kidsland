import { redirect } from "next/navigation";
import React from "react";
import getSession from "@/api/getSession";
export default async function Page() {
  const session = await getSession();
  if (session) redirect("/");
  return (
    <div className="relative flex max-h-screen max-w-screen flex-col">
      Logout
    </div>
  );
}
