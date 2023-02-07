import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import TriggerType from './TriggerType';
import { TriggersProps, PR, PUSH } from './types';
import { map, get, noop, isEmpty, keys, uniq, set, omit, forEach } from 'lodash';
import { Field } from '@alicloud/console-components';
import StrictModeTrigger from './strict-mode';
import { TriggerTypes, STRICT_TYPE } from './constants';
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
// 数据转化为推荐格式
export const valuesFormat = (values) => {
  const { triggerType } = values;
  let newValues = {};
  if (triggerType === STRICT_TYPE.PUSH) {
    newValues = {
      push: {
        branches: {
          precise: getTriggerValue(values, triggerType),
        },
      },
    };
  } else if (triggerType === STRICT_TYPE.TAG) {
    newValues = {
      push: {
        tags: {
          prefix: getTriggerValue(values, triggerType),
        },
      },
    };
  } else if (triggerType === STRICT_TYPE.PUSH_REQUEST) {
    newValues = {
      pull_request: {
        branches: {
          precise: [
            {
              target: get(values, `${triggerType}Target`, ''),
              source: get(values, `${triggerType}Source`, ''),
            },
          ],
        },
        types: get(values, `${triggerType}Types`, ['merged']),
      },
    };
  }
  return newValues;
};
// 数据转为严格模式的数据结构
const againstParseValues = (values) => {
  if (get(values, 'triggerType')) return values;
  let newValues = { triggerType: STRICT_TYPE.PUSH };
  let triggerType;
  let currentTriggerValue = {};
  forEach(keys(values), (key) => {
    if (values[key]['tags']) {
      triggerType = 'tag';
    } else {
      triggerType = key;
    }
    currentTriggerValue = values[key];
  });

  set(newValues, 'triggerType', triggerType);
  if (triggerType === STRICT_TYPE.PUSH_REQUEST) {
    const precise = get(currentTriggerValue, 'branches.precise[0]', {});
    const types = get(currentTriggerValue, 'types', []);
    if (!isEmpty(precise)) {
      set(newValues, `${triggerType}Target`, get(precise, 'target'));
      set(newValues, `${triggerType}Source`, get(precise, 'source'));
    }
    if (!isEmpty(types)) {
      set(newValues, `${triggerType}Types`, types);
    }
  } else if (triggerType === STRICT_TYPE.PUSH) {
    const push = get(currentTriggerValue, 'branches.precise', []);
    if (!isEmpty(push)) {
      set(newValues, `${triggerType}Value`, get(push, '[0]'));
    }
  } else if (triggerType === STRICT_TYPE.TAG) {
    const tags = get(currentTriggerValue, 'tags.prefix', []);
    if (!isEmpty(tags)) {
      set(newValues, 'triggerType', STRICT_TYPE.TAG);
      set(newValues, `${STRICT_TYPE.TAG}Value`, get(tags, '[0]'));
    }
  }
  return newValues;
};

const getTriggerValue = (values, triggerType) => {
  return get(values, `${triggerType}Value`) ? [get(values, `${triggerType}Value`)] : [];
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

  const strictRef = useRef(null);

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
        trigger = uniqOrOmitTriggers(trigger, mode);
      }
      if (mode === 'strict') {
        trigger = field.getValue('strict');
      }
      onChange(trigger);
    },
  });

  const { init, setValue, validate } = field;

  useImperativeHandle(ref, () => ({
    validate: () => {
      return new Promise((resolve) => {
        const triggerValidate = mode === 'strict' ? strictRef.current.validate : validate;
        triggerValidate((error) => (error ? resolve(false) : resolve(true)));
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
