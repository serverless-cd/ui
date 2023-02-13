## Auth

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
      <div style={{ fontSize: '18px', fontWeight: 'blod' }}>Serverless Application Center</div>
      <div style={{ textAlign: 'right' }}>https://www.osac.com</div>
    </div>
  );
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Auth
          title={title}
          titleStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          type="LOGINEMAIL"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="#忘记密码">Remember Me</a>
            <a href="#注册">Create an account</a>
          </div>
        </Auth>
      </div>
    </>
  );
};
```

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
          title={title}
          githubUrl="https://github.com/login/oauth/authorize?  client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo"
          giteeUrl="https://github.com/login/oauth/authorize?client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo"
          type="LOGIN"
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
          title={title}
          githubUrl="https://github.com/login/oauth/authorize?  client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo"
          giteeUrl="https://github.com/login/oauth/authorize?client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo"
          type="REMEMBER"
        >
          <div className="admin-public-width">
            <a href="#用户名登陆" className="admin-register-color admin-cursor admin-go-login">
              已经有账户？前往登录
            </a>
          </div>
        </Auth>
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
          title={title}
          githubUrl="https://github.com/login/oauth/authorize?  client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo"
          giteeUrl="https://github.com/login/oauth/authorize?client_id=86059a1b2bb20d3e5fc3&scope=repo,repo:status,delete_repo"
          type="REGISTER"
        >
          <div className="admin-public-width">
            <a href="#用户名登陆" className="admin-register-color admin-cursor admin-go-login">
              已经有账户？前往登录
            </a>
          </div>
        </Auth>
      </div>
    </>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
