export interface MatchTypeProps {
  triggerChecked: boolean;
  labelKey: string;
  triggerType: string;
  triggerValues: object;
  onChange?: Function;
  key?: string;
  disabled?: boolean;
  field: any;
}

export interface MatchTypeValuesProps {
  triggerTypeChecked: boolean;
  matchRuleList: Array<any>;
  triggerType: string;
  matchTypeKey: string;
  onChange?: Function;
  disabled?: boolean;
}

export interface TriggerTypeProps {
  labelKey: string;
  value?: object | any;
  onChange: Function;
  setValue: Function;
  key?: string;
  disabled?: boolean;
  field: any;
}

export interface TriggersProps {
  ref: any;
  value?: object;
  onChange: Function;
  mode?: string;
  disabled?: boolean;
  branchList?: Array<any>;
  loading?: boolean;
  isRefresh?: boolean;
  onRefresh?: Function;
}

export interface StrictModeProps {
  value?: object | any;
  onChange?: Function;
  initValue?: object | any;
  disabled?: boolean;
  branchList?: Array<any>;
  loading?: boolean;
  isRefresh?: boolean;
  onRefresh?: Function;
  ref?: any;
}

export const PR = 'pull_request';
export const PUSH = 'push';
