import React, { forwardRef, useImperativeHandle } from 'react';
import { isEmpty, noop } from 'lodash';
import { Form, Input, Switch, Select, Field } from '@alicloud/console-components';
import { FORM_CUSTOM_MIDDLE_LABEL_LEFT, IProps, HELP_TYPE } from './types';
import { HELP_RENDER } from './constants';
import './index.less';
import { i18n } from './utils';

const dataSource = [
  { value: 'needless', label: i18n('ui.notifiy.remindType.needless') },
  { value: 'owner', label: i18n('ui.notifiy.remindType.owner') },
  { value: 'appoint', label: i18n('ui.notifiy.remindType.appoint') },
];

const DingTalk = (props: IProps, ref) => {
  const { value = {}, onChange = noop, className = {}, isPreview, messageHelp = '' } = props;
  const field = Field.useField({
    onChange: () => {
      onChange(getValues());
    },
  });

  const { init, getValue, getValues, validate } = field;

  useImperativeHandle(ref, () => ({
    validate,
  }));

  const validateWebhook = async (rule, value, callback) => {
    if (isEmpty(value)) {
      return callback(i18n('ui.notifiy.webhook.tip'));
    }
    /^((https|http)?:\/\/)[^\s]+/.test(value)
      ? callback()
      : callback(i18n('ui.notifiy.webhook.correct.tip'));
  };

  return (
    <Form
      field={field}
      isPreview={isPreview}
      className={className}
      {...FORM_CUSTOM_MIDDLE_LABEL_LEFT}
    >
      <Form.Item
        label={i18n('ui.notifiy.webhook.label')}
        required
        extra={<div className="color-8 mt-4">{HELP_RENDER[HELP_TYPE.WEBHOOK]}</div>}
      >
        <Input
          {...init('webhook', {
            initValue: value['webhook'],
            rules: [{ validator: validateWebhook }],
          })}
          placeholder={i18n('ui.notifiy.webhook.placeholder')}
          className="full-width"
        />
      </Form.Item>
      <Form.Item label={i18n('ui.notifiy.secret.label')} help={HELP_RENDER[HELP_TYPE.SECRET]}>
        <Input
          {...init('secret', { initValue: value['secret'] })}
          placeholder={i18n('ui.notifiy.secret.placeholder')}
          className="full-width"
        />
      </Form.Item>
      <Form.Item label={i18n('ui.notifiy.skipOnSuccess.label')} className="switch-center">
        <Switch
          {...(init('skipOnSuccess', {
            valueName: 'checked',
            initValue: value['skipOnSuccess'],
          }) as {})}
        ></Switch>
      </Form.Item>
      <Form.Item
        label={i18n('ui.notifiy.messageContent.label')}
        extra={
          <span
            style={{ display: 'inline-block', textAlign: 'justify' }}
            dangerouslySetInnerHTML={{
              __html: messageHelp,
            }}
          ></span>
        }
        required
      >
        <Input.TextArea
          {...init('messageContent', {
            initValue: value['messageContent'],
            rules: [{ required: true, message: i18n('ui.notifiy.help.message.text') }],
          })}
          placeholder={i18n('ui.notifiy.messageContent.placeholder')}
          className="full-width"
        />
      </Form.Item>
      <Form.Item label={i18n('ui.notifiy.remindType.label')}>
        <Select
          placeholder={i18n('ui.notifiy.remindType.placeholder')}
          {...(init('remindType', {
            initValue: value['remindType'] || 'needless',
          }) as {})}
          dataSource={dataSource}
          className="full-width"
        />
      </Form.Item>
      {getValue('remindType') === 'appoint' && (
        <>
          <Form.Item
            label={i18n('ui.notifiy.atMobiles.label')}
            help={HELP_RENDER[HELP_TYPE.AT_MOBILES]}
          >
            <Input
              {...init('atMobiles', { initValue: value['atMobiles'] })}
              placeholder={i18n('ui.notifiy.atMobiles.placeholder')}
              className="full-width"
            />
          </Form.Item>
          {/* <Form.Item
            label={i18n('ui.notifiy.atUserIds.label')}
            help={HELP_RENDER[HELP_TYPE.AT_USER_IDS]}
          >
            <Input
              {...init('atUserIds', { initValue: value['atUserIds'] })}
              placeholder={i18n('ui.notifiy.atUserIds.placeholder')}
              className="full-width"
            />
          </Form.Item> */}
        </>
      )}
    </Form>
  );
};

export default forwardRef(DingTalk);
