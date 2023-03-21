## ResourceUi

Demo:

```tsx
import React, { useEffect, useState, useRef } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button, Loading } from '@alicloud/console-components';
import ResourceUi, { onToYamlString } from '@serverless-cd/resource-ui';

// 使用方式
//  组件被field接管。

export default () => {
  const field = Field.useField();
  const { init, getValue, setValue, getValues, validate } = field;
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const regionList = [{ value: 'cn-hangzhou', label: '华东1 (杭州)' }];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          const yamlString = onToYamlString(getValue('yamlConfig'));
          console.log(yamlString, '----- yamlString');
        }}
      >
        生成yaml string
      </Button>
      <ResourceUi {...init('yamlConfig')} regionList={regionList} />
    </>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
