export type Props = {
  dataSource: Request[];
  onError?: (error: any) => void;
  onComplete?: (value: any) => void;
  onCountdownComplete?: () => void;
  showRetry?: boolean;
  countdown?: number;
  retryType?: string;
  help?: string | HTMLElement;
};

export type Request = {
  title: string;
  key: string;
  runStatus?: status;
  errorMsg?: string;
  successMsg?: string;
  runningMsg?: string;
  tasks?: Request[];
  run?: (content: any) => void;
};

type status = 'wait' | 'finish';
