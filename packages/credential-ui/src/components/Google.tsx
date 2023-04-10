import React, { FC } from 'react';
import { Form, Field, Input } from '@alicloud/console-components';
import { FORM_LAYOUT } from '../constants';
import i18n from '../i18n';
const FormItem = Form.Item;

type Props = {
  field: Field;
};

const Google: FC<Props> = (props) => {
  const { field } = props;
  const { init } = field;
  return (
    <>
      <FormItem label="PrivateKeyData" required {...FORM_LAYOUT}>
        <Input
          placeholder={i18n('webview.credential_list.private_key_data')}
          className="full-width"
          {...init('PrivateKeyData', {
            rules: [
              {
                required: true,
                message: i18n('webview.credential_list.private_key_data_required'),
              },
            ],
          })}
        />
      </FormItem>
    </>
  );
};

export default Google;
