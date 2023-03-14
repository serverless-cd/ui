import React, { useEffect, useMemo, useState } from 'react';
import { connect, mapProps, createSchemaField } from '@formily/react';
import { mapSize } from '@formily/next/lib/__builtins__';
import { createForm, onFormValuesChange } from '@formily/core';
import { Form, Input, Switch, Space, ArrayCards, NumberPicker, FormItem } from '@formily/next';
import Span from '../span/index';
import Select from '../select/index';
import KeyValue from '../key-value/index';
import ArrayStrings from '../array-string/index';
import _ from 'lodash';
import { generateKey } from '../../../utils';
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
            const { policy } = obj.values;
            const tmp = _.map(policy, (item) => {
              return item[item.type];
            });
            onChange(_.cloneDeep(tmp));
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

    const getDefaultValue = (value = []) => {
      return _.map(value, (obj) => {
        if (typeof obj === 'object') {
          return {
            type: ADVANCED_CONFIG,
            [ADVANCED_CONFIG]: obj,
          };
        }
        return {
          type: BASIC_CONFIG,
          [BASIC_CONFIG]: obj,
        };
      });
    };

    const advancedConfig = _.find(item.oneOf, (obj) => obj.type === 'object');
    const basicConfig = _.find(getEnumValue(item), (obj) => obj['x-component']);
    setCurrent({
      type: 'object',
      properties: {
        policy: {
          type: 'array',
          'x-component': 'ArrayCards',
          'x-decorator': 'FormItem',
          'x-component-props': {
            title: item.title,
            tooltip: item['x-tooltip'],
          },
          default: getDefaultValue(value),
          items: {
            type: 'object',
            properties: {
              type: {
                title: item.title,
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  labelWidth: item.labelWidth,
                },
                default: BASIC_CONFIG,
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
              index: {
                type: 'void',
                'x-component': 'ArrayCards.Index',
              },
              remove: {
                type: 'void',
                'x-component': 'ArrayCards.Remove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayCards.MoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayCards.MoveDown',
              },
            },
          },
          properties: {
            addition: {
              type: 'void',
              title: '添加条目',
              'x-component': 'ArrayCards.Addition',
            },
          },
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

export default connect(
  Fc,
  mapProps(
    {
      value: 'value',
    },
    mapSize,
  ),
);
