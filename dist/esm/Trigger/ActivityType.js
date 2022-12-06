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

import React, { useEffect } from 'react';
import { Checkbox, Form } from '@alicloud/console-components';
import { ActivityTypes } from './constants';
import { i18n } from '../utils';
import { isEmpty } from 'lodash';
import './index.less';
var CheckboxGroup = Checkbox.Group;

var ActivityType = function ActivityType(props) {
  var _onChange = props.onChange,
    value = props.value,
    field = props.field,
    disabled = props.disabled;
  var init = field.init,
    setValue = field.setValue;
  useEffect(function () {
    if (isEmpty(value)) {
      setValue('types', ['merged']);

      _onChange(['merged']);
    } else {
      setValue('types', value);
    }
  }, []);
  return /*#__PURE__*/ React.createElement(
    Form,
    {
      field: field,
      className: 'trigger-form',
      style: {
        padding: '16px 0 0 38px',
      },
    },
    /*#__PURE__*/ React.createElement(
      Form.Item,
      {
        required: true,
        label: i18n('ui.trigger.activity.type'),
        style: {
          display: 'flex',
          alignItems: 'flex-start',
        },
      },
      /*#__PURE__*/ React.createElement(
        CheckboxGroup,
        _extends(
          {},
          init('types', {
            props: {
              onChange: function onChange(value) {
                setValue('types', value);

                _onChange(value);
              },
            },
            rules: [
              {
                required: true,
                trigger: 'onChange',
                message: i18n('ui.trigger.activity.type.verify.text'),
              },
            ],
          }),
          {
            dataSource: ActivityTypes,
            disabled: disabled,
          },
        ),
      ),
    ),
  );
};

export default ActivityType;
