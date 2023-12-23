import preset from "@repo/tailwind-preset";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Berkeley Mono"],
      }
    },
  },
  plugins: [],
  presets: [preset]
}
