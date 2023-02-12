import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { Button, Input, Select, Icon, Form, Field } from '@alicloud/console-components';
import { MatchRuleDataSource, branchValuePlaceholder } from '../constants';
import { PR, PUSH } from '../types';
import { map, get, uniqueId, filter, isEmpty } from 'lodash';
import { i18n } from '../utils';

const MatchTypeValue = (props, ref) => {
  const { triggerTypeChecked, labelKey, triggerType, value, onChange, disabled } = props;
  const [branchList, setBranchList] = useState([]);
  const field = Field.useField({
    parseName: true,
  });
  const { init, validate, getError } = field;

  useImperativeHandle(ref, () => ({
    validate,
  }));

  useEffect(() => {
    let branchValues = [];
    if (isEmpty(value)) {
      branchValues = [{ type: 'precise', target: '', source: '', id: uniqueId() }];
    } else {
      branchValues = map(value, ({ type, target, source = '' }) => ({
        type,
        target,
        source,
        id: uniqueId(),
      }));
    }
    setBranchList(branchValues);
  }, [JSON.stringify(value)]);

  const onCreate = () => {
    const initMatchValue = { type: 'prefix', target: '', source: '', id: uniqueId() };
    setBranchList([...branchList, initMatchValue]);
    onChangeValues([...branchList, initMatchValue]);
  };

  const onBranchValueChange = (value, type, id) => {
    const changeValues = map(branchList, (item) => {
      item[type] = item.id === id ? value : item[type];
      return item;
    });
    setBranchList(changeValues);
    onChangeValues(changeValues);
  };

  const handleDelete = (id) => {
    const newList = filter(branchList, (i) => i.id !== id);
    setBranchList(newList);
    onChangeValues(newList);
  };

  const onChangeValues = (values) => {
    let newValues = [];
    map(values, ({ target, type, source }) => {
      newValues.push({ target, type, source });
    });
    onChange(newValues);
  };

  return (
    <Form
      field={field}
      inline
      labelAlign="top"
      key={labelKey}
      className="trigger-matching-form"
      style={{ display: triggerTypeChecked ? 'flex' : 'none' }}
    >
      <Form.Item style={{ marginBottom: 0, flexBasis: 160 }} label={i18n('ui.trigger.match.rule')}>
        {map(branchList, (value) => {
          const matchType = get(value, 'type', 'prefix');
          const id = get(value, 'id', uniqueId());
          return (
            <Select
              style={{ width: '100%', marginBottom: getError(`${id}.target`) ? 32 : 10 }}
              {...init(`${id}.type`, {
                initValue: matchType,
                props: {
                  onChange: (val) => {
                    onBranchValueChange(val, 'type', id);
                  },
                },
              })}
              name="matchType"
              key={id}
              dataSource={MatchRuleDataSource}
              disabled={disabled}
            />
          );
        })}
        {!disabled && (
          <Button onClick={onCreate}>
            <Icon type="add" />
            {i18n('ui.trigger.add')}
          </Button>
        )}
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 0, flex: 1 }}
        required
        label={i18n('ui.trigger.target.branch')}
      >
        {map(branchList, (value) => {
          const matchType = get(value, 'type', 'prefix');
          const branchValue = get(value, 'target', '');
          const id = get(value, 'id', uniqueId());
          return (
            <Form.Item style={{ position: 'relative', width: '100%', marginBottom: 0 }} key={id}>
              <Input
                style={{ width: '100%', marginBottom: 10 }}
                {...init(`${id}.target`, {
                  initValue: branchValue,
                  props: {
                    onChange: (val) => {
                      onBranchValueChange(val, 'target', id);
                    },
                  },
                  rules: [{ required: true, message: i18n('ui.branch.verify.text') }],
                })}
                placeholder={branchValuePlaceholder[labelKey][matchType]}
                name={`${id}.target`}
                disabled={disabled}
              />
              {branchList.length > 1 && !disabled && triggerType === PUSH && (
                <div className="trigger-matching-delete-icon" onClick={() => handleDelete(id)}>
                  <Icon type="delete" size="xs" />
                </div>
              )}
            </Form.Item>
          );
        })}
      </Form.Item>
      {triggerType === PR && (
        <Form.Item style={{ marginBottom: 0, flex: 1 }} label={i18n('ui.trigger.source.branch')}>
          {map(branchList, (value) => {
            const sourceValue = get(value, 'source', '');
            const id = get(value, 'id', uniqueId());
            return (
              <div style={{ position: 'relative' }} key={id}>
                <Input
                  style={{ width: '100%', marginBottom: getError(`${id}.target`) ? 32 : 10 }}
                  {...init(`${id}.source`, {
                    initValue: sourceValue,
                    props: {
                      onChange: (val) => {
                        onBranchValueChange(val, 'source', id);
                      },
                    },
                  })}
                  placeholder={i18n('ui.trigger.match.source.branch')}
                  name="sourceValue"
                  disabled={disabled}
                />
                {branchList.length > 1 && !disabled && triggerType === PR && (
                  <div className="trigger-matching-delete-icon" onClick={() => handleDelete(id)}>
                    <Icon type="delete" size="xs" />
                  </div>
                )}
              </div>
            );
          })}
        </Form.Item>
      )}
    </Form>
  );
};

export default forwardRef(MatchTypeValue);
