import React from "react";
import { Nav } from "./ui/Nav/Nav";
import Footer from "./ui/Footer";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen flex-col overflow-x-hidden">
      <Nav />
      <main className="h-full min-h-screen w-full">{children}</main>
      <Footer />
    </div>
  );
}
