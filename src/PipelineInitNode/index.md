## PipelineInitNode

Demo:

```tsx
import React, { useState } from 'react';
import { PipelineInitNode } from '@xsahxl/pipeline-ui';

export default () => {
  const [refreshIndex, setFreshIndex] = useState(0);
  const nodes = [
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
  const onClick = (node) => {
    console.log('onClick', node);
  };
  return (
    <div style={{ height: 200 }}>
      <PipelineInitNode nodes={nodes} refreshIndex={refreshIndex} onClick={onClick} />
      <button onClick={() => setFreshIndex(Date.now())}>取消选中</button>
    </div>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
