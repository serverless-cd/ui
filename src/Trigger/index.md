## Trigger

Demo:

```tsx
import React, { useState } from 'react';
import '@alicloud/console-components/dist/wind.css';

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
  return <Trigger />;
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
