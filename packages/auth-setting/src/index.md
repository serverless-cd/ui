## AuthSetting

Demo:

### 基本用法

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import AuthSetting from '@serverless-cd/auth-setting';
import { Button } from '@alicloud/console-components';

export default () => {
  return (
    <>
      <AuthSetting onChange={console.log} />
    </>
  );
};
```

### 初始化默认值

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import AuthSetting from '@serverless-cd/auth-setting';

export default () => {
  return <AuthSetting value={{ aa: '111', bb: '初始化默认值' }} onChange={console.log} />;
};
```

### Field 用法

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field } from '@alicloud/console-components';
import AuthSetting from '@serverless-cd/auth-setting';

export default () => {
  const field = Field.useField();
  const { init } = field;
  return (
    <AuthSetting
      {...init('data', {
        initValue: { aa: '222', bb: 'Field 用法' },
        props: {
          onChange: console.log,
        },
      })}
    />
  );
};
```

### 校验

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import AuthSetting from '@serverless-cd/auth-setting';
import { Button } from '@alicloud/console-components';

export default () => {
  const onSubmit = async (form) => {
    const errors = await form.validate();
    console.log(errors ? errors : '校验成功');
  };
  return (
    <>
      <AuthSetting onChange={console.log}>
        {(form) => (
          <Button type="primary" onClick={() => onSubmit(form)}>
            校验
          </Button>
        )}
      </AuthSetting>
    </>
  );
};
```
