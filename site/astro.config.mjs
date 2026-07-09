import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightRosePine from 'starlight-theme-rose-pine';
import sidebar from './src/data/sidebar.json';

export default defineConfig({
  output: 'static',
  integrations: [
    starlight({
      title: 'OKF Knowledge Base',
      description: 'Open Knowledge Framework — structured context for every project',
      sidebar,
      plugins: [starlightRosePine()],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/ktypez/OKF' },
      ],
    }),
  ],
});
