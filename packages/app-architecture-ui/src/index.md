## AppArchitectureBox

```tsx
import AppArchitecture from '@serverless-cd/app-architecture-ui';
import React from 'react';
const AppArchitectureItem = AppArchitecture.Item;
const AppArchitectureContent = AppArchitecture.Content;
export default () => {
  return (
    <>
      <AppArchitecture maxColCount={2} label="部署环境" defaultSelectedKey="SLB">
        <AppArchitectureItem label="网络" key="vpc" icon="vpc">
          <AppArchitectureItem label="SLB" key="SLB" icon="slb-internet" active />
          <AppArchitectureItem label="ALB" key="ALB" icon="slb-intranet" disabled />
          <AppArchitectureItem label="主机实例" key="instance" icon="instance">
            <AppArchitectureItem label="反向代理" key="反向代理" icon="proxy" disabled />
            <AppArchitectureItem label="应用" key="应用" icon="application" />
          </AppArchitectureItem>
        </AppArchitectureItem>

        <AppArchitectureContent title="SLB" key="SLB">
          SLB内容
        </AppArchitectureContent>
        <AppArchitectureContent title="vpc" key="vpc">
          vpc内容
        </AppArchitectureContent>
        <AppArchitectureContent title="instance" key="instance">
          instance内容
        </AppArchitectureContent>
      </AppArchitecture>
    </>
  );
};
```

```tsx
import { Icon, Switch } from '@alicloud/console-components';
import '@alifd/next/dist/next.css';
import AppArchitecture from '@serverless-cd/app-architecture-ui';
import React, { useState } from 'react';

const AppArchitectureContent = AppArchitecture.Content;

export default () => {
  const [selectedKey, setSelectedKey] = useState('1-1');
  const dataSource = [
    {
      key: '1',
      label: '1',
      children: [
        {
          key: '1-2',
          label: '1-2',
          icon: <Switch size="small" />,
        },
        {
          key: '1-3',
          label: '1-3',
          icon: <Icon type="smile" size="large" />,
        },
        {
          key: '1-6',
          label: '1-6',
          icon: <Icon type="smile" size="large" />,
        },
        {
          key: '1-1',
          label: '1-1',
          children: [
            {
              key: '1-1-1',
              label: '1-1-1',
            },
            {
              key: '1-1-2',
              label: '1-1-2',
              disabled: true,
            },
            {
              key: '1-1-5',
              label: '1-1-5',
            },
            {
              key: '1-1-3',
              label: '1-1-3',
              disabled: true,
              children: [
                {
                  key: '1-1-1-1',
                  label: '1-1-2-2',
                  active: true,
                  icon: 'slb-internet',
                },
                {
                  key: '1-2-1-1',
                  label: '1-2-2-2',
                  selected: true,
                },
              ],
            },
            {
              key: '1-1-4',
              label: '1-1-4',
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <AppArchitecture
        label="部署环境"
        value={dataSource}
        maxColCount={3}
        selectedKey={selectedKey}
        onChange={setSelectedKey}
      >
        <AppArchitectureContent title="1-1" key="1-1">
          1-1
        </AppArchitectureContent>
        <AppArchitectureContent title="1" key="1">
          1
        </AppArchitectureContent>
        <AppArchitectureContent title="1-6" key="1-6">
          1-6
        </AppArchitectureContent>
      </AppArchitecture>
    </>
  );
};
```
