import type { Config } from "tailwindcss";
import * as r from "@radix-ui/colors";

const scales = Array.from(new Array(12).fill(0).map((_, i) => i + 1));

const colors = Object.keys(r)
  .filter((k) => !(k.includes("Dark") || k.includes("P3") || k.includes("A")))
  .reduce(
    (acc, colorName) => ({
      ...acc,
      [colorName]: scales.reduce(
        (acc, scale) => ({
          ...acc,
          [scale]: `var(--${colorName}-${scale})`,
        }),
        {}
      ),
    }),
    {} as Record<string, Record<number, string>>
  );

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx}", "../../packages/ui/src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    colors: {
      ...colors,
      primary: colors.teal,
      neutral: colors.slate,
    },
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
