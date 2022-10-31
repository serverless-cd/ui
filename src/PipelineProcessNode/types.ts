import { Node } from 'react-flow-renderer';

export enum NodeStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILURE = 'failure',
  WARN = 'warn',
}

export enum STATUS_COLOR {
  pending = '#999',
  running = '#479DFF',
  success = '#52C41A',
  failure = '#F5222D',
  warn = 'rgb(255, 164, 61)',
}

export interface INode extends Node {
  key?: string;
  label?: string;
  status?: `${NodeStatus}`;
}
export interface PipelineProcessNodeProps {
  nodes: INode[];
  onClick?: (node: INode) => void;
}
