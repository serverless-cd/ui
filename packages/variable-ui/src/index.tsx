import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Field, Radio } from '@alicloud/console-components';
import FormMode from './components/FormMode';
import JsonMode from './components/JsonMode';
import { includes, forIn, isEmpty } from 'lodash';
import { i18n } from './utils';
import './index.less';

const RadioGroup = Radio.Group;
type Props = {
  value?: any;
  onChange?: (value: Record<string, any>) => void;
  hintText?: string;
  mode?: string;
};

function convertToJson(data) {
  const out = {};
  (data || []).forEach((item) => {
    const { key, value } = item;
    out[key] = value;
  });
  return JSON.stringify(out, null, 4);
}

function convertToItems(jsonContent, passwords = []) {
  let obj = {};

  try {
    obj = JSON.parse(jsonContent);
  } catch (e) {}

  return Object.keys(obj).map((key) => {
    return {
      key,
      value: typeof obj[key] === 'object' ? JSON.stringify(obj[key]) : obj[key],
      password: includes(passwords, key),
    };
  });
}

const VariableUi = (props: Props, ref) => {
  const { value = {}, onChange, hintText = '', mode = 'form' } = props;
  const formModeRef = useRef(null);
  const field = Field.useField({
    onChange: (name, value) => {
      const { mode } = getValues() as any;
      if (name === 'mode') {
        changeMode(value);
      }
      let newValue;
      if (mode === 'form') {
        newValue = getValue('formConfig');
      } else {
        newValue = convertToItems(getValue('jsonConfig'));
      }
      onChange(valueForma(newValue));
    },
  });
  const { init, getValue, getValues, setValue, validate } = field;

  const changeMode = (value) => {
    let newValue;
    if (value === 'form') {
      newValue = convertToItems(getValue('jsonConfig'));
      setValue('formConfig', newValue);
    } else if (value === 'json') {
      newValue = convertToJson(getValue('formConfig'));
      setValue('jsonConfig', newValue);
    }
  };

  const valueForma = (values) => {
    const obj = {};
    forIn(values, (item) => {
      obj[item.key] = item.value;
    });
    return obj;
  };

  const jsonValidator = (obj) => {
    let errorText = '';
    if (isEmpty(obj)) return;
    forIn(obj, (value, key) => {
      if (!/^[a-zA-Z][_a-zA-Z0-9]*$/.test(key)) {
        errorText = i18n('ui.variable.key.validate.error.message', { key });
      }
      if (!value || new RegExp('[\\u4e00-\\u9fa5]', 'g').test(value)) {
        errorText = i18n('ui.variable.value.validate.error.message', { key, value });
      }
    });
    return errorText;
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      const mode = getValue('mode');
      return new Promise((resolve) => {
        const variableValidate = mode === 'form' ? formModeRef.current.validate : validate;
        variableValidate((error) => (error ? resolve(false) : resolve(true)));
      });
    },
  }));

  return (
    <>
      <div className="mb-10">
        <RadioGroup {...init('mode', { initValue: mode || 'form' })} shape="button" size="medium">
          <Radio style={{ marginRight: 0 }} value={'form'}>
            {i18n('ui.variable.form.edit')}
          </Radio>
          <Radio value={'json'}>{i18n('ui.variable.json.edit')}</Radio>
        </RadioGroup>
        <div className="text-description mt-4">{hintText}</div>
      </div>
      <hr className="mb-20" />
      <Form field={field}>
        {getValue('mode') === 'form' && (
          <Form.Item>
            <FormMode
              {...init('formConfig', { initValue: convertToItems(JSON.stringify(value, null, 4)) })}
              ref={formModeRef}
            />
          </Form.Item>
        )}
        {getValue('mode') === 'json' && (
          <Form.Item>
            <JsonMode
              {...init('jsonConfig', {
                initValue: JSON.stringify(value, null, 4),
                rules: [
                  {
                    validator: (_, value, callback) => {
                      try {
                        const hasError = jsonValidator(JSON.parse(value as any));
                        callback(hasError);
                      } catch (error) {
                        callback(i18n('ui.variable.json.forma.error'));
                      }
                    },
                  },
                ],
              })}
            />
          </Form.Item>
        )}
      </Form>
    </>
  );
};

export default forwardRef(VariableUi);
