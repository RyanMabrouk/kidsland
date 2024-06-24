import React from "react";
import { redirect } from "next/navigation";
import getSession from "../../api/getSession";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await getSession();
  if (!session) redirect("/login");
  return (
    <div className="flex h-full min-h-screen flex-col overflow-x-hidden">
      <main className="h-full min-h-screen w-full ">{children}</main>
    </div>
  );
}
