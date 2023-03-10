import { isEmpty } from 'lodash';

export const tryfun = async (fn: Function, ...args: any[]) => {
  try {
    return await fn(...args);
  } catch (ex) {}
};

export { default as tranformSchema, generateKey } from './tranformSchema';

export function deepCopy(obj: any) {
  let result: any = obj.constructor === Array ? [] : {};
  if (typeof obj === 'object') {
    for (var i in obj) {
      const val = obj[i];
      if (typeof val === 'object' && isEmpty(val)) {
        continue;
      }
      result[i] = typeof val === 'object' ? deepCopy(val) : val;
    }
  } else {
    result = obj;
  }
  return result;
}
