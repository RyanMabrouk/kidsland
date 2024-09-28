import React from "react";
import { redirect } from "next/navigation";
import getSession from "../../api/getSession";
import SideBar from "./ui/sideBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-full min-h-screen overflow-x-hidden">
        <SideBar />
      <main className="h-full min-h-screen w-full">{children}</main>
    </div>
  );
}
