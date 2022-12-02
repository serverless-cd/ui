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

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import TriggerType from './TriggerType';
import { PR, PUSH } from './types';
import { map, get, noop, isEmpty, keys, uniq, set, omit } from 'lodash';
import { Field } from '@alicloud/console-components';
import StrictModeTrigger from './strict-mode';
import { TriggerTypes } from './constants';
import './index.less';

var uniqOrOmitTriggers = function uniqOrOmitTriggers(trigger, mode) {
  var newTrigger = {};
  map(
    ['push.branches', 'push.tags', 'pull_request.branches', 'pull_request.types'],
    function (item) {
      var matchType = get(trigger, item, {});

      if (!isEmpty(matchType)) {
        if (item === 'pull_request.types') {
          set(newTrigger, item, matchType);
        } else {
          map(keys(matchType), function (matchKey) {
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
    },
  );
  return newTrigger;
};

var Trigger = function Trigger(props, ref) {
  var value = props.value,
    _props$onChange = props.onChange,
    _onChange = _props$onChange === void 0 ? noop : _props$onChange,
    _props$mode = props.mode,
    mode = _props$mode === void 0 ? 'normal' : _props$mode,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    loading = props.loading,
    branchList = props.branchList,
    isRefresh = props.isRefresh,
    onRefresh = props.onRefresh;

  var _useState = useState(
      isEmpty(value)
        ? {
            push: {
              branches: {
                precise: [],
              },
            },
          }
        : value,
    ),
    _useState2 = _slicedToArray(_useState, 1),
    triggerValues = _useState2[0];

  var field = Field.useField({
    onChange: function onChange() {
      var trigger = {};

      if (mode === 'normal') {
        var push = field.getValue(PUSH);
        var pr = field.getValue(PR);

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

      _onChange(trigger);
    },
  });
  var init = field.init,
    setValue = field.setValue,
    _validate = field.validate;
  useImperativeHandle(ref, function () {
    return {
      validate: function validate() {
        return new Promise(function (resolve) {
          _validate(function (error) {
            return error ? resolve(false) : resolve(true);
          });
        });
      },
    };
  });
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    mode === 'normal' &&
      map(TriggerTypes, function (labelKey) {
        var initValue = get(triggerValues, labelKey, {});
        return /*#__PURE__*/ React.createElement(
          TriggerType,
          _extends(
            {},
            init(labelKey, {
              initValue: initValue,
            }),
            {
              labelKey: labelKey,
              key: labelKey,
              disabled: disabled,
              setValue: setValue,
              field: field,
            },
          ),
        );
      }),
    mode === 'strict' &&
      /*#__PURE__*/ React.createElement(
        StrictModeTrigger,
        _extends(
          {},
          init('strict', {
            initValue: triggerValues,
          }),
          {
            triggerValues: triggerValues,
            disabled: disabled,
            loading: loading,
            branchList: branchList,
            field: field,
            isRefresh: isRefresh,
            onRefresh: onRefresh,
          },
        ),
      ),
  );
};

export default /*#__PURE__*/ forwardRef(Trigger);
