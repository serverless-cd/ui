import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { TriggersProps } from './types';
import { noop } from 'lodash';
import { Field } from '@alicloud/console-components';
import StrictModeTrigger from './strict-mode';
import NormalModeTrigger from './normal-mode';
import { againstParseNormalValues, againstParseValues, normalValuesFormat } from './utils/util';
import './index.less';

const Trigger = (props: TriggersProps, ref) => {
  const {
    value,
    onChange = noop,
    mode = 'normal',
    disabled = false,
    loading,
    branchList,
    isRefresh,
    onRefresh,
  } = props;
  const strictRef = useRef(null);
  const normalRef = useRef(null);

  const field = Field.useField({
    onChange: (name) => {
      let trigger = {};
      if (name === 'normal') {
        trigger = normalValuesFormat(field.getValue('normal'));
      }
      if (name === 'strict') {
        trigger = field.getValue('strict');
      }
      onChange(trigger);
    },
  });

  const { init } = field;

  useImperativeHandle(ref, () => ({
    validate: () => {
      return new Promise((resolve) => {
        const triggerValidate =
          mode === 'strict' ? strictRef.current.validate : normalRef.current.validate;
        triggerValidate((error) => (error ? resolve(false) : resolve(true)));
      });
    },
  }));

  return (
    <>
      {mode === 'normal' && (
        <NormalModeTrigger
          {...init('normal')}
          initValue={againstParseNormalValues(value)}
          disabled={disabled}
          ref={normalRef}
        />
      )}
      {mode === 'strict' && (
        <StrictModeTrigger
          {...init('strict')}
          initValue={againstParseValues(value)}
          disabled={disabled}
          loading={loading}
          branchList={branchList}
          ref={strictRef}
          isRefresh={isRefresh}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};

export default forwardRef(Trigger);
