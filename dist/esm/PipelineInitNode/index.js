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
import './index.less';

var getData = function getData(nodes) {
  var newNodes = [];
  var newEdges = [];
  var gap = 0;
  var lastNode = {};

  for (var index in nodes) {
    var _node = nodes[index]; // node

    if (index !== '0') {
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
    }

    var nodeObj = _objectSpread(
      {
        id: index,
        data: {
          label: _node.label,
        },
        position: {
          x: gap,
          y: _node.className === 'circle' ? -10 : 0,
        },
        draggable: false,
        connectable: false,
        className: ''.concat(_node.enable ? 'enable' : ''),
      },
      _node,
    );

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

    newNodes.push(nodeObj); // edge

    var edgeObj = {
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

  return {
    newNodes: newNodes,
    newEdges: newEdges,
  };
};

export var PipelineInitNode = function PipelineInitNode(props) {
  var originNodes = props.nodes,
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
      var _getData = getData(originNodes),
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
      className: 'serverless-cd-pipeline-init-container',
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
