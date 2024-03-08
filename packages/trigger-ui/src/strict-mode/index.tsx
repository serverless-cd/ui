import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { StrictModeProps } from '../types';
import { map, noop, get } from 'lodash';
import { Radio, Field } from '@alicloud/console-components';
import { STRICT_TYPE, STRICT_TRIGGER_TYPES } from '../constants';
import StrictMatch from './StrictMatch';
import '../index.less';
import { i18n } from '../utils';

const RadioGroup = Radio.Group;

const StrictModeTrigger = (props: StrictModeProps, ref) => {
  const {
    disabled = false,
    loading = false,
    branchList,
    isRefresh,
    onRefresh,
    initValue,
    onChange = noop,
    valueRender,
    selectBranchConfig,
  } = props;

  const [newBranchList, setNewBranchList] = useState(branchList);
  const field = Field.useField({
    onChange: () => {
      onChange(getValues());
    },
  });
  const { init, getValue, validate, getValues } = field;

  useEffect(() => {
    setNewBranchList(branchList);
  }, [JSON.stringify(branchList)]);

  useImperativeHandle(ref, () => ({
    validate,
  }));

  return (
    <RadioGroup
      itemDirection="ver"
      {...init('triggerType', {
        initValue: initValue['triggerType'] || STRICT_TYPE.PUSH,
      })}
      disabled={disabled}
      className="strict-mode-radio-Group full-width"
    >
      {map(STRICT_TRIGGER_TYPES, ({ value, label, help }) => {
        const pushBranch = get(initValue,`pushValue`) || getValue('pushValue') || '';
        return (
          <div style={{ marginBottom: 15 }} key={value}>
            <Radio value={value}>{ value === STRICT_TYPE.PUSH ? `${i18n('ui.strict.on.push.label')} ${pushBranch ? `(${pushBranch})` : ' '}` : label}</Radio>
            <div style={{marginLeft: 22, color: '#7E7C7C'}}>{help}</div>
            {getValue('triggerType') === value && (
              <StrictMatch
                type={value}
                loading={loading}
                help={help}
                field={field}
                disabled={disabled}
                initValue={initValue}
                isRefresh={isRefresh}
                onRefresh={onRefresh}
                branchList={newBranchList}
                valueRender={valueRender}
                selectBranchConfig={selectBranchConfig}
                setBranchList={setNewBranchList}
              />
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default forwardRef(StrictModeTrigger);
