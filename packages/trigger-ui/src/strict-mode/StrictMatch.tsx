import React, { useEffect } from 'react';
import { Select, Input, Form, Message } from '@alicloud/console-components';
import { STRICT_TYPE } from '../constants';
import PrMatchContent from './PrMatchContent';
import PrMatchNewContent from './PrMatchNewContent';
import Refresh from './Refresh';
import { i18n } from '../utils';
import '../index.less';
import { isEmpty, get } from 'lodash';

interface IProps {
  type: string;
  help: string;
  field: object | any;
  branchList: any[];
  initValue?: object | any;
  disabled: boolean;
  loading: boolean;
  onRefresh: Function;
  isRefresh: boolean;
  isPrMatchNew?: boolean;
  setBranchList: Function;
  valueRender: Function;
  selectBranchConfig: any;
}

const StrictMatch = (props: IProps) => {
  const {
    type,
    help,
    field,
    branchList,
    initValue,
    disabled,
    loading,
    onRefresh,
    isPrMatchNew,
    isRefresh,
    valueRender,
    selectBranchConfig,
  } = props;
  const { init } = field;
  return (
    <Form field={field} className="radio-content">
      {help}
      <div style={{ marginTop: 10, position: 'relative' }}>
        {type === STRICT_TYPE.PUSH && (
          <Form.Item
            extra={
              isEmpty(branchList) && !loading ? (
                <span style={{ color: '#ed6a0c' }}>{i18n('ui.strict.branch.list.null.help')}</span>
              ) : (
                ''
              )
            }
          >
            {!isEmpty(branchList) ? (
              <Select
                className="full-width"
                {...init(`${type}Value`, {
                  initValue: initValue[`${type}Value`],
                  rules: [{ required: true, message: i18n('ui.branch.verify.text') }],
                })}
                disabled={disabled || loading || get(selectBranchConfig, 'disabled', false)}
                dataSource={branchList}
                valueRender={valueRender}
                state={loading ? 'loading' : undefined}
                placeholder={i18n('ui.trigger.match.branch.precise.value')}
              />
            ) : (
              <Input
                className="full-width"
                {...init(`${type}Value`, {
                  initValue: initValue[`${type}Value`],
                  rules: [{ required: true, message: i18n('ui.branch.verify.text') }],
                })}
                disabled={disabled || loading}
                state={loading ? 'loading' : undefined}
                placeholder={i18n('ui.trigger.match.branch.precise.value')}
              />
            )}
            {isRefresh && <Refresh style={{ top: 0 }} onRefresh={onRefresh} />}
          </Form.Item>
        )}
        {type === STRICT_TYPE.TAG && (
          <Input
            className="full-width"
            {...init(`${type}Value`, {
              initValue: initValue[`${type}Value`] || '',
            })}
            disabled={disabled}
            placeholder={i18n('ui.trigger.match.tag.prefix.value')}
          />
        )}
        {type === STRICT_TYPE.PUSH_REQUEST && (
            isPrMatchNew ? <PrMatchNewContent
            {...{
              type,
              field,
              branchList,
              initValue,
              disabled,
              loading,
              onRefresh,
              isRefresh,
              valueRender,
              selectBranchConfig,
            }}
          /> :<PrMatchContent
            {...{
              type,
              field,
              branchList,
              initValue,
              disabled,
              loading,
              onRefresh,
              isRefresh,
              valueRender,
              selectBranchConfig,
            }}
          />
        )}
      </div>
    </Form>
  );
};

export default StrictMatch;
