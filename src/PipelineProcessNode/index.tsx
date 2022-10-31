import React, { FC, useEffect } from 'react';
import ReactFlow, {
  Background,
  MarkerType,
  Position,
  Edge,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { INode, PipelineProcessNodeProps, STATUS_COLOR, NodeStatus } from './types';
import Icon from './Icon';
import './index.less';

const getData = (nodes: INode[]) => {
  const newNodes = [];
  const newEdges = [];
  let gap = 0;
  let lastNode = {} as INode;
  for (const index in nodes) {
    const node = nodes[index];
    // node
    if (index !== '0') {
      gap += lastNode.className === 'circle' ? 110 : 200;
    }
    const nodeObj: INode = {
      id: index,
      data: {
        label: (
          <div className={`custom-node-container`}>
            {node.status && <Icon type={node.status} />}
            <div className="node_label"> {node.label}</div>
          </div>
        ),
      },
      position: { x: gap, y: node.className === 'circle' ? -10 : 0 },
      draggable: false,
      connectable: false,
      className: `status-${node.status}`,
      style: {
        borderTop: `2px solid ${STATUS_COLOR[node.status] || STATUS_COLOR.pending}`,
      },
      ...node,
      selectable: node.status !== NodeStatus.PENDING,
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
    lastNode = nodeObj;
  }
  console.log('newNodes', newNodes);
  console.log('newEdges', newEdges);
  return { newNodes, newEdges };
};

const PipelineProcessNode: FC<PipelineProcessNodeProps> = (props) => {
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
      className="serverless-cd-pipeline-process-container"
      nodesDraggable={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      minZoom={1}
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

export default PipelineProcessNode;
