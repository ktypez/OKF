import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sidebar from './src/data/sidebar.json';

export default defineConfig({
  output: 'static',
  integrations: [
    starlight({
      title: 'OKF Knowledge Base',
      description: 'Open Knowledge Framework — structured context for every project',
      customCss: ['./src/styles/starlight-theme.css'],
      sidebar,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/ktypez/OKF' },
      ],
    }),
  ],
});
