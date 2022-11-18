import React, { useState, useEffect } from 'react';
import { Checkbox } from '@alicloud/console-components';
import { isEmpty, keys, map, uniqueId, noop } from 'lodash';
import { MatchTypeCheckedLabel } from './constants';
import { MatchTypeProps } from './types';
import MatchTypeValue from './MatchTypeValue';

const MatchType = (props: MatchTypeProps) => {
  const { triggerChecked, labelKey, triggerValues, onChange = noop, disabled } = props;
  const [matchChecked, setMatchChecked] = useState(false);
  const [matchRuleList, setMatchRuleList] = useState([]);

  useEffect(() => {
    setMatchChecked(!isEmpty(triggerValues));
    if (!isEmpty(triggerValues)) {
      const MatchRuleTypes = keys(triggerValues);
      const MatchRuleValues = [];
      map(MatchRuleTypes, (type) => {
        const branchValues = isEmpty(triggerValues[type])
          ? [{ type, value: '', id: uniqueId() }]
          : map(triggerValues[type], (value) => ({ type, value, id: uniqueId() }));
        MatchRuleValues.push(...branchValues);
      });
      setMatchRuleList(MatchRuleValues);
    } else {
      setMatchRuleList([]);
    }
  }, [triggerValues]);

  const matchChange = (checked) => {
    onChange(checked ? { prefix: [] } : {});
    setMatchChecked(checked);
  };

  return (
    <div style={{ padding: '16px 0 16px 26px', display: triggerChecked ? 'block' : 'none' }}>
      <Checkbox checked={matchChecked} onChange={matchChange} disabled={disabled}>
        {MatchTypeCheckedLabel[labelKey]}
      </Checkbox>
      {matchChecked && (
        <MatchTypeValue
          triggerTypeChecked={matchChecked}
          matchRuleList={matchRuleList}
          onChange={onChange}
          disabled={disabled}
          triggerType={labelKey}
        />
      )}
    </div>
  );
};

export default MatchType;
