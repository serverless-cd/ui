import { Node } from 'react-flow-renderer';
export declare enum IPipelineProcessNodeStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILURE = 'failure',
  WARN = 'warn',
}
export declare enum IPipelineProcessNodeStatusColor {
  pending = '#999',
  running = '#479DFF',
  success = '#52C41A',
  failure = '#F5222D',
  warn = 'rgb(255, 164, 61)',
}
export interface IPipelineProcessNode {
  label: string | Element;
  status?: `${IPipelineProcessNodeStatus}`;
  selected?: boolean;
  selectable?: boolean;
  [key: string]: any;
}
export interface IPipelineProcessNodeProps {
  nodes: IPipelineProcessNode[];
  direction?: 'horizontal' | 'vertical';
  onClick?: (node: Node<any>) => void;
}
