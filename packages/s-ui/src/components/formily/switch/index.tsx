import { connect, mapProps } from '@formily/react';
import { mapSize } from '@formily/next/lib/__builtins__';
import { Switch } from '@alicloud/console-components';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

const Fc = (props: any) => {
  const { value, dataSource, onChange } = props;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // dataSource 存在的话 做额外的逻辑处理 优化 tracingConfig 的case（以switch替换select渲染）
    if (dataSource) {
      const [first] = dataSource;
      setChecked(first.value === value);
    }
  }, [JSON.stringify(props)]);

  if (dataSource) {
    const handleChange = (val: boolean) => {
      setChecked(val);
      const [first, last] = dataSource;
      onChange(val ? first.value : last.value);
    };
    return <Switch {...props} checked={checked} onChange={handleChange} />;
  }
  return <Switch {...props} defaultChecked={value} />;
};

export default connect(
  Fc,
  mapProps(
    {
      value: 'value',
      dataSource: 'dataSource',
    },
    mapSize,
  ),
);
