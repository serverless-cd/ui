export default {
  'ui.notifiy.remindType.needless': '不 @ 任何人',
  'ui.notifiy.remindType.owner': '所有人',
  'ui.notifiy.remindType.appoint': '指定用户',
  'ui.notifiy.webhook.tip': '“webhook地址”为必填项。',
  'ui.notifiy.webhook.correct.tip': '请输入正确的webhook地址',
  'ui.notifiy.enable.label': '钉钉机器人通知配置',
  'ui.notifiy.webhook.label': 'webhook地址',
  'ui.notifiy.webhook.placeholder': '钉钉机器人 Webhook 地址',
  'ui.notifiy.secret.label': '加签秘钥',
  'ui.notifiy.secret.label.tips':
    '钉钉自定义机器人必须开启安全设置，若未使用加签，无需填写加签秘钥',
  'ui.notifiy.secret.placeholder': '钉钉机器人安全配置',
  'ui.notifiy.skipOnSuccess.label': '仅失败时通知',
  'ui.notifiy.messageContent.label': '自定义消息',
  'ui.notifiy.messageContent.placeholder': '您可以在此处填写消息信息',
  'ui.notifiy.remindType.label': '是否@指定用户',
  'ui.notifiy.remindType.placeholder': '请选择提醒方式',
  'ui.notifiy.atMobiles.label': '通过手机号@',
  'ui.notifiy.atMobiles.tips': '多个手机号之间以,分隔',
  'ui.notifiy.atMobiles.placeholder': '请填写被@人的手机号,例如135xxxxxxxx',
  'ui.notifiy.atUserIds.label': '通过用户名@',
  'ui.notifiy.atUserIds.tips': '多个用户之间以,分隔',
  'ui.notifiy.atUserIds.placeholder': '请填写被@人的用户名,例如mydingding',
  'ui.notifiy.help.webhook.text': '获取钉钉机器人Webhook的方法可以参考',
  'ui.notifiy.help.webhook.link.label': '钉钉自定义机器人接入文档',
  'ui.notifiy.help.secret.text': '为保障自定义机器人安全，推荐您配置该选项，具体内容可以参考',
  'ui.notifiy.help.secret.link.label': '钉钉自定义机器人安全设置文档',
  'ui.notifiy.help.messageContent.text': `支持通过变量进行定义消息，包括:应用名<span class="code-text">{{ .appName }}</span>，环境名<span class="code-text">{{ .envName }}</span>，部署版本<span class="code-text">{{ .versionId }}</span>，当前执行任务名<span class="code-text">{{ .taskName }}</span>，当前执行任务详情<span class="code-text">{{ .currentTask }}</span>，任务执行是否成功<span class="code-text">{{ .success }}</span> ，任务失败信息<span class="code-text">{{ .error }}</span> 。
</br>*例如:应用“<span class="code-text">{{ .appName }}</span>”在<span class="code-text">{{ .envName }}</span>中执行结果为<span class="code-text">{{ .success }}</span>，当前任务详情为<span class="code-text">{{ .currentTask }}</span>，失败信息为<span class="code-text">{{ .error }}</span>`,
  'ui.notifiy.help.atMobiles.text':
    '如果需要@多个用户,可以用英文逗号“,”进行分割,例如:135xxxxxxxx,132xxxxxxxx',
  'ui.notifiy.help.atUserIds.text':
    '如果需要@多个用户,可以用英文逗号“,”进行分割,例如:dfounderliu, mydingding',
  'ui.notifiy.help.enable.text':
    '需要在此处开通并配置钉钉机器人后，流水线各个流程中的钉钉机器人通知才会生效。',
  'ui.notifiy.help.message.text': '自定义消息是必填项',
};
