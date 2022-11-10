export const MatchRuleDataSource = [
  {
    label: '前缀匹配',
    value: 'prefix',
  },
  {
    label: '精准匹配',
    value: 'precise',
  },
  {
    label: '正则匹配',
    value: 'include',
  },
  {
    label: '精确排除',
    value: 'exclude',
  },
];

enum TriggerType {
  PUSH = 'push',
  PR = 'pr',
}

enum MatchType {
  BRANCHES = 'branches',
  TAGS = 'tags',
}

enum MatchValueType {
  PREFIX = 'prefix',
  PRECISE = 'precise',
  INCLUDE = 'include',
  EXCLUDE = 'exclude',
}

export const TriggerTypes = ['push', 'pr'];

export const TriggerTypeCheckedLabel = {
  [TriggerType.PUSH]: 'Push 事件 （包含本地推送、 分支合并、PR合并）',
  [TriggerType.PR]: 'Pull Request 事件',
};

export const MatchTypes = ['branches', 'tags'];

export const MatchTypeCheckedLabel = {
  [MatchType.BRANCHES]: '分支匹配',
  [MatchType.TAGS]: 'Tag 匹配',
};

export const branchValuePlaceholder = {
  [MatchType.BRANCHES]: {
    [MatchValueType.PREFIX]: '请填写分支前缀，不填默认监听所有分支',
    [MatchValueType.PRECISE]: '请填写完整分支名称',
    [MatchValueType.INCLUDE]: '请填写正则表达式',
    [MatchValueType.EXCLUDE]: '请填写完整分支名称',
  },
  [MatchType.TAGS]: {
    [MatchValueType.PREFIX]: '请填写Tag前缀，不填默认监听所有Tag',
    [MatchValueType.PRECISE]: '请填写完整Tag名称',
    [MatchValueType.INCLUDE]: '请填写正则表达式',
    [MatchValueType.EXCLUDE]: '请填写完整Tag名称',
  },
};
