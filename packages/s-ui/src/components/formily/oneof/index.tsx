import { useEffect, useMemo, useState } from 'react';
import { connect, mapProps, createSchemaField } from '@formily/react';
import { mapSize } from '@formily/next/lib/__builtins__';
import { createForm, onFormValuesChange } from '@formily/core';
import { Form, Input, Space, ArrayCards, NumberPicker } from '@formily/next';
import FormItem from '../form-item/index';
import Span from '../span/index';
import Select from '../select/index';
import KeyValue from '../key-value/index';
import RolePolicy from '../role-policy/index';
import Switch from '../switch/index';
import ArrayStrings from '../array-string/index';
import _ from 'lodash';
import { generateKey } from '../../../utils';
import React from 'react';
const ADVANCED_CONFIG = 'advanced';
const BASIC_CONFIG = 'basic';

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
    Input,
    Switch,
    Span,
    ArrayStrings,
    ArrayCards,
    Space,
    NumberPicker,
    KeyValue,
    RolePolicy,
  },
  scope: {
    ADVANCED_CONFIG,
    BASIC_CONFIG,
  },
});

const Fc = (props: any = {}) => {
  const [current, setCurrent] = useState({});
  const { onChange } = props;
  const form = useMemo(
    () =>
      createForm({
        validateFirst: true,
        effects: () => {
          onFormValuesChange((obj) => {
            const { type } = obj.values;
            const getValue = (item: any = {}) => {
              if (item.type === BASIC_CONFIG || item.type === ADVANCED_CONFIG) {
                return _.cloneDeep(item[item.type]);
              }
              return item.type;
            };
            onChange(getValue(obj.values));
          });
        },
      }),
    [],
  );

  useEffect(() => {
    const { item = {}, value } = props;
    // @x-oneof值说明
    // void 满足 logConfig, vpcConfig, nasConfig等case，自动配置 auto，不需要在额外渲染ui
    // component 满足 role 等case，简单配置，配合 x-component 属性进行渲染额外的ui，

    const getEnumValue = (item: any = {}) => {
      return _.map(item.oneOf, (obj) => {
        let tmp = ADVANCED_CONFIG;
        if (item['x-oneof'] === 'void') {
          tmp = _.get(obj, 'enum[0]', ADVANCED_CONFIG);
        } else if (item['x-oneof'] === 'component') {
          tmp = obj['x-component'] ? BASIC_CONFIG : ADVANCED_CONFIG;
        }
        return {
          ...obj,
          label: obj.title,
          value: tmp,
        };
      });
    };

    const advancedConfig = _.find(item.oneOf, (obj) => obj.type === 'object');
    const basicConfig = _.find(getEnumValue(item), (obj) => obj['x-component']);
    setCurrent({
      type: 'object',
      properties: {
        type: {
          title: item.title,
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            labelWidth: item.labelWidth,
            tooltip: item['x-tooltip'],
          },
          default: typeof value === 'object' ? ADVANCED_CONFIG : value,
          'x-component': 'Select',
          enum: getEnumValue(item),
        },
        [ADVANCED_CONFIG]: {
          type: 'object',
          title: advancedConfig.title,
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            labelWidth: item.labelWidth,
            tooltip: item['x-tooltip'],
            style: {
              marginBottom: 0,
            },
          },
          'x-reactions': {
            dependencies: ['.type'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === ADVANCED_CONFIG}}',
              },
            },
          },
          properties: generateKey(advancedConfig.properties, value),
        },
        [BASIC_CONFIG]: {
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            labelWidth: item.labelWidth,
            tooltip: item['x-tooltip'],
          },
          'x-component-props': {
            placeholder: _.get(basicConfig, 'examples[0]'),
          },
          'x-reactions': {
            dependencies: ['.type'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === BASIC_CONFIG}}',
              },
            },
          },
          ...basicConfig,
        },
      },
    });
  }, [JSON.stringify(props)]);

  return (
    <Form form={form}>
      <SchemaField schema={current} />
    </Form>
  );
};

export const OneOf = connect(
  Fc,
  mapProps(
    {
      value: 'value',
    },
    mapSize,
  ),
);

export default OneOf;
