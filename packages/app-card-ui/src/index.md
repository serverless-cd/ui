---
title: AppCard 应用卡片
toc: content
---

# AppCard 应用卡片

## 基本使用

```tsx
import '@alicloud/console-components/dist/wind.css';
import AppCard from '@serverless-cd/app-card-ui';
import React from 'react';

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

### 自定义立即创建

```tsx
import '@alicloud/console-components/dist/wind.css';
import AppCard from '@serverless-cd/app-card-ui';
import React from 'react';

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

  const onCreate = (data) => {
    console.log(data, '自定义创建事件');
  };
  return <AppCard dataSouce={dataSouce} onCreate={onCreate} />;
};
```

### apiType

> apiType 为枚举类型：fc，fcweb（默认为 fc）

```tsx
import '@alicloud/console-components/dist/wind.css';
import AppCard, { IApiType } from '@serverless-cd/app-card-ui';
import React from 'react';

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

### fetchReadme

```tsx
import '@alicloud/console-components/dist/wind.css';
import AppCard, { IApiType } from '@serverless-cd/app-card-ui';
import axios from 'axios';
import { get } from 'lodash';
import qs from 'qs';
import React from 'react';

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

  const fetchReadme = async () => {
    try {
      const result = await axios({
        method: 'post',
        url: 'https://registry.devsapp.cn/package/content',
        data: qs.stringify({
          name: 'png-compress',
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return get(result, 'data.Response.readme');
    } catch (e) {}
  };

  return (
    <AppCard
      dataSouce={dataSouce}
      apiType={IApiType.fcweb}
      fetchReadme={fetchReadme}
    />
  );
};
```

### 多个 AppCard

> 设置 column 属性为 3 时，可以一行展示 3 列

```tsx
import '@alicloud/console-components/dist/wind.css';
import AppCard from '@serverless-cd/app-card-ui';
import React from 'react';

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
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import AppCard from '@serverless-cd/app-card-ui';
import React from 'react';

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
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import AppCard from '@serverless-cd/app-card-ui';
import React from 'react';

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
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import AppCard from '@serverless-cd/app-card-ui';
import React from 'react';

export default () => {
  return (
    <AppCard.Readme
      appName="png-compress"
      onCreate={() => {}}
      activeTab="local_experience"
    >
      <Button type="primary">查看详情</Button>
    </AppCard.Readme>
  );
};
```

### AppCard.Readme（visible）

> 设置 activeTab 属性，slide 视图可以 定位到 对应的 tab

```tsx
import '@alicloud/console-components/dist/wind.css';
import AppCard from '@serverless-cd/app-card-ui';
import React from 'react';

export default () => {
  return (
    <AppCard.Readme
      appName="png-compress"
      visible
      activeTab="usedetail"
    ></AppCard.Readme>
  );
};
```

## API

| 参数        | 说明   | 类型   | 必填 | 默认值 |
| ----------- | ------ | ------ | ---- | ------ |
| title       | 标题   | String | 是   |        |
| description | 描述   | String | 否   |        |
| download    | 下载量 | Number | 否   |        |

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
