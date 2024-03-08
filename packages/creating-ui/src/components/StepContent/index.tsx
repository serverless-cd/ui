import React from 'react';
import { map } from 'lodash';
import { Icon } from '@alicloud/console-components';
import { Request } from '../../constants';
import '../../index.less';

type Props = {
  tasks: Request[];
  isSuspend?: boolean;
  currentTask: Request;
  onRetry: () => void;
  onResume: () => void;
  showRetry: boolean;
  isChild?: boolean;
  isExecutePendingTask: boolean;
  resumeText?: string;
};

const StepContent = (props: Props) => {
  const {
    tasks = [],
    currentTask = {} as any,
    isSuspend,
    onRetry,
    onResume,
    showRetry,
    isChild = false,
    isExecutePendingTask = false,
    resumeText,
  } = props;

  const className = isChild ? 'mt-4' : '';

  const currentTaskStatusRender = (task) => {
    const statusRender = {
      pending: (
        <div className={className}>
          {!isExecutePendingTask ? task.title : task.runningMsg || task.title}
          {!isExecutePendingTask && (
            <span className="ml-8 cursor-pointer color-primary" onClick={onResume}>
              {resumeText || '立即执行'}
            </span>
          )}
        </div>
      ),
      wait: <div className={className}>{task.runningMsg || task.title}</div>,
    };
    return statusRender[task.runStatus];
  };

  return (
    <>
      {map(tasks, (task) => {
        if (task.runStatus === 'finish')
          return (
            <div className={isChild ? `color-success` : className}>
              {task.successMsg || task.title}
            </div>
          );
        if (currentTask.key === task.key) {
          return (
            <>
              {isSuspend ? (
                <div className={className}>
                  <span className="color-error">{task.errorMsg || task.title}</span>
                  {showRetry && (
                    <Icon
                      className="ml-8 cursor-pointer"
                      type="refresh"
                      size="small"
                      onClick={onRetry}
                    />
                  )}
                </div>
              ) : (
                currentTaskStatusRender(currentTask)
              )}
            </>
          );
        }
        return <div className={className}>{task.title}</div>;
      })}
    </>
  );
};

export default StepContent;
