import React, { useEffect, useState } from 'react';
import { StrictModeProps, PR } from '../types';
import { map, get, isEmpty, keys } from 'lodash';
import { Radio } from '@alicloud/console-components';
import { TriggerTypes, TriggerTypeCheckedLabel, TriggerType } from '../constants';
import ActivityType from '../ActivityType';
import StrictMatch from './StrictMatch';
import '../index.less';

const RadioGroup = Radio.Group;

const StrictModeTrigger = (props: StrictModeProps) => {
  const [initRadioValue, setInitRadio] = useState(TriggerType.PUSH);
  const {
    value,
    onChange,
    triggerValues,
    disabled = false,
    loading = false,
    branchList,
    field,
    isRefresh,
    onRefresh,
  } = props;

  useEffect(() => {
    const triggerTypes = keys(triggerValues);
    if (!isEmpty(keys(triggerValues))) {
      setInitRadio(triggerTypes[0]);
    } else {
      setInitRadio(TriggerType.PUSH);
    }
  }, [triggerValues]);

  const triggerChange = (typeKey) => {
    setInitRadio(typeKey);
    onChange({ [typeKey]: { branches: { precise: [] } } });
  };

  const activityTypeChange = (values) => {
    onChange({ [PR]: { ...get(value, PR, {}), types: values } });
  };

  return (
    <RadioGroup
      value={initRadioValue}
      onChange={triggerChange}
      disabled={disabled}
      style={{ width: '100%' }}
    >
      {map(TriggerTypes, (labelKey) => {
        return (
          <div className="trigger-content">
            <Radio value={labelKey} disabled={disabled}>
              {TriggerTypeCheckedLabel[labelKey]}
            </Radio>
            {labelKey === PR && labelKey === initRadioValue && (
              <ActivityType
                onChange={activityTypeChange}
                value={get(value, `${PR}.types`)}
                field={field}
              />
            )}
            {labelKey === initRadioValue && (
              <StrictMatch
                labelKey={labelKey}
                triggerChecked={labelKey === initRadioValue}
                matchValues={get(value, labelKey, {})}
                onChange={(v) => {
                  const values = labelKey === PR ? { ...get(value, labelKey, {}), ...v } : v;
                  onChange({ [labelKey]: values });
                }}
                disabled={disabled}
                loading={loading}
                field={field}
                branchList={branchList}
                isRefresh={isRefresh}
                onRefresh={onRefresh}
              />
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default StrictModeTrigger;
