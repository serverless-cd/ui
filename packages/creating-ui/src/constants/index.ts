export type Props = {
  dataSource: Request[];
  runStatus?: status;
  onError?: (error: any) => void;
  onComplete?: (value: any) => void;
  onCountdownComplete?: () => void;
  showRetry?: boolean;
  countdown?: number;
  retryType?: string;
  resumeText?: string;
  help?: string | HTMLElement;
};

export type Request = {
  title: string | any;
  key: string;
  runStatus?: status;
  errorMsg?: string | any;
  successMsg?: string | any;
  runningMsg?: string | any;
  tasks?: Request[];
  run?: (content: any) => void;
};

type status = 'wait' | 'finish' | 'pending';
