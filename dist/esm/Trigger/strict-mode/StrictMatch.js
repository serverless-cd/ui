function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

import React, { useEffect, useState } from 'react';
import { PR } from '../types';
import { map, get, noop, isEmpty, keys, uniqueId } from 'lodash';
import { Radio, Input, Select, Form } from '@alicloud/console-components';
import { MatchTypeCheckedLabel, MatchTypes, MatchType, branchValuePlaceholder } from '../constants';
import Refresh from './Refresh';
import { i18n } from '../../utils';
import '../index.less';
var RadioGroup = Radio.Group;

var StrictMatch = function StrictMatch(props) {
  var _useState = useState(MatchType.BRANCHES),
    _useState2 = _slicedToArray(_useState, 2),
    initRadioValue = _useState2[0],
    setInitRadio = _useState2[1];

  var triggerChecked = props.triggerChecked,
    matchValues = props.matchValues,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? noop : _props$onChange,
    labelKey = props.labelKey,
    disabled = props.disabled,
    loading = props.loading,
    branchList = props.branchList,
    field = props.field,
    isRefresh = props.isRefresh,
    onRefresh = props.onRefresh;

  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    matchRuleList = _useState4[0],
    setMatchRuleList = _useState4[1];

  var _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    lastValue = _useState6[0],
    setLastValue = _useState6[1];

  var init = field.init,
    setValue = field.setValue,
    validate = field.validate;
  useEffect(
    function () {
      var triggerTypes = keys(matchValues).filter(function (type) {
        return type !== 'types';
      });

      if (!isEmpty(triggerTypes)) {
        setInitRadio(triggerTypes[0]);
      } else {
        setInitRadio(MatchType.BRANCHES);
      }

      formtMatchValues(matchValues[triggerTypes[0] || MatchType.BRANCHES]);
      setLastValue(
        _objectSpread(
          _objectSpread({}, lastValue),
          matchValues[triggerTypes[0] || MatchType.BRANCHES],
        ),
      );
    },
    [matchValues],
  );

  var formtMatchValues = function formtMatchValues(values) {
    if (!isEmpty(values)) {
      var MatchRuleTypes = keys(values);
      var MatchRuleValues = [];
      map(MatchRuleTypes, function (type) {
        var branchValues = isEmpty(values[type])
          ? [
              {
                type: type,
                target: '',
                source: '',
                id: uniqueId(),
              },
            ]
          : map(values[type], function (value) {
              return {
                type: type,
                target: labelKey === PR ? value.target : value,
                source: labelKey === PR ? value.source : '',
                id: uniqueId(),
              };
            });
        MatchRuleValues.push.apply(MatchRuleValues, _toConsumableArray(branchValues));
      });
      setMatchRuleList(MatchRuleValues);
    } else {
      setMatchRuleList([]);
    }
  };

  var matchChange = function matchChange(matchType) {
    var matchTypeValueKey = matchType === MatchType.BRANCHES ? 'precise' : 'prefix';
    setInitRadio(matchType);
    onChange(
      _defineProperty(
        {},
        matchType,
        _defineProperty({}, matchTypeValueKey, lastValue[matchTypeValueKey] || []),
      ),
    );
  };

  var checkValues = function checkValues(value, type, id) {
    var changeValues = map(matchRuleList, function (item) {
      item[type] = item.id === id ? value : item[type];
      return item;
    });
    return changeValues;
  };

  var onBranchValueChange = function onBranchValueChange(changeValues, matchLabelKey) {
    if (!isEmpty(changeValues)) {
      var formaValues = {};
      map(changeValues, function (item) {
        if (isEmpty(formaValues[item.type])) formaValues[item.type] = [];

        if (labelKey === PR) {
          formaValues[item.type].push({
            target: item.target,
            source: item.target !== item.source ? item.source : '',
          });
        } else {
          item.target && formaValues[item.type].push(item.target);
        }
      });
      onChange(_defineProperty({}, matchLabelKey, formaValues));
    }

    setMatchRuleList(changeValues);
  };

  var filterTargetValue = function filterTargetValue(value) {
    if (isEmpty(branchList)) return [];
    return map(branchList, function (branchItem) {
      var newItem = _objectSpread({}, branchItem);

      newItem.disabled = newItem.value === value;
      return newItem;
    });
  };

  return /*#__PURE__*/ React.createElement(
    RadioGroup,
    {
      value: initRadioValue,
      onChange: matchChange,
      style: {
        display: triggerChecked ? 'block' : 'none',
      },
      disabled: disabled,
    },
    map(MatchTypes, function (matchLabelKey) {
      if (labelKey === PR && matchLabelKey === 'tags') return;
      return /*#__PURE__*/ React.createElement(
        'div',
        {
          style: {
            margin: '16px 0 16px 26px',
            display: 'flex',
            alignItems: 'flex-start',
          },
        },
        /*#__PURE__*/ React.createElement(
          Radio,
          {
            value: matchLabelKey,
            disabled: disabled,
            className: labelKey === PR ? 'branch-radio-pr' : 'branch-radio',
          },
          MatchTypeCheckedLabel[matchLabelKey],
        ),
        initRadioValue === matchLabelKey &&
          /*#__PURE__*/ React.createElement(
            'div',
            {
              style: {
                display: initRadioValue === matchLabelKey ? 'block' : 'none',
                flex: 1,
              },
            },
            map(matchRuleList, function (value) {
              var matchType = get(value, 'type', 'prefix');
              var placeholder = branchValuePlaceholder[matchLabelKey][matchType];
              var branchValue = get(value, 'target', '');
              var sourceValue = get(value, 'source', '');
              var id = get(value, 'id', uniqueId());
              return /*#__PURE__*/ React.createElement(
                Form,
                {
                  field: field,
                  className: 'trigger-form',
                },
                matchLabelKey === 'tags'
                  ? /*#__PURE__*/ React.createElement(
                      Form.Item,
                      {
                        className: 'full-width',
                        labelAlign: 'left',
                      },
                      /*#__PURE__*/ React.createElement(Input, {
                        className: 'full-width',
                        placeholder: placeholder,
                        value: branchValue,
                        disabled: disabled,
                        onChange: function onChange(value) {
                          return onBranchValueChange(
                            checkValues(value, 'target', id),
                            matchLabelKey,
                          );
                        },
                      }),
                    )
                  : /*#__PURE__*/ React.createElement(
                      Form.Item,
                      {
                        required: true,
                        labelAlign: 'left',
                        label: labelKey === PR ? i18n('ui.trigger.target.branch') : '',
                        className: 'full-width',
                      },
                      /*#__PURE__*/ React.createElement(
                        Select,
                        _extends(
                          {
                            className: 'full-width',
                          },
                          init('target', {
                            props: {
                              onChange: function onChange(value) {
                                setValue('target', value);
                                onBranchValueChange(
                                  checkValues(value, 'target', id),
                                  matchLabelKey,
                                );
                              },
                            },
                            rules: [
                              {
                                required: true,
                                trigger: 'onChange',
                                message: '分支是必填项',
                              },
                            ],
                            initValue: branchValue,
                          }),
                          {
                            dataSource: branchList,
                            placeholder: placeholder,
                            value: branchValue,
                            disabled: disabled || loading,
                            state: loading ? 'loading' : undefined,
                          },
                        ),
                      ),
                    ),
                labelKey === PR &&
                  /*#__PURE__*/ React.createElement(
                    Form.Item,
                    {
                      labelAlign: 'left',
                      label: i18n('ui.trigger.source.branch'),
                      className: 'full-width ml-8',
                    },
                    /*#__PURE__*/ React.createElement(Select, {
                      className: 'full-width',
                      dataSource: filterTargetValue(branchValue),
                      placeholder: i18n('ui.trigger.match.source.branch'),
                      value: sourceValue,
                      disabled: disabled || loading,
                      state: loading ? 'loading' : undefined,
                      onChange: function onChange(value) {
                        return onBranchValueChange(checkValues(value, 'source', id), matchLabelKey);
                      },
                    }),
                  ),
                isRefresh &&
                  matchLabelKey !== 'tags' &&
                  /*#__PURE__*/ React.createElement(Refresh, {
                    style: {
                      height: labelKey === PR ? 94 : 32,
                    },
                    onRefresh: onRefresh,
                  }),
              );
            }),
          ),
      );
    }),
  );
};

export default StrictMatch;
