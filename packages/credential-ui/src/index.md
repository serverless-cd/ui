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
const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

const onConfirm = async data => {
  console.log(data);
  await sleep()
}

export default () => {
  return (
    <CredentialUi onConfirm={onConfirm}>
      <Button type="primary">添加密钥</Button>
    </CredentialUi>
  );
};
```

## onConfirm

```tsx
import React from 'react';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import CredentialUi from '@serverless-cd/credential-ui';
const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

const onConfirm = async data => {
  console.log(data);
  await sleep()
  return Promise.reject('error')
}

export default () => {
  return (
    <CredentialUi onConfirm={onConfirm}>
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
    <CredentialUi title="自定义标题" onConfirm={console.log}>
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
    <CredentialUi existAlias={['a']} onConfirm={console.log}>
      <Button type="primary">添加密钥</Button>
    </CredentialUi>
  );
};
```

## showAccountID

```tsx
import React from 'react';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import CredentialUi from '@serverless-cd/credential-ui';

export default () => {
  return (
    <CredentialUi showAccountID onConfirm={console.log}>
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
    <CredentialUi onOpenDocument={console.log} onConfirm={console.log}>
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
| showAccountID  | 仅在配置阿里云密钥时生效，表示是否显示AccountID   | boolean | 否   |  false    |
| onConfirm |  点击确定后触发  | function | 否   |        |
| onOpenDocument | 点击 密钥获取引导 后触发 | function | 否   |     |
