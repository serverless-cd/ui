import React from 'react';
import { Checkbox } from '@alicloud/console-components';
import MatchType from './MatchType';
import { TriggerTypeCheckedLabel, MatchTypes } from '../constants';
import { PR } from '../types';
import { map } from 'lodash';
import ActivityType from './ActivityType';

const TriggerType = (props) => {
  const { labelKey, initValue, disabled, field } = props;
  const { init, getValue } = field;

  return (
    <div className="trigger-content">
      <Checkbox
        {...init(`${labelKey}-enable`, {
          initValue: initValue[`${labelKey}-enable`],
          valueName: 'checked',
        })}
        disabled={disabled}
      >
        {TriggerTypeCheckedLabel[labelKey]}
      </Checkbox>
      {getValue(`${labelKey}-enable`) && (
        <>
          {labelKey === PR && (
            <ActivityType field={field} disabled={disabled} initValue={initValue} />
          )}
          {map(MatchTypes, (matchLabelKey) => {
            if (labelKey === PR && matchLabelKey === 'tags') return;
            return (
              <MatchType
                field={field}
                initValue={initValue}
                triggerType={labelKey}
                labelKey={matchLabelKey}
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
