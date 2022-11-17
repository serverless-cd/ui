## Notifiy

Demo:

```tsx
import React, { useEffect, useState } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button } from '@alicloud/console-components';
import { Notifiy } from '@serverless-cd/ui';

// 使用方式
//  组件被field接管。

export default () => {
  const field = Field.useField();
  const { init, getValue, setValue, getValues, validate } = field;
  const values = getValues();
  const onClick = () => {
    new Promise((resolve, reject) => {
      validate((error, values) => {
        console.log(values, 'values');
        return error ? reject(false) : resolve(true);
      });
    });
  };

  return (
    <>
      <Notifiy field={field} />
      <Button onClick={onClick}>校验</Button>
    </>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
