import React, { FC } from 'react';
import ReactFlow, { Background, MarkerType, Position, Node } from 'reactflow/dist/umd';

const edges = [
  {
    id: '0',
    source: '0',
    target: '1',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: '1',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: '2',
    source: '2',
    target: '3',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: '3',
    source: '3',
    target: '4',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: '4',
    source: '4',
    target: '5',
    type: 'smoothstep',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: '5',
    source: '5',
    target: '6',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: '6',
    source: '6',
    target: '7',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

interface PipelineInitNodeProps {
  nodes: Node[];
}

const PipelineInitNode: FC<PipelineInitNodeProps> = ({ nodes }) => {
  const getNodes = (nodes) => {
    const newNodes = [];
    for (const index in nodes) {
      const node = nodes[index];
      const obj: Node = {
        id: index,
        data: {
          label: node.label,
        },
        position: { x: Number(index) * 200, y: 0 },
        draggable: false,
        connectable: false,
        ...node,
      };
      if (index === '0') {
        obj.type = 'input';
        obj.sourcePosition = Position.Right;
      } else if (index === String(nodes.length - 1)) {
        obj.type = 'output';
        obj.targetPosition = Position.Left;
      } else {
        obj.sourcePosition = Position.Right;
        obj.targetPosition = Position.Left;
      }
      newNodes.push(obj);
    }
    console.log(newNodes, 'newNodes');

    return newNodes;
  };
  return (
    <ReactFlow
      nodes={getNodes(nodes)}
      edges={edges}
      onNodeClick={(e, node) => {
        console.log('onNodeClick', node);
      }}
      fitView
    >
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default PipelineInitNode;
