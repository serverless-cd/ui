import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { StrictModeProps } from '../types';
import { map, noop } from 'lodash';
import { Radio, Field } from '@alicloud/console-components';
import { STRICT_TYPE, STRICT_TRIGGER_TYPES } from '../constants';
import StrictMatch from './StrictMatch';
import '../index.less';

const RadioGroup = Radio.Group;

const StrictModeTrigger = (props: StrictModeProps, ref) => {
  const {
    disabled = false,
    loading = false,
    branchList,
    isRefresh,
    onRefresh,
    initValue,
    onChange = noop,
  } = props;

  const [newBranchList, setNewBranchList] = useState(branchList);
  const field = Field.useField({
    onChange: () => {
      onChange(getValues());
    },
  });
  const { init, getValue, validate, getValues } = field;

  useEffect(() => {
    setNewBranchList(branchList);
  }, [JSON.stringify(branchList)]);

  useImperativeHandle(ref, () => ({
    validate,
  }));

  return (
    <RadioGroup
      itemDirection="ver"
      {...init('triggerType', {
        initValue: initValue['triggerType'] || STRICT_TYPE.PUSH,
      })}
      disabled={disabled}
      className="strict-mode-radio-Group full-width"
    >
      {map(STRICT_TRIGGER_TYPES, ({ value, label, help }) => {
        return (
          <div style={{ marginBottom: 20 }} key={value}>
            <Radio value={value}>{label}</Radio>
            {getValue('triggerType') === value && (
              <StrictMatch
                type={value}
                loading={loading}
                help={help}
                field={field}
                disabled={disabled}
                initValue={initValue}
                isRefresh={isRefresh}
                onRefresh={onRefresh}
                branchList={newBranchList}
                setBranchList={setNewBranchList}
              />
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default forwardRef(StrictModeTrigger);
