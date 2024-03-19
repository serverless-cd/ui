import { parseReadme } from "../../src";
import { readmeStr } from "./mocks";

test.only("parseReadme 测试", () => {
  const res = parseReadme(readmeStr);
  console.log(res);
  expect(res).toEqual({
    service: [
      {
        label: "函数计算 FC",
        value: "函数计算 FC",
        url: "https://fcnext.console.aliyun.com",
        product: "fc",
        name: "函数计算 FC",
        description: "需要创建函数处理核心业务逻辑",
      },
      {
        label: "对象存储 OSS",
        value: "对象存储 OSS",
        url: "https://oss.console.aliyun.com",
        product: "oss",
        name: "对象存储 OSS",
        description: "为什么需要该服务",
      },
      {
        label: "日志服务 SLS",
        value: "日志服务 SLS",
        url: "https://sls.console.aliyun.com",
        product: "sls",
        name: "日志服务 SLS",
        description: "为什么需要该服务",
      },
      {
        label: "文件存储 NAS",
        value: "文件存储 NAS",
        url: "https://nasnext.console.aliyun.com",
        product: "nas",
        name: "文件存储 NAS",
        description: "为什么需要该服务",
      },
    ],
    auth: [
      {
        service: "函数计算",
        name: "AliyunFCFullAccess",
        description: "需要创建函数处理核心业务逻辑",
      },
      {
        service: "硬盘挂载",
        name: "AliyunNASFullAccess",
        description: "为什么需要该权限",
      },
      {
        service: "VPC",
        name: "AliyunVPCFullAccess",
        description: "为什么需要该权限",
      },
      {
        service: "其它",
        name: "AliyunECSFullAccess",
        description: "为什么需要该权限",
      },
    ],
    testEvent: [],
    appdetail:
      "当前应用仅支持 PNG 图片的压缩，压缩效果如下：\n" +
      "\n" +
      "![](http://image.editor.devsapp.cn/evBw7lh8ktv6xDBzSSzvjr1ykchAF9hG41gf1ek1sk8tr4355A/srZyhix55GBkGzC4CShk.png)",
    usedetail:
      "部署当前应用之后，可以通过返回的地址进行测试，也可以通过api进行调用。\n" +
      "\n" +
      "# 返回的地址进行测试\n" +
      "\n" +
      "只需要通过选择文件（需要选择 PNG 格式的图片），点击图片压缩即可看到压缩结果：\n" +
      "\n" +
      "![](http://image.editor.devsapp.cn/evBw7lh8ktv6xDBzSSzvjr1ykchAF9hG41gf1ek1sk8tr4355A/Ce6jtsiyvDsgAZjDFAr5.png)\n" +
      "\n" +
      "# 通过api进行调用\n" +
      "\n" +
      "地址：`http://你的域名/compress`\n" +
      "\n" +
      "参数：\n" +
      "```\n" +
      "  Headers:\n" +
      "     Content-type: application/json\n" +
      "  Body:\n" +
      "     image: 图片Base64后的字符串(base64后最大不可以超过5M)\n" +
      "     min_quality: 质量区间，默认65\n" +
      "     max_quality: 质量区间，默认80\n" +
      "     speed: 压缩速度（默认3，最高10）\n" +
      "```\n" +
      "\n" +
      "案例：\n" +
      "```\n" +
      "import requests\n" +
      "import base64\n" +
      "def getResult(imagePath):\n" +
      "    with open(imagePath, 'rb') as f:\n" +
      "        data = f.read()\n" +
      "    image = str(base64.b64encode(data), encoding='utf-8')\n" +
      `    data = json.dumps({"image":'data:image/png;base64,'+image, "min_quality":"65", "max_quality":"80", "speed":"3"})\n` +
      '    txt = requests.post("http://localhost:7291/compress", data=data,\n' +
      "                        headers={'Content-Type': 'application/json'})\n" +
      '    return txt.content.decode("utf-8")\n' +
      'print(getResult("./test.png"))\n' +
      "```",
    remark: "当前应用目前只支持标准的 PNG 格式图片进行压缩。",
    disclaimers:
      "本项目采用了 [pngquant](https://pngquant.org/)作为技术实现方案，以开源形式进行组件共享，具体的使用所需遵循的协议，请参考 pngquant 项目。",
    codeUrl: "https://github.com/xsahxl/apptest",
    previewUrl: "https://github.com/xsahxl/apptest",
  });
});
