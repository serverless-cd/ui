## PipelineInitNode

Demo:

```tsx
import React, { useState } from 'react';
import { PipelineInitNode } from '@serverless-cd/pipeline-ui';

const defaultNodes = [
  {
    label: <div>开始</div>,
    selectable: false,
    key: 'start',
  },
  {
    label: (
      <>
        <div>代码源</div>
        <div>Code source</div>
      </>
    ),
    key: 'code',
    status: 'error',
  },
  {
    label: (
      <>
        <div>前置检查</div>
        <div>Plan</div>
      </>
    ),
    status: 'success',
  },
  {
    label: (
      <>
        <div>构建与部署</div>
        <div>Build&Deploy</div>
      </>
    ),
    selected: true,
  },
  {
    label: (
      <>
        <div>灰度</div>
        <div>Canary</div>
      </>
    ),
  },
  {
    label: (
      <>
        <div>审批</div>
        <div>Approve</div>
      </>
    ),
  },
  {
    label: (
      <>
        <div>发布</div>
        <div>Release</div>
      </>
    ),
  },
  {
    label: <div>结束</div>,
    selectable: false,
    key: 'end',
  },
];

export default () => {
  const [nodes, setNodes] = useState(defaultNodes);
  const onClick = (node) => {
    console.log('onClick', node);
  };
  return (
    <>
      <PipelineInitNode nodes={nodes} onClick={onClick} />
      <button onClick={() => setNodes(nodes.map((node) => ({ ...node, selected: false })))}>
        取消选中
      </button>
      <button
        onClick={() =>
          setNodes(
            nodes.map((node) => {
              if (node.key === 'code') {
                node.status = 'success';
              }
              return node;
            }),
          )
        }
      >
        代码源配置成功
      </button>
    </>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
