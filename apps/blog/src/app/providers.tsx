"use client";

import { ThemeProvider } from "next-themes";
import { PHProvider } from "@repo/ui/analytics";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider>
      <ThemeProvider enableSystem attribute="class">
        {children}
      </ThemeProvider>
    </PHProvider>
  );
}
