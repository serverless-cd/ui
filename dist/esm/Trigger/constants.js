var _TriggerTypeCheckedLa,
  _MatchTypeCheckedLabe,
  _MatchType$BRANCHES,
  _MatchType$TAGS,
  _branchValuePlacehold;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

import { i18n } from '../utils';
export var MatchRuleDataSource = [
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
export var TriggerType;

(function (TriggerType) {
  TriggerType['PUSH'] = 'push';
  TriggerType['PR'] = 'pr';
})(TriggerType || (TriggerType = {}));

export var MatchType;

(function (MatchType) {
  MatchType['BRANCHES'] = 'branches';
  MatchType['TAGS'] = 'tags';
})(MatchType || (MatchType = {}));

var MatchValueType;

(function (MatchValueType) {
  MatchValueType['PREFIX'] = 'prefix';
  MatchValueType['PRECISE'] = 'precise';
  MatchValueType['INCLUDE'] = 'include';
  MatchValueType['EXCLUDE'] = 'exclude';
})(MatchValueType || (MatchValueType = {}));

export var TriggerTypes = ['push', 'pr'];
export var TriggerTypeCheckedLabel =
  ((_TriggerTypeCheckedLa = {}),
  _defineProperty(_TriggerTypeCheckedLa, TriggerType.PUSH, i18n('ui.trigger.type.push')),
  _defineProperty(_TriggerTypeCheckedLa, TriggerType.PR, i18n('ui.trigger.type.pr')),
  _TriggerTypeCheckedLa);
export var MatchTypes = ['branches', 'tags'];
export var MatchTypeCheckedLabel =
  ((_MatchTypeCheckedLabe = {}),
  _defineProperty(
    _MatchTypeCheckedLabe,
    MatchType.BRANCHES,
    i18n('ui.trigger.match.type.branches'),
  ),
  _defineProperty(_MatchTypeCheckedLabe, MatchType.TAGS, i18n('ui.trigger.match.type.tag')),
  _MatchTypeCheckedLabe);
export var branchValuePlaceholder =
  ((_branchValuePlacehold = {}),
  _defineProperty(
    _branchValuePlacehold,
    MatchType.BRANCHES,
    ((_MatchType$BRANCHES = {}),
    _defineProperty(
      _MatchType$BRANCHES,
      MatchValueType.PREFIX,
      i18n('ui.trigger.match.branch.prefix.value'),
    ),
    _defineProperty(
      _MatchType$BRANCHES,
      MatchValueType.PRECISE,
      i18n('ui.trigger.match.branch.precise.value'),
    ),
    _defineProperty(
      _MatchType$BRANCHES,
      MatchValueType.INCLUDE,
      i18n('ui.trigger.match.branch.include.value'),
    ),
    _defineProperty(
      _MatchType$BRANCHES,
      MatchValueType.EXCLUDE,
      i18n('ui.trigger.match.branch.exclude.value'),
    ),
    _MatchType$BRANCHES),
  ),
  _defineProperty(
    _branchValuePlacehold,
    MatchType.TAGS,
    ((_MatchType$TAGS = {}),
    _defineProperty(
      _MatchType$TAGS,
      MatchValueType.PREFIX,
      i18n('ui.trigger.match.tag.prefix.value'),
    ),
    _defineProperty(
      _MatchType$TAGS,
      MatchValueType.PRECISE,
      i18n('ui.trigger.match.tag.precise.value'),
    ),
    _defineProperty(
      _MatchType$TAGS,
      MatchValueType.INCLUDE,
      i18n('ui.trigger.match.tag.include.value'),
    ),
    _defineProperty(
      _MatchType$TAGS,
      MatchValueType.EXCLUDE,
      i18n('ui.trigger.match.tag.exclude.value'),
    ),
    _MatchType$TAGS),
  ),
  _branchValuePlacehold);
