import React, { useEffect, useState } from 'react';
import { StrictModeProps, PR } from './types';
import { map, get, noop, isEmpty, keys, uniqueId } from 'lodash';
import { Radio, Input, Select } from '@alicloud/console-components';
import {
  TriggerTypes,
  TriggerTypeCheckedLabel,
  TriggerType,
  MatchTypeCheckedLabel,
  MatchTypes,
  MatchType,
  branchValuePlaceholder,
} from './constants';
import ActivityType from './ActivityType';
import './index.less';
import { i18n } from '../utils';

const RadioGroup = Radio.Group;

const StrictMatch = (props) => {
  const [initRadioValue, setInitRadio] = useState(MatchType.BRANCHES);
  const {
    triggerChecked,
    matchValues,
    onChange = noop,
    labelKey,
    disabled,
    loading,
    branchList,
  } = props;
  const [matchRuleList, setMatchRuleList] = useState([]);
  const [lastValue, setLastValue] = useState({});

  useEffect(() => {
    const triggerTypes = keys(matchValues);
    if (!isEmpty(triggerTypes)) {
      setInitRadio(triggerTypes[0]);
    } else {
      setInitRadio(MatchType.BRANCHES);
    }
    formtMatchValues(matchValues[triggerTypes[0] || MatchType.BRANCHES]);
    setLastValue({ ...lastValue, ...matchValues[triggerTypes[0] || MatchType.BRANCHES] });
  }, [matchValues]);

  const formtMatchValues = (values) => {
    if (!isEmpty(values)) {
      const MatchRuleTypes = keys(values);
      const MatchRuleValues = [];
      map(MatchRuleTypes, (type) => {
        const branchValues = isEmpty(values[type])
          ? [{ type, target: '', source: '', id: uniqueId() }]
          : map(values[type], (value) => ({
              type,
              target: labelKey === PR ? value.target : value,
              source: labelKey === PR ? value.source : '',
              id: uniqueId(),
            }));
        MatchRuleValues.push(...branchValues);
      });
      setMatchRuleList(MatchRuleValues);
    } else {
      setMatchRuleList([]);
    }
  };

  const matchChange = (matchType) => {
    const matchTypeValueKey = matchType === MatchType.BRANCHES ? 'precise' : 'prefix';
    setInitRadio(matchType);
    onChange({ [matchType]: { [matchTypeValueKey]: lastValue[matchTypeValueKey] || [] } });
  };

  const checkValues = (value, type, id) => {
    const changeValues = map(matchRuleList, (item) => {
      item[type] = item.id === id ? value : item[type];
      return item;
    });
    return changeValues;
  };

  const onBranchValueChange = (changeValues, matchLabelKey) => {
    if (!isEmpty(changeValues)) {
      const formaValues = {};
      map(changeValues, (item) => {
        if (isEmpty(formaValues[item.type])) formaValues[item.type] = [];
        if (labelKey === PR) {
          formaValues[item.type].push({
            target: item.target,
            source: item.source,
          });
        } else {
          item.target && formaValues[item.type].push(item.target);
        }
      });
      onChange({ [matchLabelKey]: formaValues });
    }
    setMatchRuleList(changeValues);
  };

  return (
    <RadioGroup
      value={initRadioValue}
      onChange={matchChange}
      style={{ display: triggerChecked ? 'block' : 'none' }}
      disabled={disabled}
    >
      {map(MatchTypes, (matchLabelKey) => {
        if (labelKey === PR && matchLabelKey === 'tags') return;

        return (
          <div
            style={{
              margin: '16px 0 16px 26px',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Radio
              value={matchLabelKey}
              disabled={disabled}
              style={{ height: 32, lineHeight: '32px' }}
            >
              {MatchTypeCheckedLabel[matchLabelKey]}
            </Radio>
            {initRadioValue === matchLabelKey && (
              <div
                style={{ display: initRadioValue === matchLabelKey ? 'block' : 'none', flex: 1 }}
              >
                {map(matchRuleList, (value) => {
                  const matchType = get(value, 'type', 'prefix');
                  const placeholder = branchValuePlaceholder[matchLabelKey][matchType];
                  const branchValue = get(value, 'target', '');
                  const sourceValue = get(value, 'source', '');

                  const id = get(value, 'id', uniqueId());
                  return (
                    <div style={{ display: 'flex' }}>
                      {matchLabelKey === 'tags' ? (
                        <Input
                          style={{ width: '100%' }}
                          placeholder={placeholder}
                          value={branchValue}
                          disabled={disabled}
                          onChange={(value) =>
                            onBranchValueChange(checkValues(value, 'target', id), matchLabelKey)
                          }
                        />
                      ) : (
                        <div style={{ flex: 1, marginRight: 8 }}>
                          <span>{i18n('ui.trigger.target.branch')}</span>
                          <Select
                            style={{ width: '100%', marginTop: 8 }}
                            dataSource={branchList}
                            placeholder={placeholder}
                            value={branchValue}
                            disabled={disabled || loading}
                            state={loading ? 'loading' : undefined}
                            onChange={(value) =>
                              onBranchValueChange(checkValues(value, 'target', id), matchLabelKey)
                            }
                          />
                        </div>
                      )}
                      {labelKey === PR && (
                        <div style={{ flex: 1 }}>
                          <span>{i18n('ui.trigger.source.branch')}</span>
                          <Select
                            style={{ width: '100%', marginTop: 8 }}
                            dataSource={branchList}
                            placeholder={i18n('ui.trigger.match.source.branch')}
                            value={sourceValue}
                            disabled={disabled || loading}
                            state={loading ? 'loading' : undefined}
                            onChange={(value) =>
                              onBranchValueChange(checkValues(value, 'source', id), matchLabelKey)
                            }
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
};

const StrictModeTrigger = (props: StrictModeProps) => {
  const [initRadioValue, setInitRadio] = useState(TriggerType.PUSH);
  const { value, onChange, triggerValues, disabled = false, loading = false, branchList } = props;
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
              <ActivityType onChange={activityTypeChange} value={get(value, `${PR}.types`)} />
            )}
            {labelKey === initRadioValue && (
              <StrictMatch
                labelKey={labelKey}
                triggerChecked={labelKey === initRadioValue}
                matchValues={get(value, labelKey, {})}
                onChange={(v) => onChange({ [labelKey]: { ...get(value, labelKey, {}), ...v } })}
                disabled={disabled}
                loading={loading}
                branchList={branchList}
              />
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default StrictModeTrigger;
