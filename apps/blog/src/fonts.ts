import localFont from "next/font/local";
import { IBM_Plex_Serif } from "next/font/google";

export const fontMono = localFont({
  src: "./berkeley-mono-regular.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const fontMonoBold = localFont({
  src: "./barkeley-mono-variable-regular.woff2",
  variable: "--font-mono-bold",
  display: "swap",
});

export const fontSerif = IBM_Plex_Serif({
  weight: ["600", "700"],
  subsets: ["latin"],
});
