import React from "react";
import Footer from "./ui/Footer";
import dynamic from "next/dynamic";
const ClientSideNav = dynamic(
  () => import("./ui/Nav/Nav").then((mod) => mod.Nav),
  {
    ssr: false,
  },
);
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen flex-col overflow-x-hidden">
      <ClientSideNav />
      <main className="h-full min-h-screen w-full">{children}</main>
      <Footer />
    </div>
  );
}
