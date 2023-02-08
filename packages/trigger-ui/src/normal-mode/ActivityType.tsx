import React from 'react';
import { Checkbox, Form } from '@alicloud/console-components';
import { ActivityTypes, STRICT_TYPE } from '../constants';
import { i18n } from '../utils';
import '../index.less';

const { Group: CheckboxGroup } = Checkbox;

const ActivityType = (props) => {
  const { field, initValue, disabled } = props;
  const { init } = field;

  return (
    <Form field={field} className="trigger-form" style={{ padding: '16px 0 0 38px' }}>
      <Form.Item
        required
        label={i18n('ui.trigger.activity.type')}
        style={{ display: 'flex', alignItems: 'flex-start' }}
      >
        <CheckboxGroup
          {...init(`${STRICT_TYPE.PUSH_REQUEST}-types`, {
            initValue: initValue['types'] || ['merged'],
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
