export const tryfun = async (fn: Function, ...args: any[]) => {
  try {
    return await fn(...args);
  } catch (ex) {}
};
