import React, { useState, useEffect } from 'react';
import _, { uniqueId, concat, map, filter, isEqual } from 'lodash';
import { Button, Icon } from '@alicloud/console-components';
import { Input } from '@formily/next';
import { connect, mapProps } from '@formily/react';
import { mapSize } from '@formily/next/lib/__builtins__';

const ArrayStrings = (props) => {
  const { value, onChange, limit, placeholder } = props;

  let defaultValue = [];

  if (value) {
    for (const key in value) {
      const ele = value[key];
      defaultValue.push({ value: ele, id: uniqueId() });
    }
  }

  const [list, setList] = useState(defaultValue);

  const handleAdd = () => {
    setList(concat(list, { id: uniqueId() }));
  };

  const handleDelete = (id) => {
    const option = filter(list, (item) => item.id !== id);
    setList(option);
  };

  const handleChangeValue = (value, id) => {
    const option = map(list, (item) => (item.id === id ? { ...item, value } : item));
    setList(option);
  };

  useEffect(() => {
    const option = map(list, (item) => {
      if (item.existed) {
        const existedOption = filter(list, (obj) => obj.key === item.key);
        // 优先判断key是否重复，然后判断数据输入是否完整
        return {
          ...item,
          existed: existedOption.length > 1,
          completed: item.key && item.value,
        };
      } else {
        return {
          ...item,
          completed: item.key && item.value,
        };
      }
    });
    !isEqual(list, option) && setList(option);

    const tmp = _.map(list, (item) => item.value);
    onChange(tmp);
  }, [list]);

  return (
    <>
      {_.map(list, (item) => {
        return (
          <div
            key={item.id}
            style={{
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Input
              style={{ flex: 1 }}
              value={item.value}
              onChange={(value) => handleChangeValue(value, item.id)}
              placeholder={placeholder}
            />
            <Icon
              style={{ margin: '0px 16px', cursor: 'pointer' }}
              size="xs"
              type="ashbin"
              onClick={() => handleDelete(item.id)}
            />
          </div>
        );
      })}
      {(limit ? list.length < limit : true) && <Button onClick={handleAdd}>+添加条目</Button>}
    </>
  );
};

export default connect(
  ArrayStrings,
  mapProps(
    {
      value: 'value',
    },
    mapSize,
  ),
);
