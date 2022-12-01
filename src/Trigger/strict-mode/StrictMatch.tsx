import React, { useEffect, useState } from 'react';
import { PR } from '../types';
import { map, get, noop, isEmpty, keys, uniqueId } from 'lodash';
import { Radio, Input, Select, Form } from '@alicloud/console-components';
import { MatchTypeCheckedLabel, MatchTypes, MatchType, branchValuePlaceholder } from '../constants';
import Refresh from './Refresh';
import { i18n } from '../../utils';
import '../index.less';

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
    field,
    isRefresh,
    onRefresh,
  } = props;
  const [matchRuleList, setMatchRuleList] = useState([]);
  const [lastValue, setLastValue] = useState({});
  const { init, setValue, validate } = field;

  useEffect(() => {
    const triggerTypes = keys(matchValues).filter((type) => type !== 'types');
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
            source: item.target !== item.source ? item.source : '',
          });
        } else {
          item.target && formaValues[item.type].push(item.target);
        }
      });
      onChange({ [matchLabelKey]: formaValues });
    }
    setMatchRuleList(changeValues);
  };

  const filterTargetValue = (value) => {
    if (isEmpty(branchList)) return [];
    return map(branchList, (branchItem) => {
      let newItem = { ...branchItem };
      newItem.disabled = newItem.value === value;
      return newItem;
    });
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
              alignItems: 'flex-start',
            }}
          >
            <Radio
              value={matchLabelKey}
              disabled={disabled}
              className={labelKey === PR ? 'branch-radio-pr' : 'branch-radio'}
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
                    <Form field={field} className="trigger-form">
                      {matchLabelKey === 'tags' ? (
                        <Form.Item className="full-width" labelAlign="left">
                          <Input
                            className="full-width"
                            placeholder={placeholder}
                            value={branchValue}
                            disabled={disabled}
                            onChange={(value) =>
                              onBranchValueChange(checkValues(value, 'target', id), matchLabelKey)
                            }
                          />
                        </Form.Item>
                      ) : (
                        <Form.Item
                          required
                          labelAlign="left"
                          label={labelKey === PR ? i18n('ui.trigger.target.branch') : ''}
                          className="full-width"
                        >
                          <Select
                            className="full-width"
                            {...init('target', {
                              props: {
                                onChange: (value) => {
                                  setValue('target', value);
                                  onBranchValueChange(
                                    checkValues(value, 'target', id),
                                    matchLabelKey,
                                  );
                                },
                              },
                              rules: [
                                { required: true, trigger: 'onChange', message: '分支是必填项' },
                              ],
                            })}
                            dataSource={branchList}
                            placeholder={placeholder}
                            value={branchValue}
                            disabled={disabled || loading}
                            state={loading ? 'loading' : undefined}
                          />
                        </Form.Item>
                      )}
                      {labelKey === PR && (
                        <Form.Item
                          labelAlign="left"
                          label={i18n('ui.trigger.source.branch')}
                          className="full-width ml-8"
                        >
                          <Select
                            className="full-width"
                            dataSource={filterTargetValue(branchValue)}
                            placeholder={i18n('ui.trigger.match.source.branch')}
                            value={sourceValue}
                            disabled={disabled || loading}
                            state={loading ? 'loading' : undefined}
                            onChange={(value) =>
                              onBranchValueChange(checkValues(value, 'source', id), matchLabelKey)
                            }
                          />
                        </Form.Item>
                      )}
                      {isRefresh && matchLabelKey !== 'tags' && (
                        <Refresh
                          style={{ height: labelKey === PR ? 94 : 32 }}
                          onRefresh={onRefresh}
                        />
                      )}
                    </Form>
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

export default StrictMatch;
