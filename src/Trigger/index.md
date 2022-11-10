## Trigger

Demo:

```tsx
import React, { useEffect } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field } from '@alicloud/console-components';
import { Trigger } from '@serverless-cd/ui';

// 使用方式1
// 1. 接收 value 和 onChange

// export default () => {
//   return <Trigger value={} onChange={} />;
// };

// 如果1是ok的，那么2也是支持的
// 2. 组件可以被field接管。。 https://csr632.gitee.io/alibabacloud-console-components/base-components/field#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E6%8E%A5%E5%85%A5field%E6%A0%87%E5%87%86

// export default () => {
//   return <Trigger {...init('trigger')} />;
// };

export default () => {
  const field = Field.useField();
  const { init, getValue, setValue } = field;
  const initValue = {
    push: {
      branches: {
        prefix: ['1'],
        precise: ['1'],
      },
      tags: {
        prefix: ['22'],
      },
    },
  };

  useEffect(() => {
    console.log(getValue('trigger'), 'trigger');
  }, [getValue('trigger')]);

  return <Trigger {...init('trigger', { initValue })} />;
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
