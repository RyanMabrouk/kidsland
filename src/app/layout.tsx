import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Hydration from "@/provider/MainHydration";
import { ToastContainer, ToastProvider } from "@/hooks/useToast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Store from "@/provider/QCStore";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={lato.className + " min-h-screen"}>
        <Analytics />
        <SpeedInsights />
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
