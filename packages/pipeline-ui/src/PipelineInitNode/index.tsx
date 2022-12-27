import React, { FC, useEffect } from 'react';
import ReactFlow, {
  Background,
  MarkerType,
  Position,
  Edge,
  useNodesState,
  useEdgesState,
  Node,
} from 'react-flow-renderer';
import './index.less';

export interface IPipelineInitNode {
  label: React.ReactNode;
  selected?: boolean; // 蓝色边框表示配置中
  selectable?: boolean;
  // error: 红色边框表示配置有误
  // success: 绿色边框表示配置正确
  // wait: 灰色边框表示未配置
  status: 'wait' | 'success' | 'error';
  [key: string]: any;
}
export interface IPipelineInitNodeProps {
  nodes: IPipelineInitNode[];
  onClick?: (node: Node<any>) => void;
}

const getData = (nodes: IPipelineInitNode[]) => {
  const newNodes = [];
  const newEdges = [];
  let gap = 0;
  for (const index in nodes) {
    const node = nodes[index];
    // node
    if (index !== '0') {
      gap += index === '1' ? 140 : 160;
    }
    const nodeObj: IPipelineInitNode = {
      id: index,
      data: {
        label: node.label,
      },
      position: { x: gap, y: 0 },
      draggable: false,
      connectable: false,
      ...node,
      className: ['start', 'end'].includes(node.key) ? node.key : `status-${node.status || 'wait'}`,
    };
    if (index === '0') {
      nodeObj.type = 'input';
      nodeObj.sourcePosition = Position.Right;
    } else if (index === String(nodes.length - 1)) {
      nodeObj.type = 'output';
      nodeObj.targetPosition = Position.Left;
    } else {
      nodeObj.sourcePosition = Position.Right;
      nodeObj.targetPosition = Position.Left;
    }
    newNodes.push(nodeObj);
    // edge
    const edgeObj: Edge = {
      id: index,
      source: index,
      target: String(Number(index) + 1),
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };
    newEdges.push(edgeObj);
  }
  return { newNodes, newEdges };
};

export const PipelineInitNode: FC<IPipelineInitNodeProps> = (props) => {
  const { nodes: originNodes, onClick } = props;
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  useEffect(() => {
    const { newNodes, newEdges } = getData(originNodes);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [originNodes]);
  return (
    <ReactFlow
      className="serverless-cd-pipeline-init-container"
      nodesDraggable={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      maxZoom={1}
      panOnScroll={false}
      nodes={nodes}
      edges={edges}
      onNodeClick={(e, node) => onClick && onClick(node)}
      fitView
    >
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};
