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

interface fieldProps {
  init: Function;
  getValue: Function;
}

export interface IProps {
  field: fieldProps;
  initValue?: object;
  className?: object | any;
  isPreview?: boolean;
}

export enum HELP_TYPE {
  WEBHOOK = 'webhook',
  SECRET = 'secret',
  MESSAGE_CONTENT = 'messageContent',
  AT_MOBILES = 'atMobiles',
  AT_USER_IDS = 'atUserIds',
}
