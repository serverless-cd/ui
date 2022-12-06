function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

import React, { useEffect } from 'react';
import ReactFlow, {
  Background,
  MarkerType,
  Position,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { IPipelineProcessNodeStatusColor, IPipelineProcessNodeStatus } from './types';
import Icon from './Icon';
import './index.less';
export * from './types';

var getData = function getData(nodes, direction) {
  var positionStart = direction === 'horizontal' ? Position.Left : Position.Top;
  var positionEnd = direction === 'horizontal' ? Position.Right : Position.Bottom;
  var newNodes = [];
  var newEdges = [];
  var gap = 0;
  var lastNode = {};

  for (var index in nodes) {
    var node = nodes[index]; // node

    if (index !== '0') {
      if (direction === 'horizontal') {
        var _lastNode$style, _lastNode$style2;

        gap +=
          lastNode.className === 'circle'
            ? 110
            : typeof ((_lastNode$style = lastNode.style) === null || _lastNode$style === void 0
                ? void 0
                : _lastNode$style.width) === 'number'
            ? ((_lastNode$style2 = lastNode.style) === null || _lastNode$style2 === void 0
                ? void 0
                : _lastNode$style2.width) + 50
            : 200;
      } else {
        var _lastNode$style3, _lastNode$style4;

        gap +=
          lastNode.className === 'circle'
            ? 25
            : typeof ((_lastNode$style3 = lastNode.style) === null || _lastNode$style3 === void 0
                ? void 0
                : _lastNode$style3.width) === 'number'
            ? ((_lastNode$style4 = lastNode.style) === null || _lastNode$style4 === void 0
                ? void 0
                : _lastNode$style4.height) + 12
            : 50;
      }
    }

    var nodeObj = _objectSpread(
      _objectSpread(
        {
          id: index,
          data: {
            label: /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'custom-node-container',
              },
              node.status &&
                /*#__PURE__*/ React.createElement(Icon, {
                  type: node.status,
                }),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'node_label',
                },
                ' ',
                node.label,
              ),
            ),
          },
          position:
            direction === 'horizontal'
              ? {
                  x: gap,
                  y: node.className === 'circle' ? -10 : 0,
                }
              : {
                  y: gap,
                  x: node.className === 'circle' ? -10 : 0,
                },
          draggable: false,
          connectable: false,
          className: 'status-'.concat(node.status),
          style: {
            borderTop: '2px solid '.concat(
              IPipelineProcessNodeStatusColor[node.status] ||
                IPipelineProcessNodeStatusColor.pending,
            ),
          },
        },
        node,
      ),
      {},
      {
        selectable: node.status !== IPipelineProcessNodeStatus.PENDING,
      },
    );

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

    newNodes.push(nodeObj); // edge

    var edgeObj = {
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

  return {
    newNodes: newNodes,
    newEdges: newEdges,
  };
};

export var PipelineProcessNode = function PipelineProcessNode(props) {
  var originNodes = props.nodes,
    _props$direction = props.direction,
    direction = _props$direction === void 0 ? 'horizontal' : _props$direction,
    onClick = props.onClick;

  var _useNodesState = useNodesState([]),
    _useNodesState2 = _slicedToArray(_useNodesState, 2),
    nodes = _useNodesState2[0],
    setNodes = _useNodesState2[1];

  var _useEdgesState = useEdgesState([]),
    _useEdgesState2 = _slicedToArray(_useEdgesState, 2),
    edges = _useEdgesState2[0],
    setEdges = _useEdgesState2[1];

  useEffect(
    function () {
      var _getData = getData(originNodes, direction),
        newNodes = _getData.newNodes,
        newEdges = _getData.newEdges;

      setNodes(newNodes);
      setEdges(newEdges);
    },
    [originNodes],
  );
  return /*#__PURE__*/ React.createElement(
    ReactFlow,
    {
      className: 'serverless-cd-pipeline-process-container',
      nodesDraggable: false,
      zoomOnScroll: false,
      zoomOnPinch: false,
      zoomOnDoubleClick: false,
      maxZoom: 1,
      panOnScroll: false,
      nodes: nodes,
      edges: edges,
      onNodeClick: function onNodeClick(e, node) {
        return onClick && onClick(node);
      },
      fitView: true,
    },
    /*#__PURE__*/ React.createElement(Background, {
      color: '#aaa',
      gap: 16,
    }),
  );
};
