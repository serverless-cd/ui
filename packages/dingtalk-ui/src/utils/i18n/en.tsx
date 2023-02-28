export default {
  'ui.notifiy.remindType.needless': 'not @ anyone',
  'ui.notifiy.remindType.owner': 'everyone',
  'ui.notifiy.remindType.appoint': 'designated user',
  'ui.notifiy.webhook.tip': '"Webhook address" is required.',
  'ui.notifiy.webhook.correct.tip': 'Please enter the correct webhook address',
  'ui.notifiy.enable.label': 'DingTalk robot notification configuration',
  'ui.notifiy.webhook.label': 'Webhook address',
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
  'ui.notifiy.help.messageContent.text': `Supports defining messages through variables, including: application name <span class="code-text">{{ .appName }}</span>, environment name <span class="code-text">{{ .envName }} </span>, deployment version <span class="code-text">{{ .versionId }}</span>, currently executing task name <span class="code-text">{{ .taskName }}</span> span>, the current execution task details <span class="code-text">{{ .currentTask }}</span>, whether the task execution is successful <span class="code-text">{{ .success }}</span> span> , task failure message <span class="code-text">{{ .error }}</span> .
</br>*Example: Apply "<span class="code-text">{{ .appName }}</span>" in <span class="code-text">{{ .envName }}</span The execution result in > is <span class="code-text">{{ .success }}</span>, and the current task details are <span class="code-text">{{ .currentTask }}</span> , the failure message is <span class="code-text">{{ .error }}</span>`,
  'ui.notifiy.help.atMobiles.text':
    'If you need @multiple users, you can use English comma "," to split, for example: 135xxxxxxxx, 132xxxxxxxx',
  'ui.notifiy.help.atUserIds.text':
    'If you need @multiple users, you can use English comma "," to split, for example: dfounderliu, mydingding',
  'ui.notifiy.help.enable.text':
    'After the DingTalk robot needs to be activated and configured here, the DingTalk robot notifications in each process of the pipeline will take effect.',
  'ui.notifiy.help.message.text': 'A custom message is required',
};
