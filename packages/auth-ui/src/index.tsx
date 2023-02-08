import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Field, Form, Input, Button } from '@alicloud/console-components';
import { IProps, AUTH_COMPONENT, AUTH_TYPE } from './types';
import './index.less';
import { i18n } from './utils';

const dataSource = [
  { value: 'needless', label: i18n('ui.notifiy.remindType.needless') },
  { value: 'owner', label: i18n('ui.notifiy.remindType.owner') },
  { value: 'appoint', label: i18n('ui.notifiy.remindType.appoint') },
];

const Auth = (props: IProps) => {
  const { className = {}, children, title, value, style, titleStyle } = props;
  const field = Field.useField();
  const { init, getValue, validate } = field;

  const { credentialProvider, tripartiteProvider = [], layout, labelTextAlign } = value;
  const { credentials = {}, onSubmit } = credentialProvider;

  const validateUsername = (rule, value) => {
    const regex = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
    return new Promise((resolve, reject) => {
      if (regex.test(value)) {
        reject([new Error('请输入正确格式，不支持中文')]);
      } else if (/\s/g.test(value)) {
        reject([new Error('请输入正确格式，不支持空格')]);
      } else {
        resolve(value);
      }
    });
  };

  const validatePassword = (rule, value) => {
    const regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,18}');
    return new Promise((resolve, reject) => {
      if (regex.test(value)) {
        resolve(value);
      } else {
        reject([new Error('密码中必须包含字母、数字、特称字符，至少6个字符，最多18个字符')]);
      }
    });
  };

  const validateEmail = (rule, value) => {
    const regex = new RegExp('^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$');
    return new Promise((resolve, reject) => {
      if (regex.test(value)) {
        resolve(value);
      } else {
        reject([new Error('邮箱格式中必须包含@，及.com、.cn、.net等后缀名')]);
      }
    });
  };

  const RenderComponent = (component, obj) => {
    if (component === AUTH_COMPONENT['INPUT']) {
      return (
        <Form.Item label={obj.label} required={obj.required}>
          <Input
            {...init(obj.type, {
              rules: [
                {
                  validator: obj.type === AUTH_TYPE['EMAIL'] ? validateEmail : validateUsername,
                },
              ],
            })}
            innerBefore={<div className="admin-icon">{obj.icon}</div>}
            className="admin-public-width"
            placeholder={obj.placeholder}
          />
        </Form.Item>
      );
    }
    if (component === AUTH_COMPONENT['PASSWORD']) {
      return (
        <Form.Item label={obj.label} required={obj.required}>
          <Input.Password
            {...init(obj.type, {
              rules: [
                {
                  validator: validatePassword,
                },
              ],
            })}
            innerBefore={<div className="admin-icon">{obj.icon}</div>}
            className="admin-public-width"
            placeholder={obj.placeholder}
          />
        </Form.Item>
      );
    }
    if (component === AUTH_COMPONENT['BUTTON']) {
      return (
        <Form.Item label={`${obj.type === AUTH_TYPE['LOGIN'] ? '' : ' '}`}>
          <Button className="admin-public-width" type="primary" onClick={handleSubmit}>
            {obj.label}
          </Button>
        </Form.Item>
      );
    }
  };

  const handleTripartiteProviderUrl = (url) => {
    // 跳转第三方登录
    window.location.href = url;
  };

  const handleSubmit = () => {
    validate((error, values) => {
      if (error) return;
      onSubmit(values);
    });
  };
  return (
    <Form
      field={field}
      className={`${className}`}
      style={{ width: '100%', ...style }}
      labelTextAlign={labelTextAlign}
      {...layout}
    >
      <Form.Item style={{ ...titleStyle }}>{title}</Form.Item>
      {Object.getOwnPropertyNames(credentials).map((key) => {
        return RenderComponent(credentials[key]['x-component'], credentials[key]);
      })}
      {
        // 自定义内容
        children
      }
      {!isEmpty(tripartiteProvider) && (
        <Form.Item className="admin-public-width">
          <div className="admin-tripartite-provider">
            {tripartiteProvider.map((item) => {
              return (
                <div className="icon" onClick={() => handleTripartiteProviderUrl(item.url)}>
                  {item.icon}
                </div>
              );
            })}
          </div>
        </Form.Item>
      )}
    </Form>
  );
};

export default Auth;
