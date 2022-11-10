import React, { useState, useEffect } from 'react';
import { Checkbox } from '@alicloud/console-components';
import MatchType from './MatchType';
import { TriggerTypeCheckedLabel, MatchTypes } from './constants';
import { TriggerTypeProps } from './types';
import { isEmpty, map, get } from 'lodash';

const TriggerType = (props: TriggerTypeProps) => {
  const { labelKey, value, setValue } = props;
  const [triggerChecked, setTriggerChecked] = useState(false);

  useEffect(() => {
    setTriggerChecked(!isEmpty(value));
  }, [value]);

  const triggerChange = (checked) => {
    setTriggerChecked(checked);
    if (checked) {
      setValue(labelKey, { ...value, branches: { prefix: [] } });
    } else {
      setValue(labelKey, {});
    }
  };

  const matchTypeChange = (v, matchLabelKey) => {
    setValue(labelKey, { ...value, [matchLabelKey]: v });
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
              onChange={(value) => matchTypeChange(value, matchLabelKey)}
              key={labelKey + matchLabelKey}
            />
          );
        })}
    </div>
  );
};

export default TriggerType;
