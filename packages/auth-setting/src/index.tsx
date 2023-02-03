import React, { FC, useMemo, ReactNode } from 'react';
import { createForm, onFormValuesChange, Form } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import { FormItem, FormLayout, Input, Select, IFormLayoutProps } from '@formily/next';
import schema from './schema';
import { cloneDeep, noop } from 'lodash';

type Props = {
  formLayoutProps?: IFormLayoutProps;
  value?: any;
  onChange?: () => void;
  children: (form: Form) => ReactNode;
};

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
  },
});

const AuthSetting: FC<Props> = (props) => {
  const { formLayoutProps, value, onChange = noop, children } = props;
  const form = useMemo(
    () =>
      createForm({
        validateFirst: true,
        initialValues: value,
        effects: () => {
          onFormValuesChange(({ values }) => onChange(cloneDeep(values)));
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

export default AuthSetting;
