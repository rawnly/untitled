"use client";

import { ThemeProvider } from "next-themes";
import { PHProvider } from "./posthog-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider>
      <ThemeProvider forcedTheme="dark" enableSystem attribute="class">
        {children}
      </ThemeProvider>
    </PHProvider>
  );
}
