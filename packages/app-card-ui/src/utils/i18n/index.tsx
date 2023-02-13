import en from './en';
import zh from './zh';
import ja from './ja';
import Cookies from 'js-cookie';

const obj = { en, zh, ja };
const lang = () => {
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
  return obj[language] || obj.en;
};

const i18n = lang();

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
