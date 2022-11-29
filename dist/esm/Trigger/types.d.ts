export interface MatchTypeProps {
  triggerChecked: boolean;
  labelKey: string;
  triggerType: string;
  triggerValues: object;
  onChange?: Function;
  key?: string;
  disabled?: boolean;
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
}
export interface TriggersProps {
  value?: object;
  onChange: Function;
  mode?: string;
  disabled?: boolean;
  branchList?: Array<any>;
  loading?: boolean;
}
export interface StrictModeProps {
  triggerValues: object;
  value?: object | any;
  onChange: Function;
  disabled?: boolean;
  branchList?: Array<any>;
  loading?: boolean;
}
export declare const PR = 'pull_request';
export declare const PUSH = 'push';
