import React, { useMemo } from 'react';
import { Step, Icon } from '@alicloud/console-components';
import { size, find, map, isEmpty, get } from 'lodash';
import StepContent from '../StepContent';
import { Request } from '../../constants';
import '../../index.less';

type Props = {
  stepList: Request[];
  isSuspend?: boolean;
  count?: number;
  onRetry: () => void;
  showRetry?: boolean;
};
const StepTask = (props: Props) => {
  const { stepList, isSuspend, count, onRetry, showRetry } = props;
  const { found, current, currentTask } = useMemo(() => {
    const found: any = find(stepList, { runStatus: 'wait' });
    const current = !isEmpty(found) ? found?.index : size(stepList);
    const currentTask = find(found?.tasks, { runStatus: 'wait' });
    return { current, currentTask, found };
  }, [stepList]);

  const itemRender = (index, status) => {
    switch (status) {
      case 'process':
        if (index === current && isSuspend)
          return <Icon size="small" type="error" className="mt-3" />;
        return <Icon size="small" type="loading" className="mt-3" />;
      case 'finish':
        return <Icon size="small" type="success" className="mt-3" />;
      default:
        return (
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5166"
            width="20"
            height="20"
            className="mt-5"
          >
            <path
              d="M512 917.381727c-223.886093 0-405.381727-181.495634-405.381727-405.381727S288.113907 106.618273 512 106.618273s405.381727 181.495634 405.381727 405.381727S735.886093 917.381727 512 917.381727zM528.21531 498.606968l0-278.482549-32.43062 0 0 291.834648-0.040932 0.040932 206.386534 206.386534 22.932292-22.932292L528.21531 498.606968z"
              p-id="5167"
              fill="#cccccc"
            ></path>
          </svg>
        );
    }
  };
  return (
    <div className="mt-16 application-container-step">
      <Step itemRender={itemRender} current={current} direction="ver" animation={false}>
        {map(stepList, (item: Request, index) => {
          const tasks = get(item, 'tasks', []);
          return (
            <Step.Item
              key={item.key}
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <StepContent
                    tasks={[item]}
                    currentTask={found}
                    isSuspend={isEmpty(tasks) ? isSuspend : false}
                    onRetry={onRetry}
                    showRetry={showRetry}
                  />
                  {count !== 0 && index === size(stepList) - 1 && current === size(stepList) && (
                    <>{count && <span className="color-error mr-8 ml-8">{`${count} s`}</span>}</>
                  )}
                </div>
              }
              content={
                <StepContent
                  tasks={tasks}
                  currentTask={currentTask}
                  isSuspend={isSuspend}
                  onRetry={onRetry}
                  showRetry={showRetry}
                />
              }
            />
          );
        })}
      </Step>
    </div>
  );
};
export default StepTask;
