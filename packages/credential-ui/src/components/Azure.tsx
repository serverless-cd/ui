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
      <FormItem label="KeyVaultName" required {...FORM_LAYOUT}>
        <Input
          placeholder={i18n('webview.credential_list.key_vault_name')}
          className="full-width"
          {...init('KeyVaultName', {
            rules: [
              {
                required: true,
                message: i18n('webview.credential_list.key_vault_name_required'),
              },
            ],
          })}
        />
      </FormItem>
      <FormItem label="TenantID" required {...FORM_LAYOUT}>
        <Input
          placeholder={i18n('webview.credential_list.tenant_id')}
          className="full-width"
          {...init('TenantID', {
            rules: [
              {
                required: true,
                message: i18n('webview.credential_list.tenant_id_required'),
              },
            ],
          })}
        />
      </FormItem>
      <FormItem label="ClentID" required {...FORM_LAYOUT}>
        <Input
          placeholder={i18n('webview.credential_list.clent_id')}
          className="full-width"
          {...init('ClentID', {
            rules: [
              {
                required: true,
                message: i18n('webview.credential_list.clent_id_required'),
              },
            ],
          })}
        />
      </FormItem>
      <FormItem label="ClientSecret" required {...FORM_LAYOUT}>
        <Input
          placeholder={i18n('webview.credential_list.client_secret')}
          className="full-width"
          {...init('ClientSecret', {
            rules: [
              {
                required: true,
                message: i18n('webview.credential_list.client_secret_required'),
              },
            ],
          })}
        />
      </FormItem>
    </>
  );
};

export default Azure;
