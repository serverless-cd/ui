## PipelineProcessNode

Demo:

```tsx
import React, { useState } from 'react';
import { PipelineProcessNode, IPipelineProcessNodeStatus } from '@serverless-cd/pipeline-ui';

console.log(IPipelineProcessNodeStatus);

const defaultNodes = [
  {
    label: <div>代码源</div>,
    status: IPipelineProcessNodeStatus.SUCCESS,
  },
  {
    label: <div>前置检查</div>,
    status: IPipelineProcessNodeStatus.RUNNING,
  },
  {
    label: <div>构建部署</div>,
    status: IPipelineProcessNodeStatus.WARN,
  },
  {
    label: <div>灰度</div>,
    status: IPipelineProcessNodeStatus.FAILURE,
  },
  {
    label: <div>审批</div>,
    status: IPipelineProcessNodeStatus.PENDING,
  },
  {
    label: <div>发布</div>,
    status: IPipelineProcessNodeStatus.PENDING,
  },
];

export default () => {
  const [nodes, setNodes] = useState(defaultNodes);
  const onClick = (node) => {
    console.log('onClick', node);
  };
  return (
    <>
      <PipelineProcessNode nodes={nodes} onClick={onClick} />
      <button onClick={() => setNodes(nodes.map((node) => ({ ...node, selected: false })))}>
        取消选中
      </button>
    </>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
