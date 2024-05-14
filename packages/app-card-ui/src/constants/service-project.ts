import { each, find, isEmpty } from 'lodash';

const getHeplOrChargingUrl = (product) => {
  return {
    helpUrl: `https://help.aliyun.com/zh/${product}`,
    chargingUrl: `https://help.aliyun.com/zh/${product}/product-overview/billing`,
  };
};

export const SERVICES = [
  {
    label: '函数计算',
    value: '函数计算',
    url: 'https://fcnext.console.aliyun.com',
    product: 'fc',
    helpUrl: `https://help.aliyun.com/product/2508973.html`,
    chargingUrl: `https://help.aliyun.com/document_detail/2512928.html`,
  },
  {
    label: '对象存储',
    value: '对象存储',
    url: 'https://oss.console.aliyun.com',
    product: 'oss',
    ...getHeplOrChargingUrl('oss'),
  },
  {
    label: '日志服务',
    value: '日志服务',
    url: 'https://sls.console.aliyun.com',
    product: 'sls',
    ...getHeplOrChargingUrl('sls'),
  },
  {
    label: '硬盘挂载',
    value: '硬盘挂载',
    url: 'https://nasnext.console.aliyun.com',
    product: 'nas',
    ...getHeplOrChargingUrl('nas'),
  },
  {
    label: '容器镜像服务',
    value: '容器镜像服务',
    url: 'https://cr.console.aliyun.com',
    product: 'acr',
    ...getHeplOrChargingUrl('acr'),
  },
  {
    label: '专有网络',
    value: '专有网络',
    url: 'https://vpc.console.aliyun.com',
    product: 'vpc',
    ...getHeplOrChargingUrl('vpc'),
  },
  {
    label: '事件总线',
    value: '事件总线',
    url: 'https://eventbridge.console.aliyun.com',
    product: 'eventbridge',
    ...getHeplOrChargingUrl('eventbridge'),
  },
  {
    label: '表格存储',
    value: '表格存储',
    url: 'https://otsnext.console.aliyun.com',
    product: 'ots',
    ...getHeplOrChargingUrl('ots'),
  },
  {
    label: 'Serverless应用引擎',
    value: 'Serverless应用引擎',
    url: 'https://sae.console.aliyun.com',
    product: 'sae',
    ...getHeplOrChargingUrl('sae'),
  },
  {
    label: '内容分发网络',
    value: '内容分发网络',
    url: 'https://cdn.console.aliyun.com',
    product: 'cdn',
    ...getHeplOrChargingUrl('cdn'),
  },
  {
    label: '云数据库RDS MySQL 版',
    value: '云数据库RDS MySQL 版',
    url: 'https://rdsnext.console.aliyun.com',
    product: 'rds',
    ...getHeplOrChargingUrl('rds'),
  },
  {
    label: '视频点播',
    value: '视频点播',
    url: 'https://vod.console.aliyun.com',
    product: 'vod',
    ...getHeplOrChargingUrl('vod'),
  },
  {
    label: '视频直播',
    value: '视频直播',
    url: 'https://live.console.aliyun.com',
    product: 'live',
    ...getHeplOrChargingUrl('live'),
  },
  {
    label: '智能媒体服务',
    value: '智能媒体服务',
    url: 'https://ice.console.aliyun.com',
    product: 'ice',
    ...getHeplOrChargingUrl('ice'),
  },
  {
    label: '媒体处理',
    value: '媒体处理',
    url: 'https://mps.console.aliyun.com',
    product: 'mts',
    ...getHeplOrChargingUrl('mts'),
  },
  {
    label: '低代码音视频工厂',
    value: '低代码音视频工厂',
    url: 'https://imp.console.aliyun.com',
    product: 'imp',
    ...getHeplOrChargingUrl('imp'),
  },
  {
    label: '音视频通信',
    value: '音视频通信',
    url: 'https://rtc.console.aliyun.com',
    product: 'rtc',
    ...getHeplOrChargingUrl('rtc'),
  },
  {
    label: '资源编排',
    value: '资源编排',
    url: 'https://ros.console.aliyun.com',
    product: 'ros',
    ...getHeplOrChargingUrl('ros'),
  },
];

export const filterService = (services: any) => {
  let servicesInfo = [];
  each(services, (_, key) => {
    const productInfo = find(SERVICES, (item) => item.value === key);
    if (!isEmpty(productInfo)) servicesInfo.push(productInfo);
  });
  return servicesInfo;
};
