import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightRosePine from 'starlight-theme-rose-pine';

const projects = ['clientdata', 'habby', 'mcky.space', 'truck', 'writer'];

const topics = [
  {
    label: 'Setup',
    link: '/setup',
    icon: 'rocket',
    items: ['setup'],
  },
  {
    label: 'System',
    link: '/system/conventions',
    icon: 'information',
    items: [{ autogenerate: { directory: 'system' } }],
  },
  ...projects.map((proj) => ({
    label: proj,
    link: `/projects/${proj}/profile`,
    icon: 'document',
    items: [{ autogenerate: { directory: `projects/${proj}` } }],
  })),
];

export default defineConfig({
  output: 'static',
  integrations: [
    starlight({
      title: 'OKF Knowledge Base',
      description: 'Open Knowledge Framework — structured context for every project',
      plugins: [starlightRosePine(), starlightSidebarTopics(topics)],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/ktypez/OKF' },
      ],
    }),
  ],
});
