import React, { useEffect, useMemo, useState } from 'react';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form, ArrayCards, Input, NumberPicker, Space, FormCollapse, FormTab } from '@formily/next';
import FormItem from '../formily/form-item';
import KeyValue from '../formily/key-value';
import Select from '../formily/select';
import Span from '../formily/span';
import OneOf from '../formily/oneof';
import Switch from '../formily/switch';
import ArrayStrings from '../formily/array-string';
import tranformSchema from '../../utils/tranformSchema';
import memorySize from '../../reactions/memorySize';
import AddService from './add-service';
import _ from 'lodash';

const SchemaField = createSchemaField({
  components: {
    FormCollapse,
    KeyValue,
    Space,
    Input,
    ArrayStrings,
    ArrayCards,
    Switch,
    Select,
    FormItem,
    NumberPicker,
    Span,
    OneOf,
    FormTab,
  },
  scope: {
    memorySize,
  },
});

const formCollapse = FormCollapse.createFormCollapse();
const formTab = FormTab.createFormTab();

export default ({ dataSource, onChange }: { dataSource: object; onChange: Function }) => {
  const [schema, setSchema] = useState<any>();
  const [addParams, setAddParams] = useState();
  const form = useMemo(
    () =>
      createForm({
        validateFirst: true,
        effects: () => {
          onFormValuesChange((obj) => {
            const data = obj.values;
            const tmp = {};
            for (const key in data) {
              const ele = data[key];
              if (key === _.get(addParams, 'serviceName')) {
                tmp[key] = { ..._.get(addParams, 'data', {}), props: ele };
              } else {
                tmp[key] = { props: ele };
              }
            }
            onChange(tmp);
          });
        },
      }),
    [JSON.stringify(addParams)],
  );

  const fetchSchema = async (services) => {
    const tmp = {};
    for (const key in services) {
      const ele = services[key];
      _.set(tmp, key, {
        type: 'void',
        'x-component': 'FormTab.TabPane',
        'x-component-props': {
          tab: key,
        },
        properties: {
          [key]: await tranformSchema(ele.props, key),
        },
      });
    }
    setSchema({
      type: 'object',
      properties: {
        collapse: {
          type: 'void',
          'x-component': 'FormTab',
          'x-component-props': {
            formTab: '{{formTab}}',
          },
          properties: tmp,
        },
      },
    });
  };

  useEffect(() => {
    fetchSchema(dataSource);
  }, []);

  const handleAdd = async (params) => {
    const { serviceName: key, data } = params;
    setAddParams(params);
    const tmp = {};
    _.set(tmp, key, {
      type: 'void',
      'x-component': 'FormTab.TabPane',
      'x-component-props': {
        tab: key,
      },
      properties: {
        [key]: await tranformSchema(data.props, key),
      },
    });
    const result = _.merge({}, schema, {
      type: 'object',
      properties: {
        collapse: {
          type: 'void',
          'x-component': 'FormTab',
          'x-component-props': {
            formTab: '{{formTab}}',
          },
          properties: tmp,
        },
      },
    });
    setSchema(result);
    formTab.setActiveKey(key);
  };

  return (
    <Form form={form} style={{ marginTop: 8, position: 'relative' }}>
      <AddService handleAdd={handleAdd} />
      <SchemaField schema={schema} scope={{ formCollapse, formTab }} />
    </Form>
  );
};
