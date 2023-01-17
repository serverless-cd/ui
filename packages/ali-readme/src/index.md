## AliReadme

Demo:

mode： normal strict

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Button } from '@alicloud/console-components';
import AliReadme from '@serverless-cd/ali-readme';

export default () => {
  return (
    <AliReadme appName="png-compress" onCreate={() => {}} activeTab="local_experience">
      <Button className="m-200" type="primary">
        查看详情
      </Button>
    </AliReadme>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
