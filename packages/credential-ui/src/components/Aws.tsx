import React, { FC } from 'react';
import { Form, Field, Input } from '@alicloud/console-components';
import { FORM_LAYOUT } from '../constants';
import i18n from '../i18n';
const FormItem = Form.Item;

type Props = {
  field: Field;
};

const Aws: FC<Props> = (props) => {
  const { field } = props;
  const { init } = field;
  return (
    <>
      <FormItem label="AccessKeyID" required {...FORM_LAYOUT}>
        <Input
          placeholder={i18n('webview.credential_list.access_key_id')}
          className="full-width"
          {...init('AccessKeyID', {
            rules: [
              {
                required: true,
                message: i18n('webview.credential_list.access_key_id_required'),
              },
            ],
          })}
        />
      </FormItem>
      <FormItem label="SecretAccessKey" required {...FORM_LAYOUT}>
        <Input
          placeholder={i18n('webview.credential_list.secret_access_key')}
          className="full-width"
          {...init('SecretAccessKey', {
            rules: [
              {
                required: true,
                message: i18n('webview.credential_list.secret_access_key_required'),
              },
            ],
          })}
        />
      </FormItem>
    </>
  );
};

export default Aws;
