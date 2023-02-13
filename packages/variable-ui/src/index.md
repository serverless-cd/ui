## VariableUi

Demo:

### 基本用法

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import VariableUi from '@serverless-cd/variable-ui';
import { Button } from '@alicloud/console-components';

export default () => {
  return (
    <VariableUi
      value={{ aa: '', bb: '' }}
      onChange={console.log}
      hintText={'当前环境变量为通过函数计算FC应用发布时可引用的环境变量'}
    />
  );
};
```

### 校验

> form 实例可通过 children 的第一个参数或者 onChange 第二个参数 得到。

```tsx
import React, { useRef } from 'react';
import '@alicloud/console-components/dist/wind.css';
import VariableUi from '@serverless-cd/variable-ui';
import { Button } from '@alicloud/console-components';

export default () => {
  const VariableUiRef = useRef(null);
  const onSubmit = async () => {
    const res = await VariableUiRef.current.validate();
    console.log(res ? '校验成功' : '校验失败');
  };
  return (
    <>
      <Button type="primary" onClick={() => onSubmit()} style={{ marginBottom: 20 }}>
        校验
      </Button>
      <VariableUi onChange={console.log} ref={VariableUiRef} />
    </>
  );
};
```

### Field 用法

```tsx
import React from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button } from '@alicloud/console-components';
import VariableUi from '@serverless-cd/variable-ui';

export default () => {
  const field = Field.useField();
  const { init, getValue } = field;
  const initValue = { aa: '11' };
  const onSubmit = () => {
    console.log(getValue('data'), 'getValue');
  };
  return (
    <>
      <Button type="primary" onClick={() => onSubmit()} style={{ marginBottom: 20 }}>
        submit
      </Button>
      <VariableUi
        {...init('data', {
          initValue: initValue,
          props: {
            onChange: console.log,
          },
        })}
      />
    </>
  );
};
```
