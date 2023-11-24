import * as r from "@radix-ui/colors";
import type { PresetsConfig } from "tailwindcss/types/config";

const scales = Array.from(new Array(12).fill(0).map((_, i) => i + 1));

export const colors: any = Object.keys(r)
  .filter((k) => !(k.includes("Dark") || k.includes("P3") || k.includes("A")))
  .reduce(
    (acc, colorName) => ({
      ...acc,
      [colorName]: scales.reduce(
        (acc, scale) => ({
          ...acc,
          [scale]: `var(--${colorName}-${scale})`,
        }),
        {},
      ),
    }),
    {},
  );

export default {
  darkMode: "class",
  theme: {
    colors: {
      ...colors,
      primary: colors.teal,
      neutral: colors.slate,
      transparent: "rgba(0,0,0,0)",
      black: "#000",
      white: "#fff",
    },
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies PresetsConfig;
