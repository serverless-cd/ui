import React from 'react';
import { isEmpty } from 'lodash';
import { Form, Input, Switch, Select } from '@alicloud/console-components';
import TextWithBalloon from './TextWithBalloon';
import { FORM_CUSTOM_MIDDLE_LABEL_LEFT, IProps } from './types';
import './index.less';

const dataSource = [
  { value: 'needless', label: '不提醒' },
  { value: 'owner', label: '所有人' },
  { value: 'appoint', label: '指定成员' },
];

const Notifiy = (props: IProps) => {
  const { field, initValue = {}, className = {} } = props;
  const { init, getValue } = field;

  const validateWebhook = async (rule, value, callback) => {
    if (!getValue('enable')) return callback();
    if (isEmpty(value)) {
      return callback('“webhook地址”为必填项。');
    }
    /^((https|http)?:\/\/)[^\s]+/.test(value) ? callback() : callback('请输入正确的webhook地址');
  };

  return (
    <Form field={field} className={className} {...FORM_CUSTOM_MIDDLE_LABEL_LEFT}>
      <Form.Item label="开启通知" className="switch-center">
        <Switch
          {...(init('enable', {
            valueName: 'checked',
            initValue: initValue['enable'],
          }) as {})}
        ></Switch>
      </Form.Item>
      {getValue('enable') && (
        <Form field={field} {...FORM_CUSTOM_MIDDLE_LABEL_LEFT}>
          <Form.Item label="webhook地址">
            <Input
              {...init('webhook', {
                initValue: initValue['webhook'],
                rules: [{ validator: validateWebhook }],
              })}
              placeholder="钉钉机器人通知 URL"
              className="full-width"
            />
          </Form.Item>
          <Form.Item
            label={
              <TextWithBalloon
                color="color-light-black"
                align="tr"
                text={'加签秘钥'}
                tips={'钉钉自定义机器人必须开启安全设置，若未使用加签，无需填写加签秘钥'}
              />
            }
          >
            <Input
              {...init('secret', { initValue: initValue['secret'] })}
              placeholder="若钉钉机器人安全设置开启加签，请填写加签秘钥"
              className="full-width"
            />
          </Form.Item>
          <Form.Item label="仅失败时通知">
            <Switch
              {...(init('skipOnSuccess', {
                valueName: 'checked',
                initValue: initValue['skipOnSuccess'],
              }) as {})}
            ></Switch>
          </Form.Item>
          <Form.Item label="自定义内容">
            <Input.TextArea
              {...init('messageContent', { initValue: initValue['messageContent'] })}
              placeholder="填写自定义消息内容"
              className="full-width"
            />
          </Form.Item>
          <Form.Item label="提醒方式">
            <Select
              placeholder="请选择提醒方式"
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
                    text={'@手机号'}
                    tips={'多个手机号之间以,分隔'}
                  />
                }
              >
                <Input
                  {...init('atMobiles', { initValue: initValue['atMobiles'] })}
                  placeholder="输入你要@的成员手机号(钉钉手机号)"
                  className="full-width"
                  disabled={getValue('isAtAll')}
                />
              </Form.Item>
              <Form.Item
                label={
                  <TextWithBalloon
                    color="color-light-black"
                    align="tr"
                    text={'@指定用户'}
                    tips={'多个用户之间以,分隔'}
                  />
                }
              >
                <Input
                  {...init('atUserIds', { initValue: initValue['atUserIds'] })}
                  placeholder="输入你要@的用户"
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
