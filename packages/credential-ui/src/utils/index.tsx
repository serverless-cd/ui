import Cookies from 'js-cookie';
import { get } from 'lodash';


export function getLanguage() {
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
}


export const noop = async () => { }