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
  const [disabled, setDisabled] = useState(true);
  const values = getValues();
  const onClick = () => {
    new Promise((resolve, reject) => {
      validate((error, values) => {
        console.log(values, 'values');
        return error ? reject(false) : resolve(true);
      });
    });
  };

  const onEdit = () => {
    setDisabled(!disabled);
  };

  const initValue = {
    webhook:
      'https://oapi.dingtalk.com/robot/send?access_token=ec05814556ffb676e4f4e554334effe6fa3fb3546f2c96969167ac685cfcf3f7',
    enable: true,
    secret: 'SEC19fc9b9192c3a7562cf20d5c0915ddd4176e1e60dc24aa96ebc83e4c3f52dfd3',
    message: {
      at: {
        isAtAll: true,
        atUserIds: [],
        atMobiles: [],
      },
      text: {
        content: 'e2e scenario: default content.',
      },
      msgtype: 'text',
    },
    skipOnSuccess: false,
    isAtAll: true,
    atMobiles: '',
    atUserIds: '',
    messageContent: 'e2e scenario: default content.',
    deployFile: 's.yaml',
    remindType: 'owner',
  };

  return (
    <>
      <Notifiy field={field} isPreview={disabled} initValue={initValue} />
      <Button onClick={onClick}>校验</Button>
      <Button onClick={onEdit}>{disabled ? '编辑' : '保存'}</Button>
    </>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
