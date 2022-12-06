import React, { useEffect } from 'react';
import { Checkbox, Form } from '@alicloud/console-components';
import { ActivityTypes } from './constants';
import { i18n } from '../utils';
import { isEmpty } from 'lodash';
import './index.less';

const { Group: CheckboxGroup } = Checkbox;

const ActivityType = (props) => {
  const { onChange, value, field, disabled } = props;
  const { init, setValue } = field;
  useEffect(() => {
    if (isEmpty(value)) {
      setValue('types', ['merged']);
      onChange(['merged']);
    } else {
      setValue('types', value);
    }
  }, []);

  return (
    <Form field={field} className="trigger-form" style={{ padding: '16px 0 0 38px' }}>
      <Form.Item
        required
        label={i18n('ui.trigger.activity.type')}
        style={{ display: 'flex', alignItems: 'flex-start' }}
      >
        <CheckboxGroup
          {...init('types', {
            props: {
              onChange: (value) => {
                setValue('types', value);
                onChange(value);
              },
            },
            rules: [
              {
                required: true,
                trigger: 'onChange',
                message: i18n('ui.trigger.activity.type.verify.text'),
              },
            ],
          })}
          dataSource={ActivityTypes}
          disabled={disabled}
        />
      </Form.Item>
    </Form>
  );
};

export default ActivityType;
