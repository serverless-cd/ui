import { defineConfig } from 'dumi';

export default defineConfig({
  // outputPath: 'docs-dist',
  themeConfig: {
    name: 'serverless-cd Design',
    rtl: true,
    socialLinks: {
      github: 'https://github.com/serverless-cd/ui',
    },
    nav: [
      { title: '组件', link: '/components/dingtalk' },
      // { title: '指引', link: '/guide' }
    ],
    sidebar: {
      '/guide': [],
    },
    footer:
      'Open-source MIT Licensed | Copyright © 2023 \n Powered by 云原生前端团队',
  },
});
