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
    onChange: (name, value) => {
      if (name === 'pull_request-enable' && value) {
        setValue('pull_request-branchesEnable', true);
        setValue('pull_request-types', ['merged']);
      }
      onChange(getValues());
    },
  });
  const { getValues, validate, setValue } = field;

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
