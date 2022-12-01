## Trigger

Demo:

mode： normal strict

```tsx
import React, { useEffect, useState, useRef } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button } from '@alicloud/console-components';
import { Trigger } from '@serverless-cd/ui';

// 使用方式1
// 1. 接收 value 和 onChange

// export default () => {
//   return <Trigger value={} onChange={} />;
// };

// 如果1是ok的，那么2也是支持的
// 2. 组件可以被field接管。。 https://csr632.gitee.io/alibabacloud-console-components/base-components/field#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E6%8E%A5%E5%85%A5field%E6%A0%87%E5%87%86

// export default () => {
//   return <Trigger {...init('trigger')} />;
// };

export default () => {
  const field = Field.useField();
  const [mode, setMode] = useState('strict');
  const { init, getValue, setValue } = field;
  const [loading, setLoading] = useState(true);
  const [branchList, setBranchList] = useState([
    { label: 'master', value: 'master' },
    { label: 'main', value: 'main' },
  ]);

  const triggerRef = useRef();
  const initValue = {};

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    console.log(getValue('trigger'), 'trigger');
  }, [getValue('trigger')]);

  const onClick = (mode) => {
    setValue('trigger', {});
    setMode(mode);
  };

  const verifyTrigger = () => {
    triggerRef.current.validate().then((validate) => {
      console.log(validate, 'validate');
    });
  };
  const onRefresh = () => {
    setLoading(true);

    setTimeout(() => {
      setBranchList([...branchList, { label: 'test', value: 'test' }]);
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Button style={{ marginRight: 20 }} onClick={() => onClick('strict')}>
          strict
        </Button>
        <Button onClick={() => onClick('normal')}>normal</Button>
        <Button onClick={verifyTrigger}>校验</Button>
      </div>
      <Trigger
        {...init('trigger', { initValue })}
        mode={mode}
        loading={loading}
        disabled={false}
        isRefresh
        onRefresh={onRefresh}
        branchList={branchList}
        ref={triggerRef}
      />
    </div>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
