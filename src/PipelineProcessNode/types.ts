import { Node } from 'react-flow-renderer';

export enum NodeStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  WARN = 'warn',
  FAILURE = 'failure',
  RUNNING = 'running',
}

export interface INode extends Node {
  key?: string;
  label?: string;
  status?: `${NodeStatus}`;
}
export interface PipelineProcessNodeProps {
  nodes: INode[];
  refreshIndex?: number;
  onClick?: (node: INode) => void;
}
