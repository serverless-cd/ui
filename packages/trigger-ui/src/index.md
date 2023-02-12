## Trigger

Demo:

mode： normal strict

```tsx
import React, { useEffect, useState, useRef } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button } from '@alicloud/console-components';
import Trigger, { valuesFormat } from '@serverless-cd/trigger-ui';

export default () => {
  const field = Field.useField();
  const [mode, setMode] = useState('normal');
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

  const onChangeMode = (mode) => {
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
        <Button style={{ marginRight: 20 }} onClick={() => onChangeMode('strict')}>
          strict
        </Button>
        <Button style={{ marginRight: 20 }} onClick={() => onChangeMode('normal')}>
          normal
        </Button>
        <Button style={{ marginRight: 20 }} onClick={verifyTrigger}>
          校验
        </Button>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => {
            console.log(getValue('trigger'), 'trigger');
          }}
        >
          Submit
        </Button>
      </div>
      <Trigger
        {...init('trigger', {
          initValue: {
            pull_request: {
              branches: {
                prefix: [
                  {
                    target: '1',
                    source: '1',
                  },
                ],
              },
              types: ['merged', 'closed'],
            },
          },
        })}
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
