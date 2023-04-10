---
title: CredentialUi 添加密钥
toc: content
---

# CredentialUi 添加密钥

## basic

```tsx
import React from 'react';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import CredentialUi from '@serverless-cd/credential-ui';

export default () => {
  return (
    <CredentialUi onConfirm={console.log}>
      <Button type="primary">添加密钥</Button>
    </CredentialUi>
  );
};
```

## title

```tsx
import React from 'react';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import CredentialUi from '@serverless-cd/credential-ui';

export default () => {
  return (
    <CredentialUi title="自定义标题">
      <Button type="primary">自定义标题</Button>
    </CredentialUi>
  );
};
```

## existAlias

```tsx
import React from 'react';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import CredentialUi from '@serverless-cd/credential-ui';

export default () => {
  return (
    <CredentialUi existAlias={['a']}>
      <Button type="primary">添加密钥</Button>
    </CredentialUi>
  );
};
```

## onOpenDocument

```tsx
import React from 'react';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import CredentialUi from '@serverless-cd/credential-ui';

export default () => {
  return (
    <CredentialUi onOpenDocument={console.log}>
      <Button type="primary">添加密钥</Button>
    </CredentialUi>
  );
};
```


## API

| 参数        | 说明   | 类型   | 必填 | 默认值 |
| ----------- | ------ | ------ | ---- | ------ |
| title       | 标题   | string | 否   |   添加密钥   |
| existAlias  | 已添加过的密钥   | string[] | 否   |      |
| onConfirm |  点击确定后触发  | function | 否   |        |
| onOpenDocument | 点击 密钥获取引导 后触发 | function | 否   |     |
