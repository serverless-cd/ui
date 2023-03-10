import { createForm, onFormValuesChange } from '@formily/core';
import React, { useMemo, FC } from 'react';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/next';
import { defaultTagRE } from '../../constants';
import { map } from 'lodash';

const styleProps = {
  'x-decorator-props': {
    labelWidth: 80,
    wrapperStyle: {
      marginRight: 16,
    },
  },
};

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
});

type Props = {
  accessList: string[];
  dataSource: {
    edition: string;
    name?: string;
    access?: string;
  };
  onChange: (value: Record<string, any>) => void;
};

const ProjectBase: FC<Props> = (props) => {
  const { dataSource, onChange, accessList } = props;
  const schema = {
    type: 'object',
    properties: {
      edition: {
        type: 'string',
        title: '版本号',
        required: true,
        default: '1.0.0',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: ['1.0.0'],
        ...styleProps,
      },
      name: {
        type: 'string',
        title: '项目名',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        ...styleProps,
      },
      access: {
        type: 'string',
        title: '密 钥',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          dataSource: map(accessList, (item) => ({ label: item, value: item })),
        },
        ...styleProps,
      },
    },
  };
  const form = useMemo(() => {
    const { access = '' } = dataSource;
    if (access.match(defaultTagRE)) {
      dataSource.access = undefined;
    }
    return createForm({
      validateFirst: true,
      initialValues: dataSource,
      effects: () => {
        onFormValuesChange((payload) => onChange(payload.values));
      },
    });
  }, []);

  return (
    <Form form={form}>
      <SchemaField schema={schema} />
    </Form>
  );
};

export default ProjectBase;
