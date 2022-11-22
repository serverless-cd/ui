import { FC } from 'react';
import './index.less';
export interface IPipelineInitNode {
  label: string | Element;
  selected?: boolean;
  selectable?: boolean;
  [key: string]: any;
}
export interface IPipelineInitNodeProps {
  nodes: IPipelineInitNode[];
  onClick?: (node: IPipelineInitNode) => void;
}
export declare const PipelineInitNode: FC<IPipelineInitNodeProps>;
