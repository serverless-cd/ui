## app-card-ui

### 基本使用

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Button } from '@alicloud/console-components';
import AppCard from '@serverless-cd/app-card-ui';

export default () => {
  const dataSouce = {
    title: 'Todolist',
    package: 'todolist-app',
    description: '一款基于Node.JS的网页TodoList应用',
    download: 6423,
    logo: 'https://example-static.oss-cn-beijing.aliyuncs.com/serverless-app-store/express.png',
    demo: 'http://todolist.web-framework.1767215449378635.cn-hangzhou.fc.devsapp.net/',
    tags: ['Express', '云应用', 'Todo List'],
    url: 'https://github.com/devsapp/start-web-framework/tree/master/example/todolist-app/src',
    user: 1,
  };
  return <AppCard dataSouce={dataSouce} />;
};
```

### apiType

> apiType 为枚举类型：fc，fcweb（默认为 fc）

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Button } from '@alicloud/console-components';
import AppCard, { IApiType } from '@serverless-cd/app-card-ui';

export default () => {
  const dataSouce = {
    title: 'Todolist',
    package: 'todolist-app',
    description: '一款基于Node.JS的网页TodoList应用',
    download: 6423,
    logo: 'https://example-static.oss-cn-beijing.aliyuncs.com/serverless-app-store/express.png',
    tags: ['Express', '云应用', 'Todo List'],
    url: 'https://github.com/devsapp/start-web-framework/tree/master/example/todolist-app/src',
    user: 1,
  };

  return <AppCard dataSouce={dataSouce} apiType={IApiType.fcweb} />;
};
```

### 多个 AppCard

> 设置 column 属性为 3 时，可以一行展示 3 列

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Button } from '@alicloud/console-components';
import AppCard from '@serverless-cd/app-card-ui';

export default () => {
  const dataSouce = {
    title: 'Todolist',
    package: 'todolist-app',
    description: '一款基于Node.JS的网页TodoList应用',
    download: 6423,
    logo: 'https://example-static.oss-cn-beijing.aliyuncs.com/serverless-app-store/express.png',
    tags: ['Express', '云应用', 'Todo List'],
    url: 'https://github.com/devsapp/start-web-framework/tree/master/example/todolist-app/src',
    user: 1,
  };
  const arr = [1, 2, 3];
  const len = arr.length;

  const styleObj = {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: -8,
    marginRight: -8,
  };

  return (
    <div style={styleObj}>
      {arr.map((item) => (
        <AppCard dataSouce={dataSouce} column={3} />
      ))}
    </div>
  );
};
```

### AppCard.Readme （新版 alireadme）

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Button } from '@alicloud/console-components';
import AppCard from '@serverless-cd/app-card-ui';

export default () => {
  return (
    <AppCard.Readme appName="png-compress" onCreate={() => {}}>
      <Button type="primary">查看详情</Button>
    </AppCard.Readme>
  );
};
```

### AppCard.Readme （兼容旧模版）

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Button } from '@alicloud/console-components';
import AppCard from '@serverless-cd/app-card-ui';

export default () => {
  return (
    <AppCard.Readme appName="HBaseToMaxComputeConnector" onCreate={() => {}}>
      <Button type="primary">查看详情</Button>
    </AppCard.Readme>
  );
};
```

### AppCard.Readme（activeTab）

> 设置 activeTab 属性，slide 视图可以 定位到 对应的 tab

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Button } from '@alicloud/console-components';
import AppCard from '@serverless-cd/app-card-ui';

export default () => {
  return (
    <AppCard.Readme appName="png-compress" onCreate={() => {}} activeTab="local_experience">
      <Button type="primary">查看详情</Button>
    </AppCard.Readme>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
