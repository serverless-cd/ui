import TelpText from '../components/TelpText';
import React from 'react';
import { HELP_TYPE } from '../types';
import { i18n } from '../utils';

const HELP_PARMAS = {
  [HELP_TYPE.WEBHOOK]: {
    text: i18n('ui.notifiy.help.webhook.text'),
    linkConfig: {
      label: i18n('ui.notifiy.help.webhook.link.label'),
      url: 'https://open.dingtalk.com/document/robots/custom-robot-access',
    },
  },
  [HELP_TYPE.SECRET]: {
    text: i18n('ui.notifiy.help.secret.text'),
    linkConfig: {
      label: i18n('ui.notifiy.help.secret.link.label'),
      url: 'https://open.dingtalk.com/document/robots/customize-robot-security-settings',
    },
  },
  [HELP_TYPE.MESSAGE_CONTENT]: {
    text: i18n('ui.notifiy.help.messageContent.text'),
  },
  [HELP_TYPE.AT_MOBILES]: {
    text: i18n('ui.notifiy.help.atMobiles.text'),
  },
  [HELP_TYPE.AT_USER_IDS]: {
    text: i18n('ui.notifiy.help.atUserIds.text'),
  },
  [HELP_TYPE.ENABLE]: {
    text: i18n('ui.notifiy.help.enable.text'),
  },
};

export const HELP_RENDER = {
  [HELP_TYPE.WEBHOOK]: <TelpText {...HELP_PARMAS[HELP_TYPE.WEBHOOK]} />,
  [HELP_TYPE.SECRET]: <TelpText {...HELP_PARMAS[HELP_TYPE.SECRET]} />,
  [HELP_TYPE.MESSAGE_CONTENT]: <TelpText {...HELP_PARMAS[HELP_TYPE.MESSAGE_CONTENT]} />,
  [HELP_TYPE.AT_MOBILES]: <TelpText {...HELP_PARMAS[HELP_TYPE.AT_MOBILES]} />,
  [HELP_TYPE.AT_USER_IDS]: <TelpText {...HELP_PARMAS[HELP_TYPE.AT_USER_IDS]} />,
  [HELP_TYPE.ENABLE]: <TelpText {...HELP_PARMAS[HELP_TYPE.ENABLE]} />,
};
