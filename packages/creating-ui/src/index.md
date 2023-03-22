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
          successMsg: (
            <div>
              <span>代码评审(PR/MR)申请已完成，请尽快完成审核</span>
              <Button type="primary">前往审核</Button>
            </div>
          ),
          errorMsg: '部署失败',
          run: async (params) => {
            console.log('----部署2');
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                const success = get(params, 'content.createRelease.success', true);
                resolve(44);
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

### 全部重试操作

retryType: all - 从头开始执行 current - 当前错误 task 开始执行

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
      retryType="all"
      onCountdownComplete={onCountdownComplete}
    />
  );
};
```

### 支持自定义文案提示

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
      help={<span>测试测试</span>}
      onCountdownComplete={onCountdownComplete}
    />
  );
};
```

### 等待任务执行 示例

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import CreatingUi from '@serverless-cd/creating-ui';
import { Button } from '@alicloud/console-components';
import { get } from 'lodash';

export default () => {
  // const dataSource = [
  //   {
  //     title: '提交pr/mr',
  //     runStatus: 'wait',
  //     key: 'createOrg',
  //     runningMsg: '提交pr/mr中...',
  //     successMsg: '已提交pr/mr',
  //     errorMsg: '提交pr/mr失败',
  //     run: async () => {
  //       return await new Promise((resolve, reject) => {
  //         setTimeout(() => {
  //           resolve('createOrg');
  //         }, 3000);
  //       });
  //     },
  //   },
  //   {
  //     title: '校验 pr/mr 是否已经完成',
  //     runStatus: 'pending',
  //     key: 'releaseEnv',
  //     runningMsg: '校验 pr/mr 中...',
  //     successMsg: 'pr/mr校验已完成',
  //     errorMsg: 'pr/mr校验失败',
  //     run: async (params) => {
  //       let check = false;
  //       setTimeout(() => {
  //         check = true;
  //       }, 10000);
  //       return await new Promise((resolve, reject) => {
  //         let inter = setInterval(() => {
  //           console.log('校验中.......');
  //           if (check) {
  //             resolve(33);
  //             clearInterval(inter);
  //           }
  //         }, 3000);
  //       });
  //     },
  //   },
  //   {
  //     title: '创建成功',
  //     key: 'releaseEnv1',
  //   },
  // ];
  const dataSource = [
    {
      title: '提交代码评审 (PR/MR)流程',
      key: 'createCodeReview',
      tasks: [
        {
          title: '创建新分支',
          key: 'createBranch',
          runningMsg: '创建新分支中...',
          successMsg: '创建分支成功',
          errorMsg: '创建分支失败',
          run: async () => {
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve('createOrg');
              }, 1000);
            });
          },
        },
        {
          title: '提交代码到新分支',
          key: 'pushCode',
          runningMsg: '提交代码到新分支中...',
          successMsg: '提交代码到新分支成功',
          errorMsg: '提交代码到新分支失败',
          run: async () => {
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve('createOrg');
              }, 1000);
            });
          },
        },
        {
          title: '提交代码评审 (PR/MR)',
          runStatus: 'wait',
          key: 'pullCode',
          runningMsg: '提交代码评审 (PR/MR)中...',
          successMsg: '提交代码评审 (PR/MR)申请已完成，请尽快通过评审 ',
          errorMsg: '提交代码评审 (PR/MR)失败',
          run: async () => {
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve('createOrg');
              }, 1000);
            });
          },
        },
      ],
    },
    {
      title: '校验代码评审 (PR/MR)',
      key: 'checkCodeReview',
      runStatus: 'pending',
      runningMsg: '校验代码评审 (PR/MR)中...',
      successMsg: '代码评审 (PR/MR)已通过',
      errorMsg: '校验代码评审 (PR/MR) 失败',
      run: async () => {
        let check = false;
        setTimeout(() => {
          check = true;
        }, 4000);
        return await new Promise((resolve, reject) => {
          let inter = setInterval(() => {
            console.log('校验中.......');
            if (check) {
              reject(33);
              clearInterval(inter);
            }
          }, 3000);
        });
      },
    },
    {
      title: '校验s.yaml 文件',
      key: 'checkSuccess',
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
      help={<span>测试测试</span>}
      onCountdownComplete={onCountdownComplete}
    />
  );
};
```

### 等待任务执行 示例

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import CreatingUi from '@serverless-cd/creating-ui';
import { Button } from '@alicloud/console-components';
import { get } from 'lodash';

export default () => {
  const dataSource = [
    {
      title: '提交代码评审 (PR/MR)流程',
      key: 'createCodeReview',
      tasks: [
        {
          title: '创建新分支',
          key: 'createBranch',
          runningMsg: '创建新分支中...',
          successMsg: '创建分支成功',
          errorMsg: '创建分支失败',
          run: async () => {
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve('createOrg');
              }, 1000);
            });
          },
        },
        {
          title: '提交代码到新分支',
          key: 'pushCode',
          // runStatus: 'pending',
          runningMsg: '提交代码到新分支中...',
          successMsg: '提交代码到新分支成功',
          errorMsg: '提交代码到新分支失败',
          run: async () => {
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve('createOrg');
              }, 1000);
            });
          },
        },
        {
          title: '提交代码评审 (PR/MR)',
          key: 'pullCode',
          runStatus: 'pending',
          runningMsg: '提交代码评审 (PR/MR)中...',
          successMsg: '提交代码评审 (PR/MR)申请已完成，请尽快通过评审 ',
          errorMsg: '提交代码评审 (PR/MR)失败',
          run: async () => {
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve('createOrg');
              }, 1000);
            });
          },
        },
      ],
    },
    {
      title: '校验代码评审 (PR/MR)',
      key: 'checkCodeReview',
      runStatus: 'pending',
      runningMsg: '校验代码评审 (PR/MR)中...',
      successMsg: '代码评审 (PR/MR)已通过',
      errorMsg: '校验代码评审 (PR/MR) 失败',
      run: async () => {
        let check = false;
        setTimeout(() => {
          check = true;
        }, 4000);
        return await new Promise((resolve, reject) => {
          let inter = setInterval(() => {
            console.log('校验中.......');
            if (check) {
              reject(33);
              clearInterval(inter);
            }
          }, 3000);
        });
      },
    },
    {
      title: '校验s.yaml 文件',
      key: 'checkSuccess',
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
      help={<span>测试测试</span>}
      resumeText="校验审核通过"
      onCountdownComplete={onCountdownComplete}
    />
  );
};
```
