import React from 'react';
import { FC, useState, PropsWithChildren } from 'react';
import SlidePanel from '@alicloud/console-components-slide-panel';
import { Form, Field, Select, Button, Input, Message, Grid } from '@alicloud/console-components';
import { FORM_LAYOUT, PROVIDER_LIST, PROVIDER } from './constants';
import Alibaba from './components/Alibaba';
import Aws from './components/Aws';
import Azure from './components/Azure';
import Google from './components/Google';
import Tencent from './components/Tencent';
import Custom, { customValidate, customFormat } from './components/Custom';
import { find, get, includes, isEmpty, isFunction } from 'lodash';
import { noop } from './utils'
import i18n from './i18n';
import './style/index.less';

const FormItem = Form.Item;
const { Row, Col } = Grid;

type IProps = PropsWithChildren & {
  title?: string;
  existAlias?: string[];
  dataSource?: Record<string, any>;
  onConfirm?: (data: Record<string, any>) => Promise<void>;
  onOpenDocument?: (data: Record<string, any>) => void;
}

const CredentialUi: FC<IProps> = (props) => {
  const { children, title = i18n('webview.credential_list.add_key'), existAlias, onConfirm = noop, onOpenDocument, dataSource } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const field = Field.useField({
    values: dataSource
  });
  const { init, resetToDefault, validate, getValue } = field;
  const handleClose = () => {
    resetToDefault();
    setVisible(false);
  };
  const handleOK = async () => {
    validate(async (errors, values: any) => {
      if (errors) return;
      setLoading(true);
      const { provider, alias, custom, ...rest } = values;
      let data = { provider, alias, ...rest };
      if (provider === PROVIDER.custom) {
        const customData = customFormat(custom);
        data = { provider, alias, ...customData };
      }
      await onConfirm(data);
      setLoading(false);
    });
  };
  const handleDoc = () => {
    const obj = find(PROVIDER_LIST, (item) => item.value === getValue('provider'));
    if (isEmpty(obj)) return;
    if (isFunction(onOpenDocument)) {
      return onOpenDocument(obj);
    }
    window.open(get(obj, 'doc') as string);
  };

  const showDocButton = !!getValue('provider') && getValue('provider') !== PROVIDER.custom;

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>
      <SlidePanel
        title={title}
        isShowing={visible}
        onClose={handleClose}
        onOk={handleOK}
        onCancel={handleClose}
        isProcessing={loading}
        width="large"
        okText={i18n('webview.common.confirm')}
        cancelText={i18n('webview.common.cancel')}
        processingText={i18n('webview.common.processing')}
      >
        {includes(existAlias, getValue('alias')) && (
          <Message type="warning" className="mb-16">
            {i18n('webview.credential_list.alias_exist', { alias: getValue('alias') })}
          </Message>
        )}
        <Form field={field} {...FORM_LAYOUT}>
          <FormItem label={i18n('webview.credential_list.cloud_vendor')} required >
            <Row className='align-center'>
              <Col span={24}>
                <FormItem className='mb-0'>
                  <Select
                    showSearch
                    placeholder={i18n('webview.credential_list.cloud_vendor_placeholder')}
                    className="full-width"
                    {...init('provider', {
                      initValue: PROVIDER.alibaba,
                      rules: [
                        {
                          required: true,
                          message: i18n('webview.credential_list.cloud_vendor_required'),
                        },
                      ],
                    })}
                    dataSource={PROVIDER_LIST}
                  />
                </FormItem>

              </Col>
              {showDocButton && (
                <Button
                  className='ml-16'
                  type="primary"
                  text
                  onClick={handleDoc}
                >
                  {i18n('webview.credential_list.how_to_get')}
                </Button>
              )}
            </Row>

          </FormItem>
          <FormItem label={i18n('webview.create_app.key_alias')} required>
            <Input
              placeholder={i18n('webview.create_app.input_key_alias_placeholder')}
              className="full-width"
              {...init('alias', {
                rules: [
                  {
                    required: true,
                    message: i18n('webview.create_app.key_alias_required'),
                  },
                ],
              })}
            />
          </FormItem>
          {getValue('provider') === PROVIDER.alibaba && <Alibaba field={field} />}
          {[PROVIDER.aws, PROVIDER.huawei, PROVIDER.baidu].includes(getValue('provider')) && (
            <Aws field={field} />
          )}
          {getValue('provider') === PROVIDER.azure && <Azure field={field} />}
          {getValue('provider') === PROVIDER.google && <Google field={field} />}
          {getValue('provider') === PROVIDER.tencent && <Tencent field={field} />}

          {getValue('provider') === PROVIDER.custom && (
            <FormItem label="Custom" required>
              <Custom
                {...init('custom', {
                  rules: [
                    {
                      required: true,
                      validator: customValidate,
                    },
                  ],
                })}
              />
            </FormItem>
          )}
        </Form>
      </SlidePanel>
    </>
  );
};

export default CredentialUi;
