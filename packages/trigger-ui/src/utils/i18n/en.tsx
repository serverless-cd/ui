export default {
  'ui.trigger.match.rule': 'matching rule',
  'ui.trigger.target.branch': 'Target branch',
  'ui.trigger.add': 'add',
  'ui.trigger.match.rule.type.prefix': 'Prefix matching',
  'ui.trigger.match.rule.type.precise': 'Precise matching',
  'ui.trigger.match.rule.type.include': 'regex match',
  'ui.trigger.match.rule.type.exclude': 'Precise exclusion',
  'ui.trigger.type.push': 'Push events (including local push, branch merge, PR merge)',
  'ui.trigger.type.pr': 'Pull Request event',
  'ui.trigger.match.type.branches': 'Matching of branches',
  'ui.trigger.match.type.tag': 'Tag matching',
  'ui.trigger.match.branch.prefix.value':
    'Enter the branch prefix. If this parameter is not specified, all branches are monitored by default',
  'ui.trigger.match.source.branch': 'Please fill in the source branch',
  'ui.trigger.match.branch.precise.value': 'Please complete the branch name',
  'ui.trigger.match.branch.include.value': 'Fill in the regular expression',
  'ui.trigger.match.branch.exclude.value': 'Please complete the branch name',
  'ui.trigger.match.tag.prefix.value':
    'Please fill in the Tag prefix, do not fill in the default listen for all tags',
  'ui.trigger.match.tag.precise.value': 'Please complete the Tag name',
  'ui.trigger.match.tag.include.value': 'Please fill in the regular expression',
  'ui.trigger.match.tag.exclude.value': 'Please complete the Tag name',
  'ui.trigger.activity.type': 'trigger type',
  'ui.trigger.source.branch': 'Source branch',
  'ui.notifiy.remindType.needless': 'Do not remind',
  'ui.notifiy.remindType.owner': 'everyone',
  'ui.notifiy.remindType.appoint': 'designated member',
  'ui.notifiy.webhook.tip': '"webhook address" is required.',
  'ui.notifiy.webhook.correct.tip': 'Please enter the correct webhook address',
  'ui.notifiy.enable.label': 'Turn on notifications',
  'ui.notifiy.webhook.label': 'webhook address',
  'ui.notifiy.webhook.placeholder': 'DingTalk robot notification URL',
  'ui.notifiy.secret.label': 'Signing key',
  'ui.notifiy.secret.label.tips':
    '’DingTalk‘s custom robot must have security settings turned on. If signing is not used, there is no need to fill in the signing key',
  'ui.notifiy.secret.placeholder':
    'If signing is enabled in DingTalk’s security settings, please fill in the signing key',
  'ui.notifiy.skipOnSuccess.label': 'Notify only on failure',
  'ui.notifiy.messageContent.label': 'custom content',
  'ui.notifiy.messageContent.placeholder': 'Fill in the custom message content',
  'ui.notifiy.remindType.label': 'reminder method',
  'ui.notifiy.remindType.placeholder': 'Please choose reminder method',
  'ui.notifiy.atMobiles.label': '@Phone number',
  'ui.notifiy.atMobiles.tips': 'Separate multiple phone numbers with ,',
  'ui.notifiy.atMobiles.placeholder':
    'Enter the mobile phone number of the member you want to @ (DingTalk mobile phone number)',
  'ui.notifiy.atUserIds.label': '@designated user',
  'ui.notifiy.atUserIds.tips': 'Multiple users are separated by ,',
  'ui.notifiy.atUserIds.placeholder': 'Enter the user you want to @',
  'ui.branch.verify.text': 'branch is required',
  'ui.trigger.activity.type.verify.text': 'Trigger type is required',
  'ui.strict.on.push.label': 'Push to the specified branch trigger',
  'ui.strict.on.tag.label': 'Tag / Release event',
  'ui.strict.on.pr.label': 'Merge / Pull Request event',
  'ui.strict.on.push.help':
    'When the code is pushed to the current branch, the pipeline is triggered',
  'ui.strict.on.tag.help':
    'This type of event is represented by Release in Github and Tag in Gitlab',
  'ui.strict.on.pr.help':
    'This type of event is represented by Pull Request in Github and Merge Request in Gitlab',
  'ui.strict.on.pr.type.label': 'Types of',
  'ui.strict.on.pr.branch.help': 'Promoting Pr/Mr to this branch will trigger the pipeline',
  'ui.strict.on.pr.source.help':
    'Only when Pr/Mr is raised to the target branch through this branch will the pipeline be triggered',
  'ui.strict.branch.list.null.help': 'Failed to get the branch list, please enter the branch name',
};
