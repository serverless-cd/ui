import React, { FC } from 'react';
import { Form, Field, Input } from '@alicloud/console-components';
import { FORM_LAYOUT } from '../constants';
import i18n from '../i18n';
const FormItem = Form.Item;

type Props = {
  field: Field;
};

const Azure: FC<Props> = (props) => {
  const { field } = props;
  const { init } = field;
  return (
    <>
      <FormItem label="AccountID" required {...FORM_LAYOUT}>
        <Input
          placeholder={i18n('webview.credential_list.account_id')}
          className="full-width"
          {...init('AccountID', {
            rules: [
              {
                required: true,
                message: i18n('webview.credential_list.account_id_required'),
              },
            ],
          })}
        />
      </FormItem>
      <FormItem label="SecretID" required {...FORM_LAYOUT}>
        <Input
          placeholder={i18n('webview.credential_list.secret_id')}
          className="full-width"
          {...init('SecretID', {
            rules: [
              {
                required: true,
                message: i18n('webview.credential_list.secret_id_required'),
              },
            ],
          })}
        />
      </FormItem>
      <FormItem label="SecretKey" required {...FORM_LAYOUT}>
        <Input
          placeholder={i18n('webview.credential_list.secret_key')}
          className="full-width"
          {...init('SecretKey', {
            rules: [
              {
                required: true,
                message: i18n('webview.credential_list.secret_key_required'),
              },
            ],
          })}
        />
      </FormItem>
    </>
  );
};

export default Azure;
