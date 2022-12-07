import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Icon } from '@alicloud/console-components';
import { MatchRuleDataSource, branchValuePlaceholder } from './constants';
import { MatchTypeValuesProps, PR } from './types';
import { map, get, uniqueId, filter, isEmpty } from 'lodash';
import { i18n } from './utils';

const MatchTypeValue = (props: MatchTypeValuesProps) => {
  const { triggerTypeChecked, matchRuleList, triggerType, matchTypeKey, onChange, disabled } =
    props;
  const [branchList, setBranchList] = useState(matchRuleList);

  useEffect(() => {
    if (isEmpty(branchList)) {
      setBranchList(matchRuleList);
    }
  }, [matchRuleList]);

  useEffect(() => {
    if (!isEmpty(branchList)) {
      const formaValues = {};
      map(branchList, (item) => {
        if (isEmpty(formaValues[item.type])) formaValues[item.type] = [];
        if (triggerType === PR) {
          formaValues[item.type].push({
            target: item.target,
            source: item.source,
          });
        } else {
          item.target && formaValues[item.type].push(item.target);
        }
      });
      onChange(formaValues);
    }
  }, [branchList]);

  const onCreate = () => {
    const initMatchValue = { type: 'prefix', target: '', source: '', id: uniqueId() };
    setBranchList([...branchList, initMatchValue]);
  };

  const onBranchValueChange = (value, type, id) => {
    const changeValues = map(branchList, (item) => {
      item[type] = item.id === id ? value : item[type];
      return item;
    });
    setBranchList(changeValues);
  };

  const handleDelete = (id) => {
    const newList = filter(branchList, (i) => i.id !== id);
    setBranchList(newList);
  };

  return (
    <div
      className="trigger-matching-form"
      style={{ display: triggerTypeChecked ? 'block' : 'none' }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span style={{ flexBasis: 160 }}>{i18n('ui.trigger.match.rule')}</span>
        <span style={{ flex: 1, marginLeft: 8 }}>{i18n('ui.trigger.target.branch')}</span>
        {triggerType === PR && (
          <span style={{ flex: 1, marginLeft: 8 }}>{i18n('ui.trigger.source.branch')}</span>
        )}
      </div>
      {map(branchList, (value) => {
        const matchType = get(value, 'type', 'prefix');
        const branchValue = get(value, 'target', '');
        const sourceValue = get(value, 'source', '');
        const id = get(value, 'id', uniqueId());
        return (
          <div className="trigger-matching-form-item" key={id}>
            <div className="trigger-matching-form-item-content" style={{ flexBasis: 160 }}>
              <Select
                style={{ width: 160 }}
                value={matchType}
                name="matchType"
                onChange={(value) => onBranchValueChange(value, 'type', id)}
                dataSource={MatchRuleDataSource}
                disabled={disabled}
              />
            </div>
            <div className="trigger-matching-form-item-content" style={{ flex: 1, marginLeft: 8 }}>
              <Input
                style={{ width: '100%' }}
                placeholder={branchValuePlaceholder[matchTypeKey][matchType]}
                value={branchValue}
                onChange={(value) => onBranchValueChange(value, 'target', id)}
                name="branchValue"
                disabled={disabled}
              />
            </div>
            {triggerType === PR && (
              <div
                className="trigger-matching-form-item-content"
                style={{ flex: 1, marginLeft: 8 }}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder={i18n('ui.trigger.match.source.branch')}
                  value={sourceValue}
                  onChange={(value) => onBranchValueChange(value, 'source', id)}
                  name="sourceValue"
                  disabled={disabled}
                />
              </div>
            )}
            {branchList.length > 1 && !disabled && (
              <div onClick={() => handleDelete(id)} className="trigger-matching-delete-icon">
                <Icon type="delete" size="xs" />
              </div>
            )}
          </div>
        );
      })}
      {!disabled && (
        <Button onClick={onCreate}>
          <Icon type="add" />
          {i18n('ui.trigger.add')}
        </Button>
      )}
    </div>
  );
};

export default MatchTypeValue;
