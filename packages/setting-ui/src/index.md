## SettingUi

Demo:

### 基本用法

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import SettingUi from '@serverless-cd/setting-ui';
import { Button } from '@alicloud/console-components';

export default () => {
  return (
    <>
      <SettingUi onChange={console.log} />
    </>
  );
};
```

### 初始化默认值

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import SettingUi from '@serverless-cd/setting-ui';

export default () => {
  return <SettingUi value={{ region: 'cn-hangzhou', bb: '初始化默认值' }} onChange={console.log} />;
};
```

### Field 用法

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field } from '@alicloud/console-components';
import SettingUi from '@serverless-cd/setting-ui';

export default () => {
  const field = Field.useField();
  const { init } = field;
  return (
    <SettingUi
      {...init('data', {
        initValue: { region: 'cn-hangzhou', bb: 'Field 用法' },
        props: {
          onChange: console.log,
        },
      })}
    />
  );
};
```

### 校验

> form 实例可通过 children 的第一个参数或者 onChange 第二个参数 得到。

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import SettingUi from '@serverless-cd/setting-ui';
import { Button } from '@alicloud/console-components';

export default () => {
  const onSubmit = async (form) => {
    const errors = await form.validate();
    console.log(errors ? errors : '校验成功');
  };
  return (
    <>
      <SettingUi onChange={console.log}>
        {(form) => (
          <Button type="primary" onClick={() => onSubmit(form)}>
            校验
          </Button>
        )}
      </SettingUi>
    </>
  );
};
```

### formLayoutProps

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import SettingUi from '@serverless-cd/setting-ui';
import { Button } from '@alicloud/console-components';

const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelAlign: 'right',
};

export default () => {
  return (
    <>
      <SettingUi formLayoutProps={formLayout} onChange={console.log} />
    </>
  );
};
```
