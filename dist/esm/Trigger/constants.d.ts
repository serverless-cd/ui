export declare const MatchRuleDataSource: {
  label: any;
  value: string;
}[];
export declare enum TriggerType {
  PUSH = 'push',
  PR = 'pull_request',
}
export declare enum MatchType {
  BRANCHES = 'branches',
  TAGS = 'tags',
}
export declare const TriggerTypes: string[];
export declare const ActivityTypes: {
  value: string;
  label: string;
}[];
export declare const TriggerTypeCheckedLabel: {
  push: any;
  pull_request: any;
};
export declare const MatchTypes: string[];
export declare const MatchTypeCheckedLabel: {
  branches: any;
  tags: any;
};
export declare const branchValuePlaceholder: {
  branches: {
    prefix: any;
    precise: any;
    include: any;
    exclude: any;
  };
  tags: {
    prefix: any;
    precise: any;
    include: any;
    exclude: any;
  };
};
