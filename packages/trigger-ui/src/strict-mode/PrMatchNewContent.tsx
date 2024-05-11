import React from 'react';
import { map, isEmpty, get } from 'lodash';
import { Select, Form, Checkbox, Input, Radio } from '@alicloud/console-components';
import { ActivityTypes } from '../constants';
import { i18n } from '../utils';
import Refresh from './Refresh';
import '../index.less';

const { Group: CheckboxGroup } = Checkbox;
const RadioGroup = Radio.Group;

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
  valueRender: Function;
  selectBranchConfig: any;
}

const FORM_LAYOUT = {
  labelCol: {
    fixedSpan: 4,
  },
  labelTextAlign: 'left' as Align,
};

function extractPatterns(patternString) {
  // 使用正则表达式匹配圆括号中的内容
  const regex = /\(([^)]+)\)/g;
  let matches;
  const patterns = [];

  // 使用循环来找到所有匹配项
  while ((matches = regex.exec(patternString)) !== null) {
    // 将匹配到的值添加到patterns数组中
    patterns.push(matches[1]);
  }

  return patterns;
}



// 用于转义正则特殊字符的辅助函数
function createRegexStringFromArray(array) {
  const escapedElements = array.map(element => `(${element})`);
  const combinedPattern = escapedElements.join('|');
  if (array.length !== 0) {
    return `^${combinedPattern}$`;
  }
  return ``;
}


function getPipeSourceBranch(trigger, source){
  if (trigger === 'manual') {
    const manualSourceBranch = source&&Array.isArray(source)&&!isEmpty(source)? createRegexStringFromArray(source) :''
    return manualSourceBranch
  }

  if (trigger === 'reg') {
    if (source && typeof source==='string') {
      // if (source.split(',').length) {// 如果转换过后, 符合规则, 那么也返回匹配之后的值
      //   const sourceArr = source.split(',')
      //   return createRegexStringFromArray(sourceArr)
      // }
      let pre = '^'
      let deil = '$'
      if (source.startsWith('^')) {
        pre=''
      }
      if (source.endsWith('$')) {
        deil=''
      }
      if (!source.startsWith('(')) {
        source = '('+source
      }

      if (!source.endsWith(')')) {
        source = source + ')'
      }
      return pre+source+deil
    }
    if (source && Array.isArray(source)) {
      return createRegexStringFromArray(source)
    }
  }
}


const PrMatchNewContent = (props: IProps) => {
  const {
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
  } = props;
  const { init, getValue } = field;

  const filterTargetValue = (value) => {
    if (isEmpty(branchList)) return [];

    return branchList.filter((branchItem) => {
      return branchItem.value !== value;
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
        className="full-width99"
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
                valueRender={valueRender}
                placeholder={i18n('ui.trigger.match.branch.precise.value')}
                disabled={disabled || loading || get(selectBranchConfig, 'disabled', false)}
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
        className="full-width99"
        help={i18n('ui.strict.on.pr.source.help')}
      >
        <RadioGroup
          {...init(`${type}Trigger`, {
              initValue: initValue[`${type}Trigger`] || 'manual',
              props: {
                onChange: (value) => {
                  if (value === 'manual') {// 切换手动选择, 如果输入框为字符串,则晴空Source
                    if (typeof getValue(`${type}Source`)==='string') {
                      const sourcebranchs = extractPatterns(get(initValue, `${type}Source`))
                      let newSelectSource = []
                      if (sourcebranchs.length!=0) {
                        newSelectSource = sourcebranchs
                      }

                      field.setValues({
                        [`${type}Source`]: newSelectSource,
                      });
                    }
                  }

                  if (value === 'reg') {// 切换正则选择
                    if (initValue[`${type}Source`] ) {
                      field.setValues({
                        [`${type}Source`]: getPipeSourceBranch('reg', initValue[`${type}Source`]),
                      });
                    }
                  }
                },
              },
          })}
          style={{ display: 'flex', flexDirection: 'row', marginBottom: 16 }}
          >
          <Radio id="manual" value="manual" label="手动选择" />
          <Radio id="reg" value="reg" label="正则过滤" />
        </RadioGroup>

        {getValue(`${type}Trigger`) === 'manual' ? (
          <div style={{ position: 'relative' }}>
            <Select
              className="full-width"
              {...init(`${type}Source`, {
                initValue: initValue[`${type}Source`] || [],
              })}
              valueRender={valueRender}
              dataSource={filterTargetValue(getValue(`${type}Target`))}
              placeholder={i18n('ui.trigger.match.source.branch')}
              disabled={disabled || loading}
              state={loading ? 'loading' : undefined}
              mode='tag'
              hasSelectAll
            />
            {isRefresh && <Refresh style={{ top: 0 }} onRefresh={onRefresh} />}
          </div>
        ) : (
          <Input
            className="full-width"
            {...init(`${type}Source`, {
              initValue: initValue[`${type}Source`]||'',
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

export default PrMatchNewContent;