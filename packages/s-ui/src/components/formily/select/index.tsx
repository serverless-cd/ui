import { connect, mapReadPretty, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { Select as NextSelect } from '@alicloud/console-components';
import { PreviewText } from '@formily/next/lib/preview-text';
import { mapSize, mapStatus } from '@formily/next/lib/__builtins__';

const patchDataSource = (dataSource: any = []) => {
  const removeEmptyChildren = (data: any) => {
    const result = { ...data };
    if (!result.children || result.children.length === 0) {
      delete result.children;
    } else {
      result.children = result.children.map(removeEmptyChildren);
    }
    return result;
  };
  return dataSource.map(removeEmptyChildren);
};

export const Select = connect(
  NextSelect,
  mapProps(
    (props, field) => {
      if (isVoidField(field)) {
        return props;
      }
      return {
        ...props,
        dataSource: patchDataSource(props.dataSource ?? field?.dataSource),
        hasClear: true,
      };
    },
    mapSize,
    mapStatus,
  ),
  mapReadPretty(PreviewText.Select),
);

export default Select;
