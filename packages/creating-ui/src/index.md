## CreatingUi

Demo:

### 基本用法

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import CreatingUi from '@serverless-cd/creating-ui';
import { Button } from '@alicloud/console-components';
import { get } from 'lodash';

export default () => {
  const dataSource = [
    {
      title: '创建组织',
      runStatus: 'wait',
      key: 'createOrg',
      runningMsg: '创建组织中...',
      successMsg: '创建组织成功',
      errorMsg: '创建组织失败',
      run: async () => {
        console.log('----创建组织');
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('createOrg');
          }, 3000);
        });
      },
    },
    {
      title: '部署环境',
      runStatus: 'wait',
      key: 'releaseEnv',
      tasks: [
        {
          key: 'createRelease1',
          title: '部署版本1',
          runningMsg: '部署中1...',
          successMsg: '部署成功1',
          errorMsg: '部署失败1',
          run: async (params) => {
            console.log('----部署1');
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(22);
              }, 3000);
            });
          },
        },
        {
          key: 'createRelease',
          title: '部署版本',
          runningMsg: '部署中...',
          successMsg: '部署成功',
          errorMsg: '部署失败',
          run: async (params) => {
            console.log('----部署2');
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                const success = get(params, 'content.createRelease.success', true);
                success ? reject(33) : resolve(44);
              }, 3000);
            });
          },
        },
      ],
    },
    {
      title: '创建成功，请前往详情页',
      key: 'releaseEnv1',
    },
  ];

  const onError = (value) => {
    console.log(value, 'Error 事件');
  };

  const onComplete = (value) => {
    console.log(value, 'Complete 事件');
  };

  const onCountdownComplete = () => {
    console.log('CountdownComplete 事件 ----');
    // window.open('https://www.baidu.com/');
  };

  return (
    <CreatingUi
      dataSource={dataSource}
      onError={onError}
      onComplete={onComplete}
      countdown={3}
      onCountdownComplete={onCountdownComplete}
    />
  );
};
```

### 外部调用 重试功能

```tsx
import React, { useRef } from 'react';
import '@alicloud/console-components/dist/wind.css';
import CreatingUi from '@serverless-cd/creating-ui';
import { Button } from '@alicloud/console-components';
import { get } from 'lodash';

export default () => {
  const CreatingRef = useRef(null);

  const dataSource = [
    {
      title: '创建组织',
      runStatus: 'wait',
      key: 'createOrg',
      runningMsg: '创建组织中...',
      successMsg: '创建组织成功',
      errorMsg: '创建组织失败',
      run: async () => {
        console.log('----创建组织');
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('createOrg');
          }, 3000);
        });
      },
    },
    {
      title: '部署环境',
      runStatus: 'wait',
      key: 'releaseEnv',
      tasks: [
        {
          key: 'createRelease1',
          title: '部署版本1',
          runningMsg: '部署中1...',
          successMsg: '部署成功1',
          errorMsg: '部署失败1',
          run: async (params) => {
            console.log('----部署1');
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(22);
              }, 3000);
            });
          },
        },
        {
          key: 'createRelease',
          title: '部署版本',
          runningMsg: '部署中...',
          successMsg: '部署成功',
          errorMsg: '部署失败',
          run: async (params) => {
            console.log('----部署2');
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                const success = get(params, 'content.createRelease.success', true);
                success ? reject(33) : resolve(44);
              }, 3000);
            });
          },
        },
      ],
    },
    {
      title: '创建成功，请前往详情页',
      key: 'releaseEnv1',
    },
  ];

  const onError = (value) => {
    console.log(value, 'Error 事件');
  };

  const onRetry = () => {
    CreatingRef?.current?.onRetry();
  };

  return (
    <>
      <Button style={{ marginBottom: 20 }} onClick={onRetry}>
        重试
      </Button>
      <CreatingUi dataSource={dataSource} onError={onError} showRetry={false} ref={CreatingRef} />
    </>
  );
};
```
