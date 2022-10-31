## PipelineInitNode

Demo:

```tsx
import React, { useState } from 'react';
import { PipelineInitNode } from '@serverless-cd/pipeline-ui';

const defaultNodes = [
  {
    label: <div>开始</div>,
    className: 'circle',
  },
  {
    label: <div>代码源</div>,
  },
  {
    label: <div>前置检查</div>,
  },
  {
    label: <div>构建部署</div>,
  },
  {
    label: <div>灰度</div>,
  },
  {
    label: <div>审批</div>,
  },
  {
    label: <div>发布</div>,
  },
  {
    label: <div>结束</div>,
    className: 'circle',
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
    </>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
