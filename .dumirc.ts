import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'code',
  themeConfig: {
    name: 'serverless-cd/ui',
    logo: '/logo.png',
    rtl: true,
    socialLinks: {
      github: 'https://github.com/serverless-cd/ui',
    },
    nav: [{ title: '组件', link: '/components/dingtalk' }],
    sidebar: {
      '/guide': [],
    },
    footer:
      'Open-source MIT Licensed | Copyright © 2023 \n Powered by 云原生前端团队',
  },
  title: 'serverless-cd',
  favicons: ['/logo.png'],
  styles: [`.dumi-default-header-left { width: 264px !important}`],
});
