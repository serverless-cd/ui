/**
 * dumidoc.js说明
 *
 * 作为组件开发者，当您的组件已经发布到npm，您应该在此配置组件相关信息，以便我们为serverless-cd/ui生成一个静态站点
 *
 * package: 组件包名
 * version: 组件发包版本号
 * path: 组件工程路径
 * name: 设置将在src目录下生成的markdown文件的名称，packages目录下组件对应的markdown文件请设置文件名为 index.md
 */
module.exports = [
  {
    package: '@serverless-cd/dingtalk-ui',
    version: '0.0.12',
    path: './packages/dingtalk-ui',
    name: 'dingtalk',
  },
  {
    package: '@serverless-cd/app-card-ui',
    version: '0.0.5',
    path: './packages/app-card-ui',
    name: 'appcard',
  },
  {
    package: '@serverless-cd/s-ui',
    version: '0.0.1',
    path: './packages/s-ui',
    name: 's-ui',
  },
  {
    package: '@serverless-cd/trigger-ui',
    version: '0.0.25',
    path: './packages/trigger-ui',
    name: 'trigger',
  },
  // {
  //   package: '@serverless-cd/auth-ui',
  //   version: '0.0.2',
  //   path: './packages/auth-ui',
  //   name: 'auth',
  // },
  {
    package: '@serverless-cd/creating-ui',
    version: '0.0.3',
    path: './packages/creating-ui',
    name: 'creating',
  },
  // {
  //   package: '@serverless-cd/setting-ui',
  //   version: '0.0.1',
  //   path: './packages/setting-ui',
  //   name: 'setting',
  // },
  {
    package: '@serverless-cd/ui-help',
    version: '0.0.2',
    path: './packages/ui-help',
    name: 'help',
  },
  {
    package: '@serverless-cd/variable-ui',
    version: '0.0.3',
    path: './packages/variable-ui',
    name: 'variable',
  },
];
