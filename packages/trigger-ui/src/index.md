---
title: Trigger 触发
toc: content
---

# Trigger 触发

## 基本用法

```tsx
import { Button, Field } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import Trigger from '@serverless-cd/trigger-ui';
import React, { useEffect, useRef, useState } from 'react';

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
        <Button
          style={{ marginRight: 20 }}
          onClick={() => onChangeMode('strict')}
        >
          strict
        </Button>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => onChangeMode('normal')}
        >
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
          initValue: {},
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

## 预览效果

```tsx
import '@alicloud/console-components/dist/wind.css';
import Trigger from '@serverless-cd/trigger-ui';
import React from 'react';

const TriggerPreview = Trigger.Preview;

const dataSource = [];

export default () => {
  return <TriggerPreview dataSource={dataSource} />;
};
```

## 严格模式

```tsx
import { Button, Field } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import Trigger, { valuesFormat } from '@serverless-cd/trigger-ui';
import React, { useEffect, useRef, useState } from 'react';

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
        <Button style={{ marginRight: 20 }} onClick={verifyTrigger}>
          校验
        </Button>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => {
            console.log(valuesFormat(getValue('trigger')), 'trigger');
          }}
        >
          Submit
        </Button>
      </div>
      <Trigger
        {...init('trigger', {
          initValue: {},
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

## 自定义 value

```tsx
import React, { useEffect, useState, useRef } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button } from '@alicloud/console-components';
import Trigger, { valuesFormat } from '@serverless-cd/trigger-ui';

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

  const valueRender = (item) => {
    return `${item.value} (环境name)`;
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Button style={{ marginRight: 20 }} onClick={verifyTrigger}>
          校验
        </Button>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => {
            console.log(valuesFormat(getValue('trigger')), 'trigger');
          }}
        >
          Submit
        </Button>
      </div>
      <Trigger
        {...init('trigger', {
          initValue: {},
        })}
        mode={mode}
        loading={loading}
        disabled={false}
        valueRender={valueRender}
        isRefresh
        onRefresh={onRefresh}
        branchList={branchList}
        ref={triggerRef}
      />
    </div>
  );
};
```

## 严格模式只禁用 分支下拉框

```tsx
import React, { useEffect, useState, useRef } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button } from '@alicloud/console-components';
import Trigger, { valuesFormat } from '@serverless-cd/trigger-ui';

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

  const valueRender = (item) => {
    return `${item.value} (环境name)`;
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Button style={{ marginRight: 20 }} onClick={verifyTrigger}>
          校验
        </Button>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => {
            console.log(valuesFormat(getValue('trigger')), 'trigger');
          }}
        >
          Submit
        </Button>
      </div>
      <Trigger
        {...init('trigger', {
          initValue: {},
        })}
        mode={mode}
        loading={loading}
        disabled={false}
        valueRender={valueRender}
        selectBranchConfig={{ disabled: true }}
        isRefresh
        onRefresh={onRefresh}
        branchList={branchList}
        ref={triggerRef}
      />
    </div>
  );
};
```
