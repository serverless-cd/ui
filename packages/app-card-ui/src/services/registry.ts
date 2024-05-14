import axios from 'axios';
import { get } from 'lodash';
const lang = (window as any)?.ALIYUN_CONSOLE_CONFIG?.LANG === 'zh' ? 'zh' : 'en';


/**
 * 获取某个模版信息接口 V3
 * @param projectName
 * @param lang
 * @returns
 */
export const getAppV3 = async (projectName) => {
  try {
    const result = await axios({
      method: 'get',
      url: `https://api.devsapp.cn/v3/console/project/${projectName}?lang=${lang}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const Response = get(result, 'data.body', {});

    return {
      ...Response,
      version: {
        ...get(Response, 'version', {}),
        name: get(Response, 'package.name'),
        templateName: get(Response, 'version.name'),
      },
      package: {
        ...get(Response, 'package', {}),
        package: get(Response, 'package.name'),
        title: Response.name,
      },
    };
  } catch (e) {
    return {};
  }
};
