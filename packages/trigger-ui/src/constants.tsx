import { i18n } from './utils';

export enum STRICT_TYPE {
  PUSH = 'push',
  TAG = 'tag',
  PUSH_REQUEST = 'pull_request',
}

export const STRICT_MATCH_LABEL = {
  [STRICT_TYPE.PUSH]: i18n('ui.strict.on.push.label'),
  [STRICT_TYPE.TAG]: i18n('ui.strict.on.tag.label'),
  [STRICT_TYPE.PUSH_REQUEST]: i18n('ui.strict.on.pr.label'),
};

export const STRICT_MATCH_HELP = {
  [STRICT_TYPE.PUSH]: i18n('ui.strict.on.push.help'),
  [STRICT_TYPE.TAG]: i18n('ui.strict.on.tag.help'),
  [STRICT_TYPE.PUSH_REQUEST]: i18n('ui.strict.on.pr.help'),
};

export const STRICT_TRIGGER_TYPES = [
  {
    value: STRICT_TYPE.PUSH,
    label: STRICT_MATCH_LABEL[STRICT_TYPE.PUSH],
    // help: STRICT_MATCH_HELP[STRICT_TYPE.PUSH],
    help: '',
  },
  {
    value: STRICT_TYPE.TAG,
    label: STRICT_MATCH_LABEL[STRICT_TYPE.TAG],
    help: STRICT_MATCH_HELP[STRICT_TYPE.TAG],
  },
  {
    value: STRICT_TYPE.PUSH_REQUEST,
    label: STRICT_MATCH_LABEL[STRICT_TYPE.PUSH_REQUEST],
    help: STRICT_MATCH_HELP[STRICT_TYPE.PUSH_REQUEST],
  },
];

export const MatchRuleDataSource = [
  {
    label: i18n('ui.trigger.match.rule.type.prefix'),
    value: 'prefix',
  },
  {
    label: i18n('ui.trigger.match.rule.type.precise'),
    value: 'precise',
  },
  {
    label: i18n('ui.trigger.match.rule.type.include'),
    value: 'include',
  },
  {
    label: i18n('ui.trigger.match.rule.type.exclude'),
    value: 'exclude',
  },
];

export enum TriggerType {
  PUSH = 'push',
  PR = 'pull_request',
}

export enum MatchType {
  BRANCHES = 'branches',
  TAGS = 'tags',
}

enum MatchValueType {
  PREFIX = 'prefix',
  PRECISE = 'precise',
  INCLUDE = 'include',
  EXCLUDE = 'exclude',
}

export const TriggerTypes = ['push', 'pull_request'];

export const ActivityTypes = [
  {
    value: 'opened',
    label: 'opened',
  },
  {
    value: 'reopened',
    label: 'reopened',
  },
  {
    value: 'closed',
    label: 'closed',
  },
  {
    value: 'merged',
    label: 'merged',
  },
];

export const TriggerTypeCheckedLabel = {
  [TriggerType.PUSH]: i18n('ui.trigger.type.push'),
  [TriggerType.PR]: i18n('ui.trigger.type.pr'),
};

export const MatchTypes = ['branches', 'tags'];

export const MatchTypeCheckedLabel = {
  [MatchType.BRANCHES]: i18n('ui.trigger.match.type.branches'),
  [MatchType.TAGS]: i18n('ui.trigger.match.type.tag'),
};

export const branchValuePlaceholder = {
  [MatchType.BRANCHES]: {
    [MatchValueType.PREFIX]: i18n('ui.trigger.match.branch.prefix.value'),
    [MatchValueType.PRECISE]: i18n('ui.trigger.match.branch.precise.value'),
    [MatchValueType.INCLUDE]: i18n('ui.trigger.match.branch.include.value'),
    [MatchValueType.EXCLUDE]: i18n('ui.trigger.match.branch.exclude.value'),
  },
  [MatchType.TAGS]: {
    [MatchValueType.PREFIX]: i18n('ui.trigger.match.tag.prefix.value'),
    [MatchValueType.PRECISE]: i18n('ui.trigger.match.tag.precise.value'),
    [MatchValueType.INCLUDE]: i18n('ui.trigger.match.tag.include.value'),
    [MatchValueType.EXCLUDE]: i18n('ui.trigger.match.tag.exclude.value'),
  },
};
