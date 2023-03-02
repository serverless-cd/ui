export enum IApiType {
  fc = 'fc',
  fcweb = 'fcweb',
}
export type IApiTypeVal = `${IApiType}`;

export interface IAppDataSouce {
  // 项目名称
  package: string;
  // 项目描述
  description?: string;
  // 项目logo
  logo?: string;
  // 项目标题
  title?: string;
  // 项目分类
  tags?: string[];
  // 1代表官方，否则为社区
  user?: number;
  // 项目下载量
  download?: number;
  // 项目预览地址
  demo?: string;
}

export type IAppCardProps = {
  dataSouce: IAppDataSouce;
  // 项目类型：fc or fcweb
  apiType?: IApiTypeVal;
  // 一行显示几个
  column?: number;
  fetchReadme?: () => Promise<string>;
  onCreate?: (data: IAppDataSouce) => void;
};
