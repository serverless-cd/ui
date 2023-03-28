---
title: Dingtalk 通知
toc: content
---

# Dingtalk 通知

## 基本用法

```tsx
import { Button, Field, Loading } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import DingTalk from '@serverless-cd/dingtalk-ui';
import React, { useRef, useState } from 'react';

// 使用方式
//  组件被field接管。

export default () => {
  const field = Field.useField();
  const { init, getValue, setValue, getValues, validate } = field;
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = useState(false);

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

  const onAsync = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      setValue('dingding', { ...initValue, webhook: 'https://111.com' });
    }, [1000]);
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
    <Loading visible={visible}>
      <DingTalk
        {...init('dingding', {
          initValue: {},
        })}
        isPreview={disabled}
        initValue={initValue}
        ref={dingdingRef}
      />
      <Button onClick={onVerify}>校验</Button>
      <Button onClick={onEdit}>{disabled ? '编辑' : '保存'}</Button>
      <Button onClick={onSubmit}>提交</Button>
      <Button onClick={onAsync}>异步回填数据</Button>
    </Loading>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
