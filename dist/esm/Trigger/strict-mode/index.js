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
import { map, get, isEmpty, keys } from 'lodash';
import { Radio } from '@alicloud/console-components';
import { TriggerTypes, TriggerTypeCheckedLabel, TriggerType } from '../constants';
import ActivityType from '../ActivityType';
import StrictMatch from './StrictMatch';
import '../index.less';
var RadioGroup = Radio.Group;

var StrictModeTrigger = function StrictModeTrigger(props) {
  var _useState = useState(TriggerType.PUSH),
    _useState2 = _slicedToArray(_useState, 2),
    initRadioValue = _useState2[0],
    setInitRadio = _useState2[1];

  var value = props.value,
    _onChange4 = props.onChange,
    triggerValues = props.triggerValues,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$loading = props.loading,
    loading = _props$loading === void 0 ? false : _props$loading,
    branchList = props.branchList,
    field = props.field,
    isRefresh = props.isRefresh,
    onRefresh = props.onRefresh;
  useEffect(
    function () {
      var triggerTypes = keys(triggerValues);

      if (!isEmpty(keys(triggerValues))) {
        setInitRadio(triggerTypes[0]);
      } else {
        setInitRadio(TriggerType.PUSH);
      }
    },
    [triggerValues],
  );

  var triggerChange = function triggerChange(typeKey) {
    setInitRadio(typeKey);

    _onChange4(
      _defineProperty({}, typeKey, {
        branches: {
          precise: [],
        },
      }),
    );
  };

  var activityTypeChange = function activityTypeChange(values) {
    _onChange4(
      _defineProperty(
        {},
        PR,
        _objectSpread(
          _objectSpread({}, get(value, PR, {})),
          {},
          {
            types: values,
          },
        ),
      ),
    );
  };

  return /*#__PURE__*/ React.createElement(
    RadioGroup,
    {
      value: initRadioValue,
      onChange: triggerChange,
      disabled: disabled,
      style: {
        width: '100%',
      },
    },
    map(TriggerTypes, function (labelKey) {
      return /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'trigger-content',
        },
        /*#__PURE__*/ React.createElement(
          Radio,
          {
            value: labelKey,
            disabled: disabled,
          },
          TriggerTypeCheckedLabel[labelKey],
        ),
        labelKey === PR &&
          labelKey === initRadioValue &&
          /*#__PURE__*/ React.createElement(ActivityType, {
            onChange: activityTypeChange,
            value: get(value, ''.concat(PR, '.types')),
            field: field,
            disabled: disabled,
          }),
        labelKey === initRadioValue &&
          /*#__PURE__*/ React.createElement(StrictMatch, {
            labelKey: labelKey,
            triggerChecked: labelKey === initRadioValue,
            matchValues: get(value, labelKey, {}),
            onChange: function onChange(v) {
              var values =
                labelKey === PR ? _objectSpread(_objectSpread({}, get(value, labelKey, {})), v) : v;

              _onChange4(_defineProperty({}, labelKey, values));
            },
            disabled: disabled,
            loading: loading,
            field: field,
            branchList: branchList,
            isRefresh: isRefresh,
            onRefresh: onRefresh,
          }),
      );
    }),
  );
};

export default StrictModeTrigger;
