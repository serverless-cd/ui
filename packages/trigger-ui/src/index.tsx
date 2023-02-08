import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { TriggersProps, PR, PUSH } from './types';
import {
  map,
  get,
  noop,
  isEmpty,
  keys,
  set,
  forEach,
  find,
  includes,
  filter,
  uniq,
  uniqWith,
  isEqual,
} from 'lodash';
import { Field } from '@alicloud/console-components';
import StrictModeTrigger from './strict-mode';
import NormalModeTrigger from './normal-mode';
import { STRICT_TYPE } from './constants';
import './index.less';

const NormalDataFormats = [
  {
    type: STRICT_TYPE.PUSH,
    formatKey: 'push.branches',
    branchType: 'branches',
  },
  {
    type: STRICT_TYPE.PUSH,
    formatKey: 'push.tags',
    branchType: 'tags',
  },
  {
    type: STRICT_TYPE.PUSH_REQUEST,
    formatKey: 'pull_request.branches',
    branchType: 'branches',
  },
];

// 严格模式 数据转化为推荐格式
export const valuesFormat = (values) => {
  if (!get(values, 'triggerType')) return values;
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

//标准模式 数据转化为推荐格式
export const normalValuesFormat = (values) => {
  const findValue = filter(values, (v, key) =>
    includes(['push-enable', 'pull_request-enable'], key),
  );
  if (isEmpty(findValue)) return values;
  let newValue = {};
  forEach(keys(values), (key) => {
    if (key === 'push-enable' && values[key]) {
      const branchValues = get(values, 'push-branchesValues');
      const tagsValues = get(values, 'push-tagsValues');
      if (get(values, 'push-branchesEnable') && !isEmpty(branchValues)) {
        set(newValue, 'push.branches', againstAnalysisValue(branchValues, 'push'));
      }
      if (get(values, 'push-tagsEnable') && !isEmpty(tagsValues)) {
        set(newValue, 'push.tags', againstAnalysisValue(tagsValues, 'push'));
      }
    } else if (key === 'pull_request-enable' && values[key]) {
      const branchValues = get(values, 'pull_request-branchesValues');
      const typesValues = get(values, 'pull_request-types');
      if (get(values, 'pull_request-branchesEnable') && !isEmpty(branchValues)) {
        set(newValue, `pull_request.branches`, againstAnalysisValue(branchValues, 'pull_request'));
        set(newValue, `pull_request.types`, typesValues);
      }
    }
  });
  return newValue;
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
    set(newValues, 'triggerType', STRICT_TYPE.TAG);
    set(newValues, `${STRICT_TYPE.TAG}Value`, get(tags, '[0]', ''));
  }
  return newValues;
};
// 数据转为标准的数据结构
const againstParseNormalValues = (values) => {
  const findValue = find(values, (v, key) => includes(['push-enable', 'pull_request-enable'], key));
  if (findValue) return values;
  if (isEmpty(values)) return { 'push-enable': true, 'push-branchesEnable': true };
  let newValues = {};
  map(NormalDataFormats, ({ type, formatKey, branchType }) => {
    const triggerValue = get(values, formatKey);
    if (!isEmpty(triggerValue)) {
      set(newValues, `${type}-enable`, true);
      set(newValues, `${type}-${branchType}Enable`, true);
      set(newValues, `${type}-${branchType}Values`, analysisValue(triggerValue, type));
      if (type === PR) {
        set(newValues, `${type}-types`, get(values, 'pull_request.types'));
      }
    }
  });
  return newValues;
};

const getTriggerValue = (values, triggerType) => {
  return get(values, `${triggerType}Value`) ? [get(values, `${triggerType}Value`)] : [];
};

const analysisValue = (value = {}, type) => {
  let newValue = [];
  forEach(keys(value), (key) => {
    newValue = newValue.concat(
      map(value[key], (v) => {
        if (type === PUSH) {
          return { type: key, target: v };
        } else {
          return { type: key, target: v.target, source: v.source };
        }
      }),
    );
  });
  return newValue;
};

const againstAnalysisValue = (value = [], triggerType) => {
  let newValue = {};
  forEach(value, ({ type, target, source }) => {
    const lastValue = get(newValue, `${type}`, []);
    lastValue.push(triggerType === PUSH ? target : { target, source });
    set(newValue, `${type}`, triggerType === PUSH ? uniq(lastValue) : uniqWith(lastValue, isEqual));
  });
  return newValue;
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
