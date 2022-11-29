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
import { isEmpty, keys, map, uniqueId, noop } from 'lodash';
import { MatchTypeCheckedLabel } from './constants';
import { PR } from './types';
import MatchTypeValue from './MatchTypeValue';

var MatchType = function MatchType(props) {
  var triggerChecked = props.triggerChecked,
    labelKey = props.labelKey,
    triggerValues = props.triggerValues,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? noop : _props$onChange,
    disabled = props.disabled,
    triggerType = props.triggerType;

  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    matchChecked = _useState2[0],
    setMatchChecked = _useState2[1];

  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    matchRuleList = _useState4[0],
    setMatchRuleList = _useState4[1];

  useEffect(
    function () {
      setMatchChecked(!isEmpty(triggerValues));

      if (!isEmpty(triggerValues)) {
        var MatchRuleTypes = keys(triggerValues);
        var MatchRuleValues = [];
        map(MatchRuleTypes, function (type) {
          var branchValues = isEmpty(triggerValues[type])
            ? [
                {
                  type: type,
                  target: '',
                  source: '',
                  id: uniqueId(),
                },
              ]
            : map(triggerValues[type], function (value) {
                return {
                  type: type,
                  target: triggerType === PR ? value.target : value,
                  source: triggerType === PR ? value.source : '',
                  id: uniqueId(),
                };
              });
          MatchRuleValues.push.apply(MatchRuleValues, _toConsumableArray(branchValues));
        });
        setMatchRuleList(MatchRuleValues);
      } else {
        setMatchRuleList([]);
      }
    },
    [triggerValues],
  );

  var matchChange = function matchChange(checked) {
    onChange(
      checked
        ? {
            prefix: [],
          }
        : {},
    );
    setMatchChecked(checked);
  };

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      style: {
        padding: '16px 0 16px 26px',
        display: triggerChecked ? 'block' : 'none',
      },
    },
    /*#__PURE__*/ React.createElement(
      Checkbox,
      {
        checked: matchChecked,
        onChange: matchChange,
        disabled: disabled,
      },
      MatchTypeCheckedLabel[labelKey],
    ),
    matchChecked &&
      /*#__PURE__*/ React.createElement(MatchTypeValue, {
        triggerTypeChecked: matchChecked,
        matchRuleList: matchRuleList,
        onChange: onChange,
        disabled: disabled,
        triggerType: triggerType,
        matchTypeKey: labelKey,
      }),
  );
};

export default MatchType;
