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

import React, { useState, useEffect } from 'react';
import { Checkbox } from '@alicloud/console-components';
import MatchType from './MatchType';
import { TriggerTypeCheckedLabel, MatchTypes } from './constants';
import { isEmpty, map, get } from 'lodash';

var TriggerType = function TriggerType(props) {
  var labelKey = props.labelKey,
    value = props.value,
    onChange = props.onChange,
    disabled = props.disabled;

  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    triggerChecked = _useState2[0],
    setTriggerChecked = _useState2[1];

  useEffect(
    function () {
      setTriggerChecked(!isEmpty(value));
    },
    [value],
  );

  var triggerChange = function triggerChange(checked) {
    setTriggerChecked(checked);

    if (checked) {
      matchTypeChange(
        _objectSpread(
          _objectSpread({}, value),
          {},
          {
            branches: {
              prefix: [],
            },
          },
        ),
      );
    } else {
      matchTypeChange({});
    }
  };

  var matchTypeChange = function matchTypeChange(value) {
    onChange(value);
  };

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'trigger-content',
    },
    /*#__PURE__*/ React.createElement(
      Checkbox,
      {
        checked: triggerChecked,
        onChange: triggerChange,
        disabled: disabled,
      },
      TriggerTypeCheckedLabel[labelKey],
    ),
    triggerChecked &&
      map(MatchTypes, function (matchLabelKey) {
        if (labelKey === 'pr' && matchLabelKey === 'tags') return;
        return /*#__PURE__*/ React.createElement(MatchType, {
          triggerChecked: triggerChecked,
          labelKey: matchLabelKey,
          triggerValues: get(value, matchLabelKey, {}),
          onChange: function onChange(v) {
            return matchTypeChange(
              _objectSpread(_objectSpread({}, value), {}, _defineProperty({}, matchLabelKey, v)),
            );
          },
          key: labelKey + matchLabelKey,
          disabled: disabled,
        });
      }),
  );
};

export default TriggerType;
