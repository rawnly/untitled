import localFont from "next/font/local";

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
