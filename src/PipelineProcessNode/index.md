## PipelineProcessNode

Demo:

```tsx
import React, { useState } from 'react';
import { PipelineProcessNode } from '@xsahxl/pipeline-ui';

const defaultNodes = [
  {
    label: <div>开始</div>,
    className: 'circle',
  },
  {
    label: <div>代码源</div>,
    status: 'success',
  },
  {
    label: <div>前置检查</div>,
    status: 'success',
    // type: 'group',
  },
  {
    label: <div>构建部署</div>,
    status: 'warn',
    // parentNode: '2',
    // extent: 'parent',
  },
  {
    label: <div>灰度</div>,
    status: 'failure',
    // parentNode: '2',
    // extent: 'parent',
  },
  {
    label: <div>审批</div>,
    status: 'pending',
  },
  {
    label: <div>发布</div>,
    status: 'pending',
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
    <div style={{ height: 200 }}>
      <PipelineProcessNode nodes={nodes} onClick={onClick} />
      <button onClick={() => setNodes(nodes.map((node) => ({ ...node, selected: false })))}>
        取消选中
      </button>
    </div>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
