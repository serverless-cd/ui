import React, { FC, useEffect } from 'react';
import ReactFlow, {
  Background,
  MarkerType,
  Position,
  Edge,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import {
  IPipelineProcessNode,
  IPipelineProcessNodeProps,
  IPipelineProcessNodeStatusColor,
  IPipelineProcessNodeStatus,
} from './types';
import Icon from './Icon';
import './index.less';

export * from './types';

const getData = (nodes: IPipelineProcessNode[], direction: 'horizontal' | 'vertical') => {
  const positionStart = direction === 'horizontal' ? Position.Left : Position.Top;
  const positionEnd = direction === 'horizontal' ? Position.Right : Position.Bottom;

  const newNodes = [];
  const newEdges = [];
  let gap = 0;
  let lastNode = {} as IPipelineProcessNode;
  for (const index in nodes) {
    const node = nodes[index];
    // node
    if (index !== '0') {
      if (direction === 'horizontal') {
        gap +=
          lastNode.className === 'circle'
            ? 110
            : typeof lastNode.style?.width === 'number'
            ? lastNode.style?.width + 50
            : 200;
      } else {
        gap +=
          lastNode.className === 'circle'
            ? 25
            : typeof lastNode.style?.width === 'number'
            ? lastNode.style?.height + 12
            : 50;
      }
    }
    const nodeObj: IPipelineProcessNode = {
      id: index,
      data: {
        label: (
          <div className={`custom-node-container`}>
            {node.status && <Icon type={node.status} />}
            <div className="node_label"> {node.label}</div>
          </div>
        ),
      },
      position:
        direction === 'horizontal'
          ? { x: gap, y: node.className === 'circle' ? -10 : 0 }
          : { y: gap, x: node.className === 'circle' ? -10 : 0 },
      draggable: false,
      connectable: false,
      className: `status-${node.status}`,
      style: {
        borderTop: `2px solid ${
          IPipelineProcessNodeStatusColor[node.status] || IPipelineProcessNodeStatusColor.pending
        }`,
      },
      ...node,
      selectable: node.status !== IPipelineProcessNodeStatus.PENDING,
    };
    if (index === '0') {
      nodeObj.type = 'input';
      nodeObj.sourcePosition = positionEnd;
    } else if (index === String(nodes.length - 1)) {
      nodeObj.type = 'output';
      nodeObj.targetPosition = positionStart;
    } else {
      nodeObj.sourcePosition = positionEnd;
      nodeObj.targetPosition = positionStart;
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
    lastNode = nodeObj;
  }
  return { newNodes, newEdges };
};

export const PipelineProcessNode: FC<IPipelineProcessNodeProps> = (props) => {
  const { nodes: originNodes, direction = 'horizontal', onClick } = props;
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  useEffect(() => {
    const { newNodes, newEdges } = getData(originNodes, direction);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [originNodes]);
  return (
    <ReactFlow
      className="serverless-cd-pipeline-process-container"
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
