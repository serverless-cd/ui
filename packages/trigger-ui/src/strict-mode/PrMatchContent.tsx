import React from 'react';
import { map, isEmpty } from 'lodash';
import { Select, Form, Checkbox, Input } from '@alicloud/console-components';
import { ActivityTypes } from '../constants';
import { i18n } from '../utils';
import Refresh from './Refresh';
import '../index.less';

const { Group: CheckboxGroup } = Checkbox;

type Align = 'left' | 'right' | undefined;

interface IProps {
  type: string;
  field: object | any;
  branchList: any[];
  initValue: object | any;
  disabled: boolean;
  loading: boolean;
  onRefresh: Function;
  isRefresh: boolean;
}

const FORM_LAYOUT = {
  labelCol: {
    fixedSpan: 4,
  },
  labelTextAlign: 'left' as Align,
};

const PrMatchContent = (props: IProps) => {
  const { type, field, branchList, initValue, disabled, loading, onRefresh, isRefresh } = props;
  const { init, getValue } = field;

  const filterTargetValue = (value) => {
    if (isEmpty(branchList)) return [];
    return map(branchList, (branchItem) => {
      let newItem = { ...branchItem };
      newItem.disabled = newItem.value === value;
      return newItem;
    });
  };

  return (
    <Form field={field} {...FORM_LAYOUT}>
      <Form.Item
        required
        label={i18n('ui.strict.on.pr.type.label')}
        style={{ display: 'flex', alignItems: 'flex-start' }}
      >
        <CheckboxGroup
          {...init(`${type}Types`, {
            initValue: initValue[`${type}Types`] || ['merged'],
            rules: [
              {
                required: true,
                trigger: 'onChange',
                message: i18n('ui.trigger.activity.type.verify.text'),
              },
            ],
          })}
          dataSource={ActivityTypes}
          disabled={disabled}
        />
      </Form.Item>
      <div style={{ marginBottom: 15, color: '#333' }}>
        {i18n('ui.trigger.match.type.branches')}
      </div>
      <Form.Item
        required
        label={i18n('ui.trigger.target.branch')}
        className="full-width"
        extra={
          isEmpty(branchList) && !loading ? (
            <span style={{ color: '#ed6a0c' }}>{i18n('ui.strict.branch.list.null.help')}</span>
          ) : (
            i18n('ui.strict.on.pr.branch.help')
          )
        }
      >
        <div style={{ position: 'relative' }}>
          <Form.Item style={{ marginBottom: 0 }}>
            {!isEmpty(branchList) ? (
              <Select
                className="full-width"
                {...init(`${type}Target`, {
                  initValue: initValue[`${type}Target`],
                  rules: [{ required: true, message: i18n('ui.branch.verify.text') }],
                })}
                dataSource={branchList}
                placeholder={i18n('ui.trigger.match.branch.precise.value')}
                disabled={disabled || loading}
                state={loading ? 'loading' : undefined}
              />
            ) : (
              <Input
                className="full-width"
                {...init(`${type}Target`, {
                  initValue: initValue[`${type}Target`],
                  rules: [{ required: true, message: i18n('ui.branch.verify.text') }],
                })}
                disabled={disabled || loading}
                state={loading ? 'loading' : undefined}
                placeholder={i18n('ui.trigger.match.branch.precise.value')}
              />
            )}
          </Form.Item>
          {isRefresh && <Refresh style={{ top: 0 }} onRefresh={onRefresh} />}
        </div>
      </Form.Item>
      <Form.Item
        label={i18n('ui.trigger.source.branch')}
        className="full-width"
        help={i18n('ui.strict.on.pr.source.help')}
      >
        {!isEmpty(branchList) ? (
          <Select
            className="full-width"
            {...init(`${type}Source`, {
              initValue: initValue[`${type}Source`],
            })}
            dataSource={filterTargetValue(getValue(`${type}Target`))}
            placeholder={i18n('ui.trigger.match.source.branch')}
            disabled={disabled || loading}
            state={loading ? 'loading' : undefined}
          />
        ) : (
          <Input
            className="full-width"
            {...init(`${type}Source`, {
              initValue: initValue[`${type}Source`],
            })}
            placeholder={i18n('ui.trigger.match.source.branch')}
            disabled={disabled || loading}
            state={loading ? 'loading' : undefined}
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default PrMatchContent;
