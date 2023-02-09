type Align = 'left' | 'right' | undefined;

export const FORM_CUSTOM_MIDDLE_LABEL_LEFT = {
  labelCol: {
    fixedSpan: 7,
  },

  wrapperCol: {
    span: 17,
  },

  labelTextAlign: 'left' as Align,
};

export const FORM_CUSTOM_MIDDLE_LABEL_LEFT_ADMIN = {
  labelCol: {
    span: 4,
    offset: 4,
  },

  wrapperCol: {
    span: 12,
  },

  labelTextAlign: 'left' as Align,
};

export interface IProps {
  initValue?: object;
  className?: object | any;
  isPreview?: boolean;
  title?: string;
  value?: object | any;
  children?: object;
  style?: object;
  titleStyle?: object;
}

export enum HELP_TYPE {
  WEBHOOK = 'webhook',
  SECRET = 'secret',
  MESSAGE_CONTENT = 'messageContent',
  AT_MOBILES = 'atMobiles',
  AT_USER_IDS = 'atUserIds',
}

export enum LOGIN_TYPE {
  LOGIN = 'login',
  LOGINEMAIL = 'login_email',
  REMEMBER = 'remember',
  REGISTER = 'register',
}

export type LOGIN_TYPE_VALUE = `${LOGIN_TYPE}`;

export enum LOGIN_TEXT {
  account = '请输入账号',
  password = '请输入密码',
  operate = '登录',
}

export enum LOGIN_EMAIL_TEXT {
  label_email = 'Email address',
  label_password = 'Password',
  email = 'Please enter email address',
  password = 'Please input a password',
  operate = 'Sing in',
}

export enum REMEMBER_TEXT {
  account = '请输入账号',
  password = '请输入新密码',
  reconfirm = '请确认新密码',
  email = '请输入邮箱',
  operate = '确认变更',
}

export enum REGISTER_TEXT {
  account = '请输入账号',
  password = '请输入密码',
  email = '请输入邮箱',
  phone = '请输入电话',
  address = '请输入地址',
  operate = '注册',
}

export enum AUTH_COMPONENT {
  INPUT = 'Input',
  PASSWORD = 'Password',
  BUTTON = 'Button',
}

export enum AUTH_TYPE {
  USERNAME = 'username',
  PASSWORD = 'password',
  EMAIL = 'email',
  LOGIN = 'login',
  REGISITER = 'register',
}
