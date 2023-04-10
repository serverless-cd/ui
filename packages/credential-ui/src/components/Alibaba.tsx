import React, { FC } from 'react';
import { Form, Field, Input } from '@alicloud/console-components';
import { FORM_LAYOUT } from '../constants';
import i18n from '../i18n';

const FormItem = Form.Item;

type Props = {
  field: Field;
};

const Alibaba: FC<Props> = (props) => {
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
      <FormItem label="AccessKeySecret" required {...FORM_LAYOUT}>
        <Input
          placeholder={i18n('webview.credential_list.access_key_secret')}
          className="full-width"
          {...init('AccessKeySecret', {
            rules: [
              {
                required: true,
                message: i18n('webview.credential_list.access_key_secret_required'),
              },
            ],
          })}
        />
      </FormItem>
    </>
  );
};

export default Alibaba;
