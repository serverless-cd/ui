import React, { useEffect, useState } from 'react';
import TriggerType from './TriggerType';
import { TriggersProps } from './types';
import { map, get, noop, isEmpty, keys, uniq, set } from 'lodash';
import { Field } from '@alicloud/console-components';
import { TriggerTypes } from './constants';
import './index.less';

const uniTriggers = (trigger) => {
  const newTrigger = {};
  map(['push.branches', 'push.tags', 'pr.branches', 'pr.tags'], (item) => {
    const matchType = get(trigger, item, {});
    if (!isEmpty(matchType)) {
      map(keys(matchType), (matchKey) => {
        if (matchType[matchKey].length > 1) {
          matchType[matchKey] = uniq(matchType[matchKey]);
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
  const field = Field.useField();
  const { init, getValue, setValue } = field;

  useEffect(() => {
    const push = getValue('push');
    const pr = getValue('pr');
    let trigger = {};

    if (!isEmpty(push)) {
      trigger['push'] = push;
    }

    if (!isEmpty(pr)) {
      trigger['pr'] = pr;
    }

    trigger = uniTriggers(trigger);

    onChange(trigger);
  }, [getValue('push'), getValue('pr')]);

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
