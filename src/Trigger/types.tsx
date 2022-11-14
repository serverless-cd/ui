export interface MatchTypeProps {
  triggerChecked: boolean;
  labelKey: string;
  triggerValues: object;
  onChange?: Function;
  key?: string;
}

export interface MatchTypeValuesProps {
  triggerTypeChecked: boolean;
  matchRuleList: Array<any>;
  triggerType: string;
  onChange?: Function;
}

export interface TriggerTypeProps {
  labelKey: string;
  value?: object | any;
  onChange: Function;
  setValue: Function;
  key?: string;
}

export interface TriggersProps {
  value?: object;
  onChange: Function;
}
