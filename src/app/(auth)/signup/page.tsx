import React from "react";
import getSession from "@/api/getSession";
import { redirect } from "next/navigation";
import Form from "./form";
export default async function Page() {
  const { session } = await getSession();
  if (session) redirect("/home");
  return (
    <div className="relative flex h-screen w-screen flex-col overflow-x-hidden scroll-smooth">
      <Form />
    </div>
  );
}
