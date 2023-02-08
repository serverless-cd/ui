## Auth

# 用户名登陆

```tsx
import React, { useEffect, useState } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button, Input } from '@alicloud/console-components';
import Auth from '@serverless-cd/auth-ui';
import './icon.less';

// 使用方式
//  组件被field接管。

export default () => {
  const title = (
    <div>
      <div style={{ fontSize: '18px', fontWeight: 'blod' }}>开源</div>
      <div style={{ fontSize: '18px', fontWeight: 'blod' }}>Serverless Application Center</div>
      <div style={{ textAlign: 'right' }}>https://www.osac.com</div>
    </div>
  );
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Auth
          style={{
            width: 400,
            border: '1px solid #fff',
            borderRadius: '5px',
            boxShadow: '-2px 4px 26px 0 rgba(0, 0, 0, 0.1)',
            padding: '24px 48px',
          }}
          value={{
            credentialProvider: {
              credentials: {
                username: {
                  label: '', // 标签
                  type: 'username', // 定义字段名称
                  'x-component': 'Input', // 组件
                  placeholder: '请输入用户名',
                  required: true, // 是否为必填项
                  icon: <i class="iconfont">&#xe619;</i>,
                },
                password: {
                  label: '',
                  type: 'password',
                  'x-component': 'Password',
                  placeholder: '请输入密码',
                  required: true, // 是否为必填项
                  icon: <i class="iconfont">&#xf0109;</i>,
                },
                login: {
                  label: '登陆',
                  type: 'login',
                  'x-component': 'Button',
                },
              },
              async singIn(callbalck, req) {
                console.log('被调用函数');
              },
            },
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="#忘记密码">忘记密码</a>
            <a href="#注册">免费注册</a>
          </div>
        </Auth>
      </div>
    </>
  );
};
```

# 邮箱登陆

```tsx
import React, { useEffect, useState } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button, Input } from '@alicloud/console-components';
import Auth from '@serverless-cd/auth-ui';
import './icon.less';

// 使用方式
//  组件被field接管。

export default () => {
  const title = (
    <div>
      <div style={{ fontSize: '18px', fontWeight: 'blod' }}>开源</div>
      <div style={{ fontSize: '18px', fontWeight: 'blod' }}>Serverless Application Center</div>
      <div style={{ textAlign: 'right' }}>https://www.osac.com</div>
    </div>
  );
  // 其他登陆方式
  const loginMethod = <div></div>;
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Auth
          title={title}
          titleStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          style={{
            width: 400,
            border: '1px solid #fff',
            borderRadius: '5px',
            boxShadow: '-2px 4px 26px 0 rgba(0, 0, 0, 0.1)',
            padding: '24px 48px',
          }}
          value={{
            credentialProvider: {
              credentials: {
                email: {
                  label: 'email', // 标签
                  type: 'email', // 定义字段名称
                  'x-component': 'Input', // 组件
                  placeholder: '请输入邮箱',
                  required: true, // 是否为必填项
                  icon: <i class="iconfont">&#xe7b1;</i>,
                },
                password: {
                  label: 'password',
                  type: 'password',
                  'x-component': 'Password',
                  placeholder: '请输入密码',
                  required: true, // 是否为必填项
                  icon: <i class="iconfont">&#xf0109;</i>,
                },
                login: {
                  label: '登陆',
                  type: 'login',
                  'x-component': 'Button',
                },
              },
              async singIn(callbalck, req) {
                console.log('被调用函数');
              },
            },
            tripartiteProvider: [
              {
                name: 'github',
                icon: <i class="iconfont">&#xe603;</i>,
                url: 'https://github.com/login/oauth/authorize?  client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo',
              },
              {
                name: 'gitee',
                icon: <i class="iconfont">&#xe60c;</i>,
                url: 'https://github.com/login/oauth/authorize?client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo',
              },
            ],
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="#忘记密码">忘记密码</a>
            <a href="#注册">免费注册</a>
          </div>
        </Auth>
      </div>
    </>
  );
};
```

# 忘记密码

