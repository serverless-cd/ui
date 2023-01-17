export default {
  'ui.notifiy.remindType.needless': 'not @ anyone',
  'ui.notifiy.remindType.owner': 'everyone',
  'ui.notifiy.remindType.appoint': 'designated user',
  'ui.notifiy.webhook.tip': '"webhook address" is required.',
  'ui.notifiy.webhook.correct.tip': 'Please enter the correct webhook address',
  'ui.notifiy.enable.label': 'DingTalk robot notification configuration',
  'ui.notifiy.webhook.label': 'webhook address',
  'ui.notifiy.webhook.placeholder': 'DingTalk robot webhook address',
  'ui.notifiy.secret.label': 'Signing key',
  'ui.notifiy.secret.label.tips':
    '’DingTalk‘s custom robot must have security settings turned on. If signing is not used, there is no need to fill in the signing key',
  'ui.notifiy.secret.placeholder': 'DingTalk robot safety configuration',
  'ui.notifiy.skipOnSuccess.label': 'Notify only on failure',
  'ui.notifiy.messageContent.label': 'custom message',
  'ui.notifiy.messageContent.placeholder': 'You can fill in the message information here',
  'ui.notifiy.remindType.label': 'Whether @specified user',
  'ui.notifiy.remindType.placeholder': 'Please choose reminder method',
  'ui.notifiy.atMobiles.label': 'By phone number@',
  'ui.notifiy.atMobiles.tips': 'Separate multiple phone numbers with ,',
  'ui.notifiy.atMobiles.placeholder':
    'Please fill in the mobile phone number of the person being @, for example 135xxxxxxxx',
  'ui.notifiy.atUserIds.label': 'via username@',
  'ui.notifiy.atUserIds.tips': 'Multiple users are separated by ,',
  'ui.notifiy.atUserIds.placeholder':
    'Please fill in the username of the person being @, such as mydingding',

  'ui.notifiy.help.webhook.text':
    'For the method of obtaining the DingTalk robot webhook, please refer to',
  'ui.notifiy.help.webhook.link.label': 'DingTalk custom robot access document',
  'ui.notifiy.help.secret.text':
    'In order to ensure the security of custom robots, it is recommended that you configure this option. For details, please refer to',
  'ui.notifiy.help.secret.link.label': 'DingTalk custom robot security settings document',
  'ui.notifiy.help.messageContent.text': `Supports defining messages through variables, including: application name {{ .appName }}, environment name {{ .envName }}, deployment version {{ .versionId }}, current execution task name {{ .taskName }}, current execution task Details {{ .currentTask }}, whether the task execution is successful {{ .success }}, task failure information {{ .error }}.
</br>*For example: the execution result of the application "{{ .appName }}" in {{ .envName }} is {{ .success }}, the current task details are {{ .currentTask }}, and the failure information is {{ .error }}`,
  'ui.notifiy.help.atMobiles.text':
    'If you need @multiple users, you can use English comma "," to split, for example: 135xxxxxxxx, 132xxxxxxxx',
  'ui.notifiy.help.atUserIds.text':
    'If you need @multiple users, you can use English comma "," to split, for example: dfounderliu, mydingding',
};
