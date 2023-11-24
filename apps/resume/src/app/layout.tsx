import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

import "@repo/tailwind-preset/colors.css";
import "./globals.css";
import { Providers } from "./providers";
import { fontMono } from "@/fonts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Federico Vitale - Resume",
  description: "Federico Vitale's resume",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          fontMono.variable,
          "font-sans bg-neutral-1",
        )}
      >
        <Providers>
          <div className="fixed top-0 z-50 w-full h-16 bg-gradient-to-b from-white to-transparent dark:from-neutral-1" />
          <div className="fixed bottom-0 z-50 w-full h-16 bg-gradient-to-t from-white to-transparent dark:from-neutral-1" />
          <main className="mx-auto p-8 my-8 max-w-5xl min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
