import React, { useImperativeHandle, forwardRef } from 'react';
import { Field } from '@alicloud/console-components';
import { map, keys, includes } from 'lodash';
import { TriggerTypes } from '../constants';
import TriggerType from './TriggerType';

type IProps = {
  disabled: boolean;
  value?: any;
  onChange?: Function;
  initValue: any;
};

const NormalModeTrigger = (props: IProps, ref) => {
  const { disabled, onChange, initValue } = props;

  const field = Field.useField({
    onChange: () => {
      onChange(getValues());
    },
  });
  const { getValues, validate } = field;

  useImperativeHandle(ref, () => ({
    validate,
  }));

  const getTypeInitValue = (labelKey) => {
    let newValues = {};
    map(keys(initValue), (key) => {
      if (includes(key, labelKey)) {
        newValues[key] = initValue[key];
      }
    });
    return newValues;
  };

  return (
    <>
      {map(TriggerTypes, (labelKey) => {
        return (
          <TriggerType
            initValue={getTypeInitValue(labelKey)}
            labelKey={labelKey}
            key={labelKey}
            disabled={disabled}
            field={field}
          />
        );
      })}
    </>
  );
};

export default forwardRef(NormalModeTrigger);
