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

import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Icon } from '@alicloud/console-components';
import { MatchRuleDataSource, branchValuePlaceholder } from './constants';
import { PR } from './types';
import { map, get, uniqueId, filter, isEmpty } from 'lodash';
import { i18n } from '../utils';

var MatchTypeValue = function MatchTypeValue(props) {
  var triggerTypeChecked = props.triggerTypeChecked,
    matchRuleList = props.matchRuleList,
    triggerType = props.triggerType,
    matchTypeKey = props.matchTypeKey,
    onChange = props.onChange,
    disabled = props.disabled;

  var _useState = useState(matchRuleList),
    _useState2 = _slicedToArray(_useState, 2),
    branchList = _useState2[0],
    setBranchList = _useState2[1];

  useEffect(
    function () {
      if (isEmpty(branchList)) {
        setBranchList(matchRuleList);
      }
    },
    [matchRuleList],
  );
  useEffect(
    function () {
      if (!isEmpty(branchList)) {
        var formaValues = {};
        map(branchList, function (item) {
          if (isEmpty(formaValues[item.type])) formaValues[item.type] = [];

          if (triggerType === PR) {
            formaValues[item.type].push({
              target: item.target,
              source: item.source,
            });
          } else {
            item.target && formaValues[item.type].push(item.target);
          }
        });
        onChange(formaValues);
      }
    },
    [branchList],
  );

  var onCreate = function onCreate() {
    var initMatchValue = {
      type: 'prefix',
      target: '',
      source: '',
      id: uniqueId(),
    };
    setBranchList([].concat(_toConsumableArray(branchList), [initMatchValue]));
  };

  var onBranchValueChange = function onBranchValueChange(value, type, id) {
    var changeValues = map(branchList, function (item) {
      item[type] = item.id === id ? value : item[type];
      return item;
    });
    setBranchList(changeValues);
  };

  var handleDelete = function handleDelete(id) {
    var newList = filter(branchList, function (i) {
      return i.id !== id;
    });
    setBranchList(newList);
  };

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'trigger-matching-form',
      style: {
        display: triggerTypeChecked ? 'block' : 'none',
      },
    },
    /*#__PURE__*/ React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'center',
        },
      },
      /*#__PURE__*/ React.createElement(
        'span',
        {
          style: {
            flexBasis: 160,
          },
        },
        i18n('ui.trigger.match.rule'),
      ),
      /*#__PURE__*/ React.createElement(
        'span',
        {
          style: {
            flex: 1,
            marginLeft: 8,
          },
        },
        i18n('ui.trigger.target.branch'),
      ),
      triggerType === PR &&
        /*#__PURE__*/ React.createElement(
          'span',
          {
            style: {
              flex: 1,
              marginLeft: 8,
            },
          },
          i18n('ui.trigger.source.branch'),
        ),
    ),
    map(branchList, function (value) {
      var matchType = get(value, 'type', 'prefix');
      var branchValue = get(value, 'target', '');
      var sourceValue = get(value, 'source', '');
      var id = get(value, 'id', uniqueId());
      return /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'trigger-matching-form-item',
          key: id,
        },
        /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'trigger-matching-form-item-content',
            style: {
              flexBasis: 160,
            },
          },
          /*#__PURE__*/ React.createElement(Select, {
            style: {
              width: 160,
            },
            value: matchType,
            name: 'matchType',
            onChange: function onChange(value) {
              return onBranchValueChange(value, 'type', id);
            },
            dataSource: MatchRuleDataSource,
            disabled: disabled,
          }),
        ),
        /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'trigger-matching-form-item-content',
            style: {
              flex: 1,
              marginLeft: 8,
            },
          },
          /*#__PURE__*/ React.createElement(Input, {
            style: {
              width: '100%',
            },
            placeholder: branchValuePlaceholder[matchTypeKey][matchType],
            value: branchValue,
            onChange: function onChange(value) {
              return onBranchValueChange(value, 'target', id);
            },
            name: 'branchValue',
            disabled: disabled,
          }),
        ),
        triggerType === PR &&
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'trigger-matching-form-item-content',
              style: {
                flex: 1,
                marginLeft: 8,
              },
            },
            /*#__PURE__*/ React.createElement(Input, {
              style: {
                width: '100%',
              },
              placeholder: i18n('ui.trigger.match.source.branch'),
              value: sourceValue,
              onChange: function onChange(value) {
                return onBranchValueChange(value, 'source', id);
              },
              name: 'sourceValue',
              disabled: disabled,
            }),
          ),
        branchList.length > 1 &&
          !disabled &&
          /*#__PURE__*/ React.createElement(
            'div',
            {
              onClick: function onClick() {
                return handleDelete(id);
              },
              className: 'trigger-matching-delete-icon',
            },
            /*#__PURE__*/ React.createElement(Icon, {
              type: 'delete',
              size: 'xs',
            }),
          ),
      );
    }),
    !disabled &&
      /*#__PURE__*/ React.createElement(
        Button,
        {
          onClick: onCreate,
        },
        /*#__PURE__*/ React.createElement(Icon, {
          type: 'add',
        }),
        i18n('ui.trigger.add'),
      ),
  );
};

export default MatchTypeValue;
