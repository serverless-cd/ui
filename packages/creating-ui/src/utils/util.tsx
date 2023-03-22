export const onTaskOrderContrast = (waitTask, pendingTask) => {
  const found = waitTask || { index: -1 };
  const pendingFound = pendingTask || { index: -1 };
  const isOrderTask = found['index'] < pendingFound['index'];
  return isOrderTask;
};
