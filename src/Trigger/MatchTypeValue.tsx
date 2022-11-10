import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Icon } from '@alicloud/console-components';
import { MatchRuleDataSource, branchValuePlaceholder } from './constants';
import { MatchTypeValuesProps } from './types';
import { map, get, uniqueId, filter, isEmpty } from 'lodash';

const MatchTypeValue = (props: MatchTypeValuesProps) => {
  const { triggerTypeChecked, matchRuleList, triggerType, onChange } = props;
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
        formaValues[item.type].push(item.value);
      });
      onChange(formaValues);
    }
  }, [branchList]);

  const onCreate = () => {
    const initMatchValue = { type: 'prefix', value: '', id: uniqueId() };
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
        <span style={{ flexBasis: 160 }}>匹配规则</span>
        <span style={{ flex: 1, marginLeft: 8 }}>目标分支</span>
      </div>
      {map(branchList, (value) => {
        const matchType = get(value, 'type', 'prefix');
        const branchValue = get(value, 'value', '');
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
              />
            </div>
            <div className="trigger-matching-form-item-content" style={{ flex: 1, marginLeft: 8 }}>
              <Input
                style={{ width: '100%' }}
                placeholder={branchValuePlaceholder[triggerType][matchType]}
                value={branchValue}
                onChange={(value) => onBranchValueChange(value, 'value', id)}
                name="branchValue"
              />
            </div>
            {branchList.length > 1 && (
              <Button
                type="primary"
                text
                onClick={() => handleDelete(id)}
                style={{ position: 'absolute', height: '100%', right: -20 }}
                className="mt-6 ml-8"
              >
                <Icon type="delete" />
              </Button>
            )}
          </div>
        );
      })}
      <Button onClick={onCreate}>
        <Icon type="add" />
        添加
      </Button>
    </div>
  );
};

export default MatchTypeValue;
