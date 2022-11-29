import React from 'react';
import { isEmpty } from 'lodash';
import { Form, Input, Switch, Select } from '@alicloud/console-components';
import TextWithBalloon from './TextWithBalloon';
import { FORM_CUSTOM_MIDDLE_LABEL_LEFT, IProps } from './types';
import './index.less';
import { i18n } from '../utils';

const dataSource = [
  { value: 'needless', label: i18n('ui.notifiy.remindType.needless') },
  { value: 'owner', label: i18n('ui.notifiy.remindType.owner') },
  { value: 'appoint', label: i18n('ui.notifiy.remindType.appoint') },
];

const Notifiy = (props: IProps) => {
  const { field, initValue = {}, className = {} } = props;
  const { init, getValue } = field;

  const validateWebhook = async (rule, value, callback) => {
    if (!getValue('enable')) return callback();
    if (isEmpty(value)) {
      return callback(i18n('ui.notifiy.webhook.tip'));
    }
    /^((https|http)?:\/\/)[^\s]+/.test(value)
      ? callback()
      : callback(i18n('ui.notifiy.webhook.correct.tip'));
  };

  return (
    <Form field={field} className={className} {...FORM_CUSTOM_MIDDLE_LABEL_LEFT}>
      <Form.Item label={i18n('ui.notifiy.enable.label')} className="switch-center">
        <Switch
          {...(init('enable', {
            valueName: 'checked',
            initValue: initValue['enable'],
          }) as {})}
        ></Switch>
      </Form.Item>
      {getValue('enable') && (
        <Form field={field} {...FORM_CUSTOM_MIDDLE_LABEL_LEFT}>
          <Form.Item label={i18n('ui.notifiy.webhook.label')}>
            <Input
              {...init('webhook', {
                initValue: initValue['webhook'],
                rules: [{ validator: validateWebhook }],
              })}
              placeholder={i18n('ui.notifiy.webhook.placeholder')}
              className="full-width"
            />
          </Form.Item>
          <Form.Item
            label={
              <TextWithBalloon
                color="color-light-black"
                align="tr"
                text={i18n('ui.notifiy.secret.label')}
                tips={i18n('ui.notifiy.secret.tips')}
              />
            }
          >
            <Input
              {...init('secret', { initValue: initValue['secret'] })}
              placeholder={i18n('ui.notifiy.secret.placeholder')}
              className="full-width"
            />
          </Form.Item>
          <Form.Item label={i18n('ui.notifiy.skipOnSuccess.label')}>
            <Switch
              {...(init('skipOnSuccess', {
                valueName: 'checked',
                initValue: initValue['skipOnSuccess'],
              }) as {})}
            ></Switch>
          </Form.Item>
          <Form.Item label={i18n('ui.notifiy.messageContent.label')}>
            <Input.TextArea
              {...init('messageContent', { initValue: initValue['messageContent'] })}
              placeholder={i18n('ui.notifiy.messageContent.placeholder')}
              className="full-width"
            />
          </Form.Item>
          <Form.Item label={i18n('ui.notifiy.remindType.label')}>
            <Select
              placeholder={i18n('ui.notifiy.remindType.placeholder')}
              {...(init('remindType', {
                initValue: initValue['remindType'] || 'needless',
              }) as {})}
              dataSource={dataSource}
              className="full-width"
            />
          </Form.Item>
          {getValue('remindType') === 'appoint' && (
            <>
              <Form.Item
                label={
                  <TextWithBalloon
                    color="color-light-black"
                    align="tr"
                    text={i18n('ui.notifiy.atMobiles.label')}
                    tips={i18n('ui.notifiy.atMobiles.tips')}
                  />
                }
              >
                <Input
                  {...init('atMobiles', { initValue: initValue['atMobiles'] })}
                  placeholder={i18n('ui.notifiy.atMobiles.placeholder')}
                  className="full-width"
                  disabled={getValue('isAtAll')}
                />
              </Form.Item>
              <Form.Item
                label={
                  <TextWithBalloon
                    color="color-light-black"
                    align="tr"
                    text={i18n('ui.notifiy.atUserIds.label')}
                    tips={i18n('ui.notifiy.atUserIds.tips')}
                  />
                }
              >
                <Input
                  {...init('atUserIds', { initValue: initValue['atUserIds'] })}
                  placeholder={i18n('ui.notifiy.atUserIds.placeholder')}
                  className="full-width"
                  disabled={getValue('isAtAll')}
                />
              </Form.Item>
            </>
          )}
        </Form>
      )}
    </Form>
  );
};

export default Notifiy;
