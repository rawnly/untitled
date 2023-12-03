import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feedback - Federico Vitale",
  description: "Feedback for Federico Vitale",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-neutral-1")}>
        <Providers>
          <nav className="flex sticky top-0 gap-4 justify-start items-center py-4 px-8 navbar z-[9999]">
            <div className="inset-0 z-50 aboslute">
              <Link
                href="https://untitled.dev"
                className="hover:opacity-50 active:opacity-25"
              >
                <h1 className="-mb-1.5 text-2xl font-bold">untitled.dev</h1>
                <small className="text-xs">by Federico Vitale</small>
              </Link>
            </div>
          </nav>
          <div className="flex flex-col gap-8 py-24 px-4 md:px-12">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
