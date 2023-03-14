import React, { useState, useEffect } from 'react';
import _, { uniqueId, concat, map, filter, includes, isEqual } from 'lodash';
import { Grid, Button, Icon } from '@alicloud/console-components';
import { Input } from '@formily/next';
import { connect, mapProps } from '@formily/react';
import { mapSize } from '@formily/next/lib/__builtins__';

const { Row, Col } = Grid;

const KeyValue = (props) => {
  const {
    showEqual = false,
    value,
    onChange,
    limit,
    keyText = '变量',
    valueText = '值',
    type = 'object',
  } = props;

  let defaultValue = [];
  if (value) {
    // value 值为 object, array
    // object 可参考 环境变量 的使用case
    // array  可参考 DNS 的使用case
    defaultValue =
      type === 'object'
        ? _.map(_.toPairs(value), (d) => ({
            key: d[0],
            value: d[1],
            id: uniqueId(),
          }))
        : _.map(value, (item) => ({
            key: item.name,
            value: item.value,
            id: uniqueId(),
          }));
  }
  const [list, setList] = useState(defaultValue);
  const handleAdd = () => {
    setList(concat(list, { id: uniqueId() }));
  };

  const handleDelete = (id) => {
    const option = filter(list, (item) => item.id !== id);
    setList(option);
  };

  const handleChangeKey = (key, id) => {
    const keys = map(list, (item) => item.key);
    const option = map(list, (item) =>
      item.id === id ? { ...item, key, existed: includes(keys, key) } : item,
    );
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

    if (type === 'object') {
      const tmp = {};
      _.each(list, (item) => {
        tmp[item.key] = item.value;
      });
      onChange(tmp);
    } else {
      const tmp = _.map(list, (item) => ({
        name: item.key,
        value: item.value,
      }));
      onChange(tmp);
    }
  }, [list]);

  return (
    <div>
      {_.map(list, (item) => {
        return (
          <Row
            key={item.id}
            style={{
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Col span="10" style={{ position: 'relative' }}>
              <Input
                addonTextBefore={keyText}
                style={{ width: '100%' }}
                value={item.key}
                onChange={(key) => handleChangeKey(key, item.id)}
              />
            </Col>
            <Col span="2" style={{ textAlign: 'center' }}>
              {showEqual && '='}
            </Col>
            <Col span="10">
              <Input
                addonTextBefore={valueText}
                style={{ width: '100%' }}
                value={item.value}
                onChange={(value) => handleChangeValue(value, item.id)}
              />
            </Col>
            <Col span="2">
              {
                <Icon
                  style={{ marginLeft: 16, cursor: 'pointer' }}
                  size="xs"
                  type="ashbin"
                  onClick={() => handleDelete(item.id)}
                />
              }
            </Col>
          </Row>
        );
      })}
      {(limit ? list.length < limit : true) && <Button onClick={handleAdd}>+添加条目</Button>}
    </div>
  );
};

// export default KeyValue;
export default connect(
  KeyValue,
  mapProps(
    {
      value: 'value',
      keyText: 'keyText',
      valueText: 'valueText',
      type: 'type',
    } as any,
    mapSize,
  ),
);
