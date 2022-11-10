import React, { useState, useEffect } from 'react';
import { Checkbox } from '@alicloud/console-components';
import MatchType from './MatchType';
import { TriggerTypeCheckedLabel, MatchTypes } from './constants';
import { TriggerTypeProps } from './types';
import { isEmpty, map, get } from 'lodash';

const TriggerType = (props: TriggerTypeProps) => {
  const { labelKey, value, onChange } = props;
  const [triggerChecked, setTriggerChecked] = useState(false);

  useEffect(() => {
    setTriggerChecked(!isEmpty(value));
  }, [value]);

  const triggerChange = (checked) => {
    setTriggerChecked(checked);
    if (checked) {
      matchTypeChange({ ...value, branches: { prefix: [] } });
    } else {
      matchTypeChange({});
    }
  };

  const matchTypeChange = (value) => {
    onChange(value);
  };

  return (
    <div className="trigger-content">
      <Checkbox checked={triggerChecked} onChange={triggerChange}>
        {TriggerTypeCheckedLabel[labelKey]}
      </Checkbox>
      {triggerChecked &&
        map(MatchTypes, (matchLabelKey) => {
          if (labelKey === 'pr' && matchLabelKey === 'tags') return;
          return (
            <MatchType
              triggerChecked={triggerChecked}
              labelKey={matchLabelKey}
              triggerValues={get(value, matchLabelKey, {})}
              onChange={(v) => matchTypeChange({ ...value, [matchLabelKey]: v })}
              key={labelKey + matchLabelKey}
            />
          );
        })}
    </div>
  );
};

export default TriggerType;
