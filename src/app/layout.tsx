import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Hydration from "@/provider/hydration";
import Store from "@/provider/store";
import { ToastContainer, ToastProvider } from "@/hooks/useToast";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [],
  authors: [
    {
      name: "",
      url: "",
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className + " min-h-screen"}>
        <Store>
          <Hydration>
            <ToastProvider>
              <ToastContainer />
              {children}
            </ToastProvider>
          </Hydration>
        </Store>
      </body>
    </html>
  );
}
