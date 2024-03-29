import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Grid, Field, Button, Icon } from '@alicloud/console-components';
import { map, forIn, cloneDeep, isEmpty } from 'lodash';
import { i18n } from '../utils';
import '../index.less';
const { Row, Col } = Grid;

const styleEye = {
  padding: '0 8px',
  height: '100%',
  lineHeight: '30px',
  margin: 0,
  cursor: 'pointer',
};

function getEmptyItem() {
  return {
    key: '',
    value: '',
    password: false,
  };
}

const FormMode = (props, ref) => {
  const { value, onChange } = props;
  const field = Field.useField({
    onChange: () => {
      let newList = [];
      forIn(getValues(), (item) => {
        if (!isEmpty(item)) {
          newList.push(item);
        }
      });
      onChange(newList);
    },
    parseName: true,
  });
  const { init, getValue, setValue, getValues, validate } = field;

  const valueValidator = (name, value, callback) => {
    if (new RegExp('[\\u4e00-\\u9fa5]', 'g').test(value)) {
      callback(i18n('ui.variable.value.validate.error.message', { key: name, value }));
      return;
    }
    callback();
  };

  const onAddOrRemove = (type, index = 0) => {
    let newValue = cloneDeep(value);
    if (type === 'add') {
      newValue.push(getEmptyItem());
    } else {
      newValue.splice(index, 1);
    }
    onChange([...newValue]);
  };

  useImperativeHandle(ref, () => ({
    validate,
  }));

  return (
    <Form field={field}>
      <Form.Item>
        {map(value, (item, index) => (
          <Row key={index} gutter="16">
            <Col span={12}>
              <Form.Item required>
                <Input
                  {...init(`form-item-${index}.key`, {
                    initValue: item.key,
                    rules: [
                      { required: true, message: i18n('ui.variable.form.key.required.message') },
                      {
                        pattern: /^[a-zA-Z][_a-zA-Z0-9]*$/,
                        message: i18n('ui.variable.key.validate.error.message', { key: item.key }),
                      },
                    ],
                  })}
                  label={i18n('ui.variable.form.key.label')}
                  className="full-width"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item required>
                <Input
                  {...init(`form-item-${index}.value`, {
                    initValue: item.value,
                    rules: [
                      { required: true, message: i18n('ui.variable.form.value.required.message') },
                      {
                        validator: (_, value, callback) =>
                          valueValidator(getValue(`form-item-${index}.key`), value, callback),
                      },
                    ],
                  })}
                  htmlType={getValue(`form-item-${index}.password`) ? 'password' : 'text'}
                  label={i18n('ui.variable.form.value.label')}
                  className="full-width"
                  innerAfter={
                    <Icon
                      style={styleEye}
                      type={`form-item-${index}.password` ? 'eye' : 'eye-slash'}
                      onClick={() =>
                        setValue(
                          `form-item-${index}.password`,
                          !getValue(`form-item-${index}.password`),
                        )
                      }
                    />
                  }
                />
              </Form.Item>
            </Col>
            <Col span={1}>
              <div className="mt-5">
                <Icon
                  size="small"
                  type="delete color-primary cursor-pointer"
                  onClick={() => onAddOrRemove('remove', index as any)}
                />
              </div>
            </Col>
          </Row>
        ))}
        <div className="mb-20">
          <Button onClick={() => onAddOrRemove('add')}>
            <Icon type="add" /> {i18n('ui.variable.form.add.btn')}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default forwardRef(FormMode);
