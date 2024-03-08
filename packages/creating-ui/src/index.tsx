import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Message } from '@alicloud/console-components';
import StepTask from './components/StepTask';
import { Props, Request } from './constants/index';
import { onTaskOrderContrast } from './utils/util';
import { find, isEmpty, map, set, cloneDeep, noop } from 'lodash';

const CreatingUi = (props: Props, ref) => {
  const {
    dataSource = [],
    onError = noop,
    onComplete = noop,
    countdown = 0,
    onCountdownComplete = noop,
    onRetry: onBeforeRetry = noop,
    showRetry = true,
    retryType = 'current',
    help = '',
    resumeText,
  } = props;
  const [stepList, setStepList] = useState([]);
  const [isSuspend, setIsSuspend] = useState(false);
  const [isExecutePendingTask, setIsExecutePendingTask] = useState(false);
  const [taskContents, setTaskContents] = useState({});

  const [count, setCount] = useState(countdown);
  let intervalCount = useRef(count);
  let interval = useRef(null);

  useImperativeHandle(ref, () => ({
    onRetry,
    stepList,
  }));

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    onInit();
  }, [dataSource]);

  const save = async (values, params = {}, pendingExecuteStatus = false) => {
    const found = find(values, { runStatus: 'wait' });
    const pendingFound = find(values, { runStatus: 'pending' });
    const isOrderFound = onTaskOrderContrast(found, pendingFound);

    if (isOrderFound || (!isEmpty(found) && isEmpty(pendingFound))) {
      const task = find(found.tasks, { runStatus: 'wait' });
      const pendingTask = find(found.tasks, { runStatus: 'pending' });
      const isOrderTask = onTaskOrderContrast(task, pendingTask);
      if ((!isEmpty(task) && isOrderTask) || isEmpty(pendingTask)) {
        try {
          const content: any = await onRunTask(!isEmpty(task) ? task : found, params);
          setStepList([...values]);
          setTaskContents(content);
          await save([...values], content);
        } catch (content) {
          setIsSuspend(true);
          setTaskContents(content);
          onError && onError(content);
        }
      } else {
        if (!pendingExecuteStatus) return;
        try {
          const content: any = await onRunTask(pendingTask, params);
          setStepList([...values]);
          setTaskContents(content);
          await save([...values], content);
        } catch (content) {
          setTaskContents(content);
        }
        setIsExecutePendingTask(false);
      }
    } else if (!isEmpty(pendingFound)) {
      if (!pendingExecuteStatus) return;
      try {
        const content: any = await onRunTask(pendingFound, params);
        setStepList([...values]);
        setTaskContents(content);
        await save([...values], content);
      } catch (content) {
        setTaskContents(content);
      }
      setIsExecutePendingTask(false);
    } else {
      onComplete && onComplete(params);
      intervalCount.current && onCountdown();
    }
  };

  const onInit = () => {
    const newData = map(dataSource, (item: Request, index) => ({
      ...item,
      index,
      runStatus: item.runStatus || 'wait',
      tasks: initTasks(item.tasks),
    }));
    setStepList(newData);
    save(newData, {});
  };

  // 执行倒计时逻辑
  const onCountdown = () => {
    interval.current = setInterval(() => {
      if (intervalCount.current >= 1) {
        intervalCount.current = intervalCount.current - 1;
        setCount(intervalCount.current);
      } else {
        onCountdownComplete && onCountdownComplete();
        clearInterval(interval.current);
      }
    }, 1000);
  };

  // 重试事件
  const onRetry = () => {
    onBeforeRetry && onBeforeRetry();
    setIsSuspend(false);
    retryType === 'all' ? onInit() : save(stepList, taskContents);
  };

  const onRunTask = async (task, content) => {
    return new Promise(async (resolve, reject) => {
      const newContent = cloneDeep(content);
      try {
        if (task.run) {
          const result = await task?.run({ content: newContent });
          set(newContent, task.key, { result, success: true });
        }
        task.runStatus = 'finish';
        resolve(newContent);
      } catch (error) {
        set(newContent, task.key, { result: error, success: false });
        reject(newContent);
      }
    });
  };

  const initTasks = (value = []) => {
    if (isEmpty(value)) return [];
    return map(value, (item: Request, index) => ({
      ...item,
      runStatus: item.runStatus || 'wait',
      index,
    }));
  };

  // 继续执行事件
  const onResume = () => {
    setIsExecutePendingTask(true);
    save(stepList, taskContents, true);
  };

  return (
    <div className="application-container" style={{ width: 600 }}>
      <Message type="warning" className="mt-5">
        <>
          <div className="text-middle">当前阶段请不要刷新页面</div>
          {help}
        </>
      </Message>
      <StepTask
        stepList={stepList}
        isSuspend={isSuspend}
        count={count}
        onRetry={onRetry}
        onResume={onResume}
        resumeText={resumeText}
        isExecutePendingTask={isExecutePendingTask}
        showRetry={showRetry}
      />
    </div>
  );
};
export default forwardRef(CreatingUi);
