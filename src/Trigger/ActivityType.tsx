import React from 'react';
import { Checkbox } from '@alicloud/console-components';
import { ActivityTypes } from './constants';
import { i18n } from '../utils';

const { Group: CheckboxGroup } = Checkbox;

const ActivityType = (props) => {
  const { onChange, value } = props;

  return (
    <div style={{ padding: '16px 0 0 50px', display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 16 }}>{i18n('ui.trigger.activity.type')}</span>
      <CheckboxGroup value={value} dataSource={ActivityTypes} onChange={onChange} />
    </div>
  );
};

export default ActivityType;
