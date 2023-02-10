import React, { FC, useEffect, useState } from 'react';
import { Field } from '@formily/core';
import { connect, mapReadPretty, mapProps } from '@formily/react';
import { Select as NextSelect, Icon, Button } from '@alifd/next';
import { PreviewText } from '@formily/next/lib/preview-text';
import { mapSize, mapStatus } from '@formily/next/lib/__builtins__';
import { find, map } from 'lodash';

type IDataItem = {
  label: string;
  value: string;
};

type IProps = {
  field: Field;
  fetchData: (field: Field) => Promise<IDataItem[]>;
  value?: string;
  dependencies?: string[];
};

const CustomSelect: FC<IProps> = (props) => {
  const { fetchData, field, value: originValue, dependencies, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(originValue);
  const [data, setData] = useState<IDataItem[]>([]);

  const fetchInit = async () => {
    setLoading(true);
    const data = await fetchData(field);
    const useDefault = find(data, (item) => item.value === value);
    const newValue = useDefault ? value : undefined;
    onChange(newValue);
    setLoading(false);
    setData(data);
  };

  useEffect(
    () => {
      fetchInit();
    },
    map(dependencies, (item) => {
      return typeof rest[item] === 'object' ? JSON.stringify(rest[item]) : rest[item];
    }),
  );

  const handleRefresh = async () => {
    fetchInit();
  };
  const onChange = (value: string) => {
    setValue(value);
    field.setValue(value);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <NextSelect
        style={{ flex: 1 }}
        {...rest}
        value={value}
        onChange={onChange}
        state={loading ? 'loading' : undefined}
        dataSource={data}
        disabled={loading}
        hasClear
      />
      <Button
        type="primary"
        text
        style={{ margin: '0 16px' }}
        disabled={loading}
        onClick={handleRefresh}
      >
        <Icon type="refresh" />
      </Button>
    </div>
  );
};

const AsyncSelect: FC<IProps> = connect(
  CustomSelect,
  mapProps(
    (props, field) => {
      return {
        ...props,
        field: field as Field,
      };
    },
    mapSize,
    mapStatus,
  ),
  mapReadPretty(PreviewText.Select),
);

export default AsyncSelect;
