## Notifiy

Demo:

```tsx
import React, { useEffect, useState, useRef } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button } from '@alicloud/console-components';
import DingTalk from '@serverless-cd/dingtalk-ui';

// 使用方式
//  组件被field接管。

export default () => {
  const field = Field.useField();
  const { init, getValue, setValue, getValues, validate } = field;
  const [disabled, setDisabled] = useState(true);
  const values = getValues();
  const dingdingRef = useRef(null);
  const onVerify = () => {
    new Promise((resolve, reject) => {
      dingdingRef.current.validate((error, values) => {
        console.log(error, values, 'values');
        return error ? reject(false) : resolve(true);
      });
    });
  };

  const onEdit = () => {
    setDisabled(!disabled);
  };

  const onSubmit = () => {
    console.log(getValue('dingding'), 'dingding');
  };

  const initValue = {
    webhook: 'https://xxxxx.com',
    enable: true,
    secret: 'xxxxxxx',
    skipOnSuccess: false,
    atMobiles: '',
    atUserIds: '',
    messageContent: 'e2e scenario: default content.',
    remindType: 'owner',
  };

  return (
    <>
      <DingTalk
        {...init('dingding', { initValue })}
        isPreview={disabled}
        initValue={initValue}
        ref={dingdingRef}
      />
      <Button onClick={onVerify}>校验</Button>
      <Button onClick={onEdit}>{disabled ? '编辑' : '保存'}</Button>
      <Button onClick={onSubmit}>提交</Button>
    </>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
