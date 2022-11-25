import React, { FC } from 'react';
import { Node } from 'react-flow-renderer';
import './index.less';
export interface IPipelineInitNode {
  label: React.ReactNode;
  enable: boolean;
  selected?: boolean;
  selectable?: boolean;
  [key: string]: any;
}
export interface IPipelineInitNodeProps {
  nodes: IPipelineInitNode[];
  onClick?: (node: Node<any>) => void;
}
export declare const PipelineInitNode: FC<IPipelineInitNodeProps>;
