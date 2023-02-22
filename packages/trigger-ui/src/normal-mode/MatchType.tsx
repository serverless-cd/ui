import React, { useRef } from 'react';
import { Checkbox } from '@alicloud/console-components';
import { MatchTypeCheckedLabel } from '../constants';
import MatchTypeValue from './MatchTypeValue';

const MatchType = (props) => {
  const { labelKey, disabled, triggerType, field, initValue } = props;
  const { init, getValue } = field;
  const validateRef = useRef(null);

  return (
    <div style={{ padding: '16px 0 16px 26px' }}>
      <Checkbox
        {...init(`${triggerType}-${labelKey}Enable`, {
          initValue: initValue[`${triggerType}-${labelKey}Enable`],
          valueName: 'checked',
        })}
        disabled={disabled}
      >
        {MatchTypeCheckedLabel[labelKey]}
      </Checkbox>
      <MatchTypeValue
        {...init(`${triggerType}-${labelKey}Values`, {
          initValue: initValue[`${triggerType}-${labelKey}Values`],
          rules: [
            {
              validator: (rule, value, callback) => {
                const enable = getValue(`${triggerType}-${labelKey}Enable`);
                if (!enable) return callback();
                const validate = validateRef?.current?.validate;
                validate && validate((error) => (error ? callback('error') : callback()));
              },
            },
          ],
        })}
        triggerTypeChecked={getValue(`${triggerType}-${labelKey}Enable`)}
        disabled={disabled}
        triggerType={triggerType}
        ref={validateRef}
        labelKey={labelKey}
      />
    </div>
  );
};

export default MatchType;
