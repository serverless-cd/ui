import en from './en';
import zh from './zh';
import ja from './ja';
import Cookies from 'js-cookie';
import { get } from 'lodash';

const obj = { en, zh, ja };

export const lang = () => {
  let language = Cookies.get('aliyun_lang') || Cookies.get('inner_oneconsole_lang') || 'zh';
  // 兼容取值 zh-TW 的case
  if (language.startsWith('zh')) {
    language = 'zh';
  }
  if (language.startsWith('en')) {
    language = 'en';
  }
  if (language.startsWith('ja')) {
    language = 'ja';
  }
  const vscodeLanguage = get(window, 'SERVERLESS_DEVS_CONFIG.lang');
  if (vscodeLanguage) {
    language = vscodeLanguage;
  }
  return language;
};

const i18n = obj[lang()] || obj.en;

const handleI18n = (key, params?: any) => {
  if (!key) return '';
  if (Object.prototype.toString.call(params) === '[object Object]') {
    const str = i18n[key];
    return str.replace(/\{\{\{|\}\}\}|\{\{[^{^}]+\}\}|\{[^{^}]+\}/g, (m, n) => {
      if (m === '{{{') {
        return '{';
      }
      if (m === '}}}') {
        return '}';
      }
      const paramsKey = m.replace(/\{|\}/g, '');
      let value = params[paramsKey];
      if (value === undefined) value = n;
      return value;
    });
  } else {
    return i18n[key] || key;
  }
};

export default handleI18n;
