import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'
import alpine from '@astrojs/alpinejs'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), alpine()]
});
