import React, { useState } from 'react';
import { Field, Form, Input, Button, Icon } from '@alicloud/console-components';
import {
  IProps,
  LOGIN_TYPE,
  LOGIN_TYPE_VALUE,
  LOGIN_TEXT,
  LOGIN_EMAIL_TEXT,
  REMEMBER_TEXT,
  REGISTER_TEXT,
} from './types';
import './index.less';
import './icon.less';
import { i18n } from './utils';

const dataSource = [
  { value: 'needless', label: i18n('ui.notifiy.remindType.needless') },
  { value: 'owner', label: i18n('ui.notifiy.remindType.owner') },
  { value: 'appoint', label: i18n('ui.notifiy.remindType.appoint') },
];

const Register = (props: any) => {
  const {
    className = {},
    title,
    singIn = () => {},
    rememberMe = () => {},
    signUp = () => {},
    githubUrl,
    giteeUrl,
    type,
    children,
    style,
    titleStyle,
  } = props;
  const field = Field.useField();
  const { init, validate, getValue } = field;

  const [adminStatus] = useState<LOGIN_TYPE_VALUE>(LOGIN_TYPE[type] || LOGIN_TYPE.LOGIN);

  const Store_Account_Information: any = {
    [LOGIN_TYPE.LOGIN]: {
      ...LOGIN_TEXT,
      operateFunc: singIn,
    },
    [LOGIN_TYPE.LOGINEMAIL]: {
      ...LOGIN_EMAIL_TEXT,
      operateFunc: singIn,
    },
    [LOGIN_TYPE.REMEMBER]: {
      ...REMEMBER_TEXT,
      operateFunc: rememberMe,
    },
    [LOGIN_TYPE.REGISTER]: {
      ...REGISTER_TEXT,
      operateFunc: signUp,
    },
  };
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

  const validatePassword = (rule, value, tag) => {
    const regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,18}');
    const password = getValue('password');
    const confirm_password = getValue('confirm_password');
    if (tag === 'confirm_password') {
      return new Promise((resolve, reject) => {
        if (password === confirm_password) {
          resolve(value);
        } else {
          reject([new Error('两次密码不一致')]);
        }
      });
    }
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

  const handleTripartiteProviderUrl = (url) => {
    // 跳转第三方登录
    window.open(url);
  };

  const handleLogin = () => {
    validate((error, values) => {
      if (error) return;
      Store_Account_Information[adminStatus].operateFunc(values);
    });
  };

  return (
    <Form field={field} className={className} style={style}>
      <Form.Item className="admin-title" style={{ ...titleStyle }}>
        {title}
      </Form.Item>
      {adminStatus !== LOGIN_TYPE.LOGINEMAIL && (
        <Form.Item className="admin-public-width">
          <Input
            {...init('username', {
              rules: [
                {
                  validator: validateUsername,
                },
              ],
            })}
            innerBefore={<Icon className="admin-icon" type="account" />}
            className="admin-public-width"
            placeholder={Store_Account_Information[adminStatus].account}
          />
        </Form.Item>
      )}
      {adminStatus === LOGIN_TYPE.LOGINEMAIL && (
        <Form.Item label={Store_Account_Information[adminStatus]['label_email']}>
          <Input
            {...init('email', {
              rules: [
                {
                  validator: validateEmail,
                },
              ],
            })}
            innerBefore={
              <div className="admin-icon">
                <i className="iconfont">&#xe908;</i>
              </div>
            }
            className="admin-public-width"
            placeholder={Store_Account_Information[adminStatus].email}
          />
        </Form.Item>
      )}
      <Form.Item
        className="admin-public-width"
        label={Store_Account_Information[adminStatus]['label_password']}
      >
        <Input.Password
          {...(init('password', {
            rules: [
              {
                validator: validatePassword,
              },
            ],
          }) as {})}
          innerBefore={<Icon className="admin-icon" type="lock" />}
          style={{ width: '100%' }}
          placeholder={Store_Account_Information[adminStatus].password}
        />
      </Form.Item>
      {(adminStatus === LOGIN_TYPE.REMEMBER || adminStatus === LOGIN_TYPE.REGISTER) && (
        <Form.Item className="admin-public-width" required>
          <Input.Password
            {...(init('confirm_password', {
              rules: [
                {
                  validator: (rule, value) => validatePassword(rule, value, 'confirm_password'),
                },
              ],
            }) as {})}
            innerBefore={<Icon className="admin-icon" type="lock" />}
            style={{ width: '100%' }}
            placeholder={Store_Account_Information[adminStatus].reconfirm}
          />
        </Form.Item>
      )}
      {adminStatus === LOGIN_TYPE.REGISTER && (
        <Form.Item>
          <Input
            {...init('email', {
              rules: [
                {
                  validator: validateEmail,
                },
              ],
            })}
            innerBefore={
              <div className="admin-icon">
                <i className="iconfont">&#xe908;</i>
              </div>
            }
            className="admin-public-width"
            placeholder={Store_Account_Information[adminStatus].email}
          />
        </Form.Item>
      )}

      <Form.Item className="admin-public-width">
        <Button type="primary" className="admin-public-width" onClick={() => handleLogin()}>
          {Store_Account_Information[adminStatus].operate}
        </Button>
      </Form.Item>
      {
        // 自定义内容
        children
      }
      <Form.Item className="admin-public-width">
        <div className="admin-tripartite-provider">
          {githubUrl && (
            <div className="icon" onClick={() => handleTripartiteProviderUrl(githubUrl)}>
              <i className="iconfont">&#xe50e;</i>
            </div>
          )}
          {giteeUrl && (
            <div className="icon" onClick={() => handleTripartiteProviderUrl(giteeUrl)}>
              <i className="iconfont">&#xe60c;</i>
            </div>
          )}
        </div>
      </Form.Item>
    </Form>
  );
};

export default Register;
