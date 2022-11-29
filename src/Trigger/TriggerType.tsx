import React, { useState, useEffect } from 'react';
import { Checkbox } from '@alicloud/console-components';
import MatchType from './MatchType';
import { TriggerTypeCheckedLabel, MatchTypes } from './constants';
import { TriggerTypeProps, PR } from './types';
import { isEmpty, map, get } from 'lodash';
import ActivityType from './ActivityType';

const TriggerType = (props: TriggerTypeProps) => {
  const { labelKey, value, onChange, disabled } = props;
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

  const activityTypeChange = (selectedItems) => {
    matchTypeChange({ ...value, types: selectedItems });
  };

  return (
    <div className="trigger-content">
      <Checkbox checked={triggerChecked} onChange={triggerChange} disabled={disabled}>
        {TriggerTypeCheckedLabel[labelKey]}
      </Checkbox>
      {triggerChecked && (
        <>
          {labelKey === PR && (
            <ActivityType onChange={activityTypeChange} value={get(value, 'types')} />
          )}
          {map(MatchTypes, (matchLabelKey) => {
            if (labelKey === PR && matchLabelKey === 'tags') return;
            return (
              <MatchType
                triggerChecked={triggerChecked}
                triggerType={labelKey}
                labelKey={matchLabelKey}
                triggerValues={get(value, matchLabelKey, {})}
                onChange={(v) => matchTypeChange({ ...value, [matchLabelKey]: v })}
                key={labelKey + matchLabelKey}
                disabled={disabled}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TriggerType;
