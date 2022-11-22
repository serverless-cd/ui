import en from './en';
import zh from './zh';
import ja from './ja';
import Cookies from 'js-cookie';
var obj = {
  en: en,
  zh: zh,
  ja: ja,
};

var lang = function lang() {
  var language = Cookies.get('aliyun_lang') || Cookies.get('inner_oneconsole_lang') || 'zh'; // 兼容取值 zh-TW 的case

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

var i18n = lang();

var handleI18n = function handleI18n(key, params) {
  if (!key) return '';

  if (Object.prototype.toString.call(params) === '[object Object]') {
    var str = i18n[key];
    return str.replace(/\{\{\{|\}\}\}|\{\{[^{^}]+\}\}|\{[^{^}]+\}/g, function (m, n) {
      if (m === '{{{') {
        return '{';
      }

      if (m === '}}}') {
        return '}';
      }

      var paramsKey = m.replace(/\{|\}/g, '');
      var value = params[paramsKey];
      if (value === undefined) value = n;
      return value;
    });
  } else {
    return i18n[key] || key;
  }
};

export default handleI18n;
