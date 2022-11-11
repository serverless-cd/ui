import React, { useState } from 'react';
import TriggerType from './TriggerType';
import { TriggersProps } from './types';
import { map, get, noop, isEmpty, keys, uniq, set, omit } from 'lodash';
import { Field } from '@alicloud/console-components';
import { TriggerTypes } from './constants';
import './index.less';

const uniqOrOmitTriggers = (trigger) => {
  const newTrigger = {};
  map(['push.branches', 'push.tags', 'pr.branches', 'pr.tags'], (item) => {
    let matchType = get(trigger, item, {});
    if (!isEmpty(matchType)) {
      map(keys(matchType), (matchKey) => {
        if (matchType[matchKey].length > 1) {
          matchType[matchKey] = uniq(matchType[matchKey]);
        }

        if (isEmpty(matchType[matchKey]) && matchKey !== 'prefix') {
          matchType = omit(matchType, [matchKey]);
        }
      });
      set(newTrigger, item, matchType);
    }
  });
  return newTrigger;
};

const Trigger = (props: TriggersProps) => {
  const { value, onChange = noop } = props;
  const [triggerValues] = useState(isEmpty(value) ? { push: { branches: { prefix: [] } } } : value);

  const field = Field.useField({
    onChange: () => {
      const push = field.getValue('push');
      const pr = field.getValue('pr');
      let trigger = {};

      if (!isEmpty(push)) {
        trigger['push'] = push;
      }

      if (!isEmpty(pr)) {
        trigger['pr'] = pr;
      }

      trigger = uniqOrOmitTriggers(trigger);

      onChange(trigger);
    },
  });
  const { init, setValue } = field;

  return (
    <>
      {map(TriggerTypes, (labelKey) => {
        const initValue = get(triggerValues, labelKey, {});
        return (
          <TriggerType
            {...init(labelKey, { initValue })}
            labelKey={labelKey}
            key={labelKey}
            setValue={setValue}
          />
        );
      })}
    </>
  );
};

export default Trigger;
