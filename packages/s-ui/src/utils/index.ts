export const tryfun = async (fn: Function, ...args: any[]) => {
  try {
    return await fn(...args);
  } catch (ex) {}
};

export { default as tranformSchema, generateKey } from './tranformSchema';