```tsx
import React, { useEffect, useState } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button } from '@alicloud/console-components';
import Auth from '@serverless-cd/auth-ui';

// 使用方式
//  组件被field接管。

export default () => {
  const title = (
    <div>
      <div style={{ fontSize: '18px', fontWeight: 'blod' }}>开源</div>
      <div style={{ fontSize: '18px', fontWeight: 'blod' }}>Serverless Application Center</div>
      <div style={{ textAlign: 'right' }}>https://www.osac.com</div>
    </div>
  );
  const Layout = {
    labelCol: {
      fixedSpan: 10,
    },
    wrapperCol: {
      span: 14,
    },
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Auth
          value={{
            layout: Layout, // 布局
            credentialProvider: {
              credentials: {
                username: {
                  label: 'username', // 标签
                  type: 'username', // 定义字段名称
                  'x-component': 'Input', // 组件
                  placeholder: '请输入账号',
                  required: true, // 是否为必填项
                },
                email: {
                  label: 'email',
                  type: 'email',
                  'x-component': 'Password',
                  placeholder: '请输输入邮箱',
                  required: true, // 是否为必填项
                },
                password: {
                  label: 'password',
                  type: 'password',
                  'x-component': 'Password',
                  placeholder: '请输入密码',
                  required: true, // 是否为必填项
                },
                confirm_password: {
                  label: 'confirm_password',
                  type: 'confirm_password',
                  'x-component': 'Password',
                  placeholder: '请在次确认密码',
                  required: true, // 是否为必填项
                },
                regisiter: {
                  label: '确认变更',
                  type: 'regisiter',
                  'x-component': 'Button',
                  placeholder: '请输入密码',
                  required: true, // 是否为必填项
                },
              },
              async singIn(callbalck, req) {
                console.log('被调用函数');
              },
              async onSubmit(callbalck, req) {
                console.log('被调用函数', req);
              },
            },
          }}
        />
      </div>
    </>
  );
};
```

# 注册

```tsx
import React, { useEffect, useState } from 'react';
import '@alicloud/console-components/dist/wind.css';
import { Field, Button } from '@alicloud/console-components';
// import DingTalk from '@serverless-cd/dingtalk-ui';
// import Auth from '@serverless-cd/auth-ui';
import Auth from './index';

// 使用方式
//  组件被field接管。

export default () => {
  const title = (
    <div>
      <div style={{ fontSize: '18px', fontWeight: 'blod' }}>开源</div>
      <div style={{ fontSize: '18px', fontWeight: 'blod' }}>Serverless Application Center</div>
      <div style={{ textAlign: 'right' }}>https://www.osac.com</div>
    </div>
  );
  const Layout = {
    labelCol: {
      fixedSpan: 10,
    },
    wrapperCol: {
      span: 14,
    },
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Auth
          style={{}}
          value={{
            layout: Layout, // 布局
            labelTextAlign: 'right', // 对其方式
            credentialProvider: {
              credentials: {
                username: {
                  label: 'username', // 标签
                  type: 'username', // 定义字段名称
                  'x-component': 'Input', // 组件
                  placeholder: '请输入账号',
                  required: true, // 是否为必填项
                },
                password: {
                  label: 'password',
                  type: 'password',
                  'x-component': 'Password',
                  placeholder: '请输入密码',
                  required: true, // 是否为必填项
                },
                confirm_password: {
                  label: 'confirm_password',
                  type: 'confirm_password',
                  'x-component': 'Password',
                  placeholder: '请确认密码',
                  required: true, // 是否为必填项
                },
                email: {
                  label: 'email',
                  type: 'email',
                  'x-component': 'Input',
                  placeholder: '请输入邮箱',
                  required: true, // 是否为必填项
                },
                name: {
                  label: 'name', // 标签
                  type: 'name', // 定义字段名称
                  'x-component': 'Input', // 组件
                  placeholder: '请输入姓名',
                },
                address: {
                  label: 'address', // 标签
                  type: 'address', // 定义字段名称
                  'x-component': 'Input', // 组件
                  placeholder: '请输入地址',
                },
                regisiter: {
                  label: '注册',
                  type: 'regisiter',
                  'x-component': 'Button',
                  placeholder: '请输入密码',
                  required: true, // 是否为必填项
                },
              },
              async singIn(callbalck, req) {
                console.log('被调用函数');
              },
              async onSubmit(req) {
                // 登录、注册、忘记密码 回调函数
                console.log('被调用函数', req);
              },
            },
          }}
        />
      </div>
    </>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
