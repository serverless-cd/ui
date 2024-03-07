import { find, startsWith, endsWith, trim } from "lodash";
import { SERVICES } from "./constant";

const trimTag = (source: string, tagName: string, attribute?: string) => {
  const startTag = `<${tagName}${attribute || ""}>`;
  const endTag = `</${tagName}>`;
  const start = source.indexOf(startTag);
  const end = source.indexOf(endTag);
  if (start === -1 || end === -1) {
    console.debug(`没有找到 tag: ${tagName}`);
    return "";
  }

  return source.slice(start + startTag.length, end).trim();
};

const trimPlaintextTag = (source: any) => {
  const src = trim(source.replace(/```plaintext|```/g, ''));
  return src
};

const parseReadme = (readmeStr: string) => {
  if (!readmeStr) {
    return {};
  }
  const data: any = {};

  // 所需要的前置服务
  const serviceStr = trimTag(readmeStr, "service");
  if (serviceStr) {
    const d = serviceStr
      .split("\n")
      .map((item) => {
        const str = item.trim();
        // 必须保证 | ** | ** |  才允许处理
        if (startsWith(str, "| ") && endsWith(str, " |")) {
          const [, name, description] = str.split("|");
          const findObj = find(SERVICES, (obj) => obj.value === name.trim());
          return {
            ...findObj,
            name: name.trim(),
            description: description.trim(),
          };
        }
        return;
      })
      .filter((item) => item);
    d.shift();
    d.shift();
    data.service = d;
  }

  // 当前应用所需权限
  const authStr = trimTag(readmeStr, "auth");
  if (authStr) {
    const d = authStr
      .split("\n")
      .map((item) => {
        const str = item.trim();
        if (startsWith(str, "| ") && endsWith(str, " |")) {
          const [, service, name, description] = str.split("|");
          return {
            service: service.trim(),
            name: name.trim(),
            description: description.trim(),
          };
        }
        return;
      })
      .filter((item) => item);
    d.shift();
    d.shift();
    data.auth = d;
  }

  // 帮助文档
  const appdetailStr = trimTag(readmeStr, "appdetail", ' id="flushContent"');
  if (appdetailStr) {
    data.appdetail = appdetailStr;
  }

  // 测试函数
  const testEventStr = trimTag(readmeStr, "div", ` name="test-case" hidden`);
  if (testEventStr) {
    let strData = '';
    testEventStr.split("\n").map((item) => {
      const str = item.trim();
      strData += `${str}\n`
    })
    const trimStr = trimPlaintextTag(strData);
    try {
      const obj = JSON.parse(trimStr);
      data.testEvent = [obj];
    } catch (error) {
      data.testEvent = [trimStr];
    }
  }


  // 使用文档/后续操作
  const usedetailStr = trimTag(readmeStr, "usedetail", ' id="flushContent"');
  if (usedetailStr) {
    data.usedetail = usedetailStr;
  }

  // 项目注意事项
  const remarkStr = trimTag(readmeStr, "remark");
  if (remarkStr) {
    data.remark = remarkStr.replace("您还需要注意：   \n", "");
  }

  // 项目免责信息
  const disclaimersStr = trimTag(readmeStr, "disclaimers");
  if (disclaimersStr) {
    data.disclaimers = disclaimersStr.replace("免责声明：   \n", "");
  }

  // 代码仓库地址
  const codeUrlStr = trimTag(readmeStr, "codeUrl");
  if (codeUrlStr) {
    const codeUrlMatch = codeUrlStr.match(/- \[:smiley_cat: 代码\]\((.+)\)/);
    if (codeUrlMatch && codeUrlMatch[1]) {
      data.codeUrl = codeUrlMatch[1];
    }
  }
  // 项目预览地址
  const previewUrlStr = trimTag(readmeStr, "preview");
  if (previewUrlStr) {
    const previewUrlMatch = previewUrlStr.match(/- \[:eyes: 预览\]\((.+)\)/);
    if (previewUrlMatch && previewUrlMatch[1]) {
      data.previewUrl = previewUrlMatch[1];
    }
  }
  console.debug(`parse readme: ${JSON.stringify(data)}`);
  return data;
};

export default parseReadme;
