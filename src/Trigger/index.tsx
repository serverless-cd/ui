import React, { useState, forwardRef, useImperativeHandle } from 'react';
import TriggerType from './TriggerType';
import { TriggersProps, PR, PUSH } from './types';
import { map, get, noop, isEmpty, keys, uniq, set, omit } from 'lodash';
import { Field } from '@alicloud/console-components';
import StrictModeTrigger from './strict-mode';
import { TriggerTypes } from './constants';
import './index.less';

const uniqOrOmitTriggers = (trigger, mode) => {
  const newTrigger = {};
  map(['push.branches', 'push.tags', 'pull_request.branches', 'pull_request.types'], (item) => {
    let matchType = get(trigger, item, {});
    if (!isEmpty(matchType)) {
      if (item === 'pull_request.types') {
        set(newTrigger, item, matchType);
      } else {
        map(keys(matchType), (matchKey) => {
          if (matchType[matchKey].length > 1) {
            matchType[matchKey] = uniq(matchType[matchKey]);
          }

          if (isEmpty(matchType[matchKey]) && matchKey !== 'prefix' && mode === 'normal') {
            matchType = omit(matchType, [matchKey]);
          }
        });
        set(newTrigger, item, matchType);
      }
    }
  });
  return newTrigger;
};

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

  const [triggerValues] = useState(
    isEmpty(value) ? { push: { branches: { precise: [] } } } : value,
  );

  const field = Field.useField({
    onChange: () => {
      let trigger = {};

      if (mode === 'normal') {
        const push = field.getValue(PUSH);
        const pr = field.getValue(PR);

        if (!isEmpty(push)) {
          trigger[PUSH] = push;
        }
        if (!isEmpty(pr)) {
          trigger[PR] = pr;
        }
      }

      if (mode === 'strict') {
        trigger = field.getValue('strict');
      }
      trigger = uniqOrOmitTriggers(trigger, mode);

      onChange(trigger);
    },
  });
  const { init, setValue, validate } = field;

  useImperativeHandle(ref, () => ({
    validate: () => {
      return new Promise((resolve) => {
        validate((error) => (error ? resolve(false) : resolve(true)));
      });
    },
  }));

  return (
    <>
      {mode === 'normal' &&
        map(TriggerTypes, (labelKey) => {
          const initValue = get(triggerValues, labelKey, {});
          return (
            <TriggerType
              {...init(labelKey, { initValue })}
              labelKey={labelKey}
              key={labelKey}
              disabled={disabled}
              setValue={setValue}
              field={field}
            />
          );
        })}
      {mode === 'strict' && (
        <StrictModeTrigger
          {...init('strict', { initValue: triggerValues })}
          triggerValues={triggerValues}
          disabled={disabled}
          loading={loading}
          branchList={branchList}
          field={field}
          isRefresh={isRefresh}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};

export default forwardRef(Trigger);
