type Align = 'right' | 'left' | undefined;

export const FORM_LAYOUT = {
  labelCol: {
    fixedSpan: 8,
  },
  wrapperCol: {
    span: 16,
  },
  labelTextAlign: 'left' as Align,
};

export enum PROVIDER {
  alibaba = 'alibaba',
  aws = 'aws',
  azure = 'azure',
  baidu = 'baidu',
  google = 'google',
  huawei = 'huawei',
  tencent = 'tencent',
  custom = 'custom',
}

export const PROVIDER_LIST = [
  {
    label: 'Alibaba Cloud (alibaba)',
    value: PROVIDER.alibaba,
    doc: 'http://config.devsapp.net/account/alibaba',
  },
  { label: 'AWS (aws)', value: PROVIDER.aws, doc: 'http://config.devsapp.net/account/aws' },
  { label: 'Azure (azure)', value: PROVIDER.azure, doc: 'http://config.devsapp.net/account/azure' },
  {
    label: 'Baidu Cloud (baidu)',
    value: PROVIDER.baidu,
    doc: 'http://config.devsapp.net/account/baidu',
  },
  {
    label: 'Google Cloud (google)',
    value: PROVIDER.google,
    doc: 'http://config.devsapp.net/account/gcp',
  },
  {
    label: 'Huawei Cloud (huawei)',
    value: PROVIDER.huawei,
    doc: 'http://config.devsapp.net/account/huawei',
  },
  {
    label: 'Tencent Cloud (tencent)',
    value: PROVIDER.tencent,
    doc: 'http://config.devsapp.net/account/tencent',
  },
  { label: 'Custom (others)', value: PROVIDER.custom },
];
