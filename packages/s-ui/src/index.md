---
title: s 工具可视化
toc: content
---

# s 工具可视化

## 安装

```bash
$ npm install @serverless-cd/s-ui --save
```

## 基本用法

```tsx
import '@alicloud/console-components/dist/wind.css';
import SUi from '@serverless-cd/s-ui';
import React from 'react';

export default () => {
  const data = {
    edition: '1.0.0',
    name: 'compoent-test',
    access: '{{ access }}',
    vars: {
      region: 'cn-huhehaote',
      service: {
        internetAccess: true,
        tracingConfig: 'Disable',
        nasConfig: 'auto',
        name: 'fc-console-service-pre',
        description: 'fc console function  pre',
        environmentVariables: {
          OTS_ENDPOINT: 'https://fc-ots-pre.cn-hangzhou.ots.aliyuncs.com',
          OTS_INSTANCE_NAME: 'fc-ots-pre',
        },
        role: 'acs:ram::1813774388953700:role/aliyunfcgeneratedrole-cn-hangzhou-fc-console-service-pre',
      },
    },
    services: {
      autoCreateNas: {
        component: 'devsapp/fc@dev',
        props: {
          region: 'cn-hangzhou',
          service: {
            internetAccess: true,
            tracingConfig: 'Disable',
            nasConfig: {
              userId: 111,
              groupId: 222,
              mountPoints: [
                {
                  serverAddr: 'a1',
                  nasDir: 'b1',
                  fcDir: 'c1',
                },
                {
                  serverAddr: 'a2',
                  nasDir: 'b2',
                  fcDir: 'c2',
                },
              ],
            },
            vpcConfig: {
              vpcId: 'a',
              vswitchIds: ['v1', 'v2'],
              securityGroupId: 'd',
            },
            name: 'fc-console-service-pre',
            description: 'fc console function  pre',
            environmentVariables: {
              OTS_ENDPOINT: 'https://fc-ots-pre.cn-hangzhou.ots.aliyuncs.com',
              OTS_INSTANCE_NAME: 'fc-ots-pre',
            },
            role: {
              name: 'roleName',
              policies: [
                'AliyunOSSFullAccess',
                {
                  name: 'myPolicy',
                  description: 'custom policy',
                  statement: [
                    {
                      Effect: 'Allow',
                      Action: ['log:ListProject'],
                      Resource: ['acs:log:*:*:project/*'],
                    },
                  ],
                },
              ],
            },
          },
          function: {
            environmentVariables: {
              NODE_PATH: '/code/node_modules:/usr/local/lib/node_modules',
            },
            handler: 'index.handler',
            instanceConcurrency: 4,
            instanceType: 'e1',
            memorySize: 512,
            runtime: 'custom-container',
            timeout: 60,
            name: 'autoCreateNas',
            codeUri: './src/main/node/autoCreateNas',
          },
        },
      },
      cicdAction: {
        component: 'devsapp/fc@dev',
        props: {
          region: '${vars.region}',
          service: '${vars.service}',
          function: {
            environmentVariables: {
              NODE_PATH: '/code/node_modules:/usr/local/lib/node_modules',
            },
            handler: 'index.handler',
            instanceConcurrency: 4,
            instanceType: 'e1',
            memorySize: 512,
            runtime: 'nodejs12',
            timeout: 60,
            name: '${vars.region}-dd-${vars.service.name}',
            codeUri: './src/main/node/cicdAction',
          },
        },
      },
    },
  };
  return (
    <>
      <SUi
        onChange={console.log}
        value={data}
        accessList={['default', 'dk', 'test']}
      />
    </>
  );
};
```

## Field 示例

```tsx
import { Field } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import SUi from '@serverless-cd/s-ui';
import React from 'react';

export default () => {
  const data = {
    edition: '1.0.0',
    name: 'compoent-test',
    access: '{{ access }}',
    vars: {
      region: 'cn-huhehaote',
      service: {
        internetAccess: true,
        tracingConfig: 'Disable',
        nasConfig: 'auto',
        name: 'fc-console-service-pre',
        description: 'fc console function  pre',
        environmentVariables: {
          OTS_ENDPOINT: 'https://fc-ots-pre.cn-hangzhou.ots.aliyuncs.com',
          OTS_INSTANCE_NAME: 'fc-ots-pre',
        },
        role: 'acs:ram::1813774388953700:role/aliyunfcgeneratedrole-cn-hangzhou-fc-console-service-pre',
      },
    },
    services: {
      autoCreateNas: {
        component: 'devsapp/fc@dev',
        props: {
          region: 'cn-hangzhou',
          service: {
            internetAccess: true,
            tracingConfig: 'Disable',
            nasConfig: {
              userId: 111,
              groupId: 222,
              mountPoints: [
                {
                  serverAddr: 'a1',
                  nasDir: 'b1',
                  fcDir: 'c1',
                },
                {
                  serverAddr: 'a2',
                  nasDir: 'b2',
                  fcDir: 'c2',
                },
              ],
            },
            vpcConfig: {
              vpcId: 'a',
              vswitchIds: ['v1', 'v2'],
              securityGroupId: 'd',
            },
            name: 'fc-console-service-pre',
            description: 'fc console function  pre',
            environmentVariables: {
              OTS_ENDPOINT: 'https://fc-ots-pre.cn-hangzhou.ots.aliyuncs.com',
              OTS_INSTANCE_NAME: 'fc-ots-pre',
            },
            role: {
              name: 'roleName',
              policies: [
                'AliyunOSSFullAccess',
                {
                  name: 'myPolicy',
                  description: 'custom policy',
                  statement: [
                    {
                      Effect: 'Allow',
                      Action: ['log:ListProject'],
                      Resource: ['acs:log:*:*:project/*'],
                    },
                  ],
                },
              ],
            },
          },
          function: {
            environmentVariables: {
              NODE_PATH: '/code/node_modules:/usr/local/lib/node_modules',
            },
            handler: 'index.handler',
            instanceConcurrency: 4,
            instanceType: 'e1',
            memorySize: 512,
            runtime: 'custom-container',
            timeout: 60,
            name: 'autoCreateNas',
            codeUri: './src/main/node/autoCreateNas',
          },
        },
      },
      cicdAction: {
        component: 'devsapp/fc@dev',
        props: {
          region: '${vars.region}',
          service: '${vars.service}',
          function: {
            environmentVariables: {
              NODE_PATH: '/code/node_modules:/usr/local/lib/node_modules',
            },
            handler: 'index.handler',
            instanceConcurrency: 4,
            instanceType: 'e1',
            memorySize: 512,
            runtime: 'nodejs12',
            timeout: 60,
            name: '${vars.region}-dd-${vars.service.name}',
            codeUri: './src/main/node/cicdAction',
          },
        },
      },
    },
  };
  const field = Field.useField();
  const { init, getValue } = field;
  console.log(getValue('data'));
  return (
    <>
      <SUi
        {...init('data', { initValue: data })}
        accessList={['default', 'dk', 'test']}
      />
    </>
  );
};
```

## API

| 参数         | 说明                           | 类型                                  | 必填 | 默认值 |
| ------------ | ------------------------------ | ------------------------------------- | ---- | ------ |
| value        | 当前值                         | Record<string, any>                   | 是   |        |
| onChange     | value 发生改变的时候触发的回调 | (value: Record<string, any>) => void  | 否   |        |
| accessList   | 密钥数据源                     | string[]                              | 否   |        |
| EditorRender | 自定义编辑器                   | ({ value, onChange }) => ReactElement | 否   |        |
