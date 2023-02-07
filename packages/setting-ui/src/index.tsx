import React, { FC, useMemo, ReactNode } from 'react';
import { createForm, onFormValuesChange, Form } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import { FormItem, FormLayout, Input, IFormLayoutProps } from '@formily/next';
import schema from './schema';
import AsyncSelect from './components/async-select';
import Select from './components/select';
import { cloneDeep, noop } from 'lodash';

type Props = {
  formLayoutProps?: IFormLayoutProps;
  value?: Record<string, any>;
  onChange?: (value: Record<string, any>, form: Form) => void;
  children: (form: Form) => ReactNode;
};

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
    AsyncSelect,
  },
});

const SettingUi: FC<Props> = (props) => {
  const { formLayoutProps, value, onChange = noop, children } = props;
  const form = useMemo(
    () =>
      createForm({
        validateFirst: true,
        initialValues: value,
        effects: () => {
          onFormValuesChange(({ values }) => onChange(cloneDeep(values), form));
        },
      }),
    [],
  );

  return (
    <>
      <FormProvider form={form}>
        <FormLayout {...formLayoutProps}>
          <SchemaField schema={schema} />
        </FormLayout>
      </FormProvider>
      {children && children(form)}
    </>
  );
};

export default SettingUi;
