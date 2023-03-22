/**
 * dumidoc.js说明
 *
 * 作为组件开发者，当您的组件已经发布到npm，您应该在此配置组件相关信息，以便我们为serverless-cd/ui生成一个静态站点
 *
 *
 *
 */
module.exports = [
  {
    package: '@serverless-cd/dingtalk-ui',
    version: '0.0.12',
    path: './packages/dingtalk-ui',
    file: 'dingtalk',
    menu: 'Dingtalk 钉钉通知',
  },
  {
    package: '@serverless-cd/app-card-ui',
    version: '0.0.5',
    path: './packages/app-card-ui',
    file: 'appcard',
    menu: 'AppCard 卡片',
  },
  {
    package: '@serverless-cd/s-ui',
    version: '0.0.1',
    path: './packages/s-ui',
    file: 's-ui',
    menu: 's-ui',
  },
  {
    package: '@serverless-cd/trigger-ui',
    version: '0.0.25',
    path: './packages/trigger-ui',
    file: 'trigger',
    menu: 'trigger',
  },
];
