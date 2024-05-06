import { STRICT_TYPE } from '../constants';
import {
  get,
  isEmpty,
  keys,
  set,
  forEach,
  includes,
  filter,
  uniq,
  uniqWith,
  isEqual,
  find,
  map,
} from 'lodash';
import { PR, PUSH } from '../types';

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
export const againstParseValues = (values) => {
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
      if (get(precise, 'trigger')) {// 添加手动选择/ 正则表达式
        set(newValues, `${triggerType}Trigger`, get(precise, 'trigger'));
      }
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
export const againstParseNormalValues = (values) => {
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

const againstAnalysisValue = (value = [], triggerType) => {
  let newValue = {};
  forEach(value, ({ type, target, source }) => {
    const lastValue = get(newValue, `${type}`, []);
    lastValue.push(triggerType === PUSH ? target : { target, source });
    set(newValue, `${type}`, triggerType === PUSH ? uniq(lastValue) : uniqWith(lastValue, isEqual));
  });
  return newValue;
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
