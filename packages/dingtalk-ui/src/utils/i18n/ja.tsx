export default {
  'ui.notifiy.remindType.needless': '@誰でもない',
  'ui.notifiy.remindType.owner': 'みんな',
  'ui.notifiy.remindType.appoint': '指定ユーザー',
  'ui.notifiy.webhook.tip': '「webhookアドレス」は必須です。',
  'ui.notifiy.webhook.correct.tip': '正しい Webhook アドレスを入力してください',
  'ui.notifiy.enable.label': 'DingTalk ロボット通知の構成',
  'ui.notifiy.webhook.label': 'Webhook アドレス',
  'ui.notifiy.webhook.placeholder': 'DingTalk ロボットの Webhook アドレス',
  'ui.notifiy.secret.label': '署名鍵',
  'ui.notifiy.secret.label.tips':
    'DingTalk のカスタム ロボットは、セキュリティ設定がオンになっている必要があります。署名を使用しない場合は、署名キーを入力する必要はありません。',
  'ui.notifiy.secret.placeholder': 'DingTalk ロボットの安全構成',
  'ui.notifiy.skipOnSuccess.label': '失敗時のみ通知',
  'ui.notifiy.messageContent.label': 'カスタムメッセージ',
  'ui.notifiy.messageContent.placeholder': 'ここにメッセージ情報を入力できます',
  'ui.notifiy.remindType.label': '@指定したユーザーかどうか',
  'ui.notifiy.remindType.placeholder': 'リマインダー方法を選択してください',
  'ui.notifiy.atMobiles.label': '電話番号@で',
  'ui.notifiy.atMobiles.tips': '複数の電話番号は , で区切ります',
  'ui.notifiy.atMobiles.placeholder':
    '135xxxxxxxxのように@のついている方の携帯電話番号をご記入ください',
  'ui.notifiy.atUserIds.label': 'ユーザー名@経由',
  'ui.notifiy.atUserIds.tips': '複数のユーザーは , で区切られます',
  'ui.notifiy.atUserIds.placeholder':
    'mydingding など、@ が付いている人のユーザー名を入力してください',

  'ui.notifiy.help.webhook.text':
    'DingTalk ロボットの Webhook の取得方法については、こちらを参照してください。',
  'ui.notifiy.help.webhook.link.label': 'DingTalk カスタム ロボット アクセス ドキュメント',
  'ui.notifiy.help.secret.text':
    'カスタム ロボットのセキュリティを確保するために、このオプションを構成することをお勧めします。詳細については、 を参照してください。',
  'ui.notifiy.help.secret.link.label': 'DingTalk カスタム ロボット セキュリティ設定ドキュメント',
  'ui.notifiy.help.messageContent.text': `アプリケーション名 {{.appName}}、環境名 {{.envName}}、デプロイメント バージョン {{.versionId}}、現在の実行タスク名 {{.taskName}}、現在の実行タスクの詳細など、変数によるメッセージの定義をサポートします。 {{.currentTask}}、タスクの実行が成功したかどうか {{.success}}、タスクの失敗情報 {{.error}}。
</br>*例: {{.envName}} 内のアプリケーション「{{.appName}}」の実行結果は {{.success }}、現在のタスクの詳細は {{.currentTask}}、障害情報は {{ .error }} です`,
  'ui.notifiy.help.atMobiles.text':
    '@複数のユーザーが必要な場合は、英語のコンマ「,」を使用して分割できます。例: 135xxxxxxxx, 132xxxxxxxx',
  'ui.notifiy.help.atUserIds.text':
    '@複数のユーザーが必要な場合は、英語のカンマ「,」を使用して分割できます。例: dfounderliu, mydingding',
};
