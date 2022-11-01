import React, { FC, useEffect } from 'react';
import ReactFlow, {
  Background,
  MarkerType,
  Position,
  Edge,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import './index.less';

export interface IPipelineInitNode {
  label: string;
  selected?: boolean;
  selectable?: boolean;
  [key: string]: any;
}
export interface IPipelineInitNodeProps {
  nodes: IPipelineInitNode[];
  onClick?: (node: IPipelineInitNode) => void;
}

const getData = (nodes: IPipelineInitNode[]) => {
  const newNodes = [];
  const newEdges = [];
  let gap = 0;
  let lastNode = {} as IPipelineInitNode;
  for (const index in nodes) {
    const node = nodes[index];
    // node
    if (index !== '0') {
      gap +=
        lastNode.className === 'circle'
          ? 110
          : typeof lastNode.style?.width === 'number'
          ? lastNode.style?.width + 50
          : 200;
    }
    const nodeObj: IPipelineInitNode = {
      id: index,
      data: {
        label: node.label,
      },
      position: { x: gap, y: node.className === 'circle' ? -10 : 0 },
      draggable: false,
      connectable: false,
      ...node,
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
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };
    newEdges.push(edgeObj);
    lastNode = nodeObj;
  }
  console.log('newNodes', newNodes);
  console.log('newEdges', newEdges);
  return { newNodes, newEdges };
};

export const PipelineInitNode: FC<IPipelineInitNodeProps> = (props) => {
  const { nodes: originNodes, onClick } = props;
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  useEffect(() => {
    console.log('originNodes', originNodes);
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
