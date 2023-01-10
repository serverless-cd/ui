import React, { useState, useEffect } from 'react';
import { Graph } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import CustomNode from './CustomNode/index';
import './index.css';

register({
  shape: 'custom-node',
  effect: ['color'],
  component: CustomNode,
});

let timer = null;

const IS_SAFARI = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

const IS_Mobile = navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
);

const commonAttrs = {
  line: {
    strokeDasharray: 2,
    strokeWidth: 2,
    targetMarker: {
      tagName: 'path',
    },
    stroke: {
      type: 'linearGradient',
      stops: [
        { offset: '0%', color: '#ccc' },
        { offset: '50%', color: '#999' },
        { offset: '100%', color: '#000' },
      ],
    },
    style: {
      animation: 'ant-line 60s infinite linear',
    },
  },
};

// 节点
const data = {
  nodes: [
    {
      id: 'middle1',
      x: 250,
      y: 50,
      shape: 'custom-node',
    },
    {
      id: 'middle2',
      x: 450,
      y: 150,
      shape: 'custom-node',
    },
    {
      id: 'middle3',
      x: 650,
      y: 250,
      shape: 'custom-node',
    },
    {
      id: 'middle4',
      x: 850,
      y: 350,
      shape: 'custom-node',
    },
    {
      id: 'middle5',
      x: 1050,
      y: 450,
      shape: 'custom-node',
    },
    {
      id: 'left1',
      x: 230,
      y: 250,
      shape: 'custom-node',
    },
    {
      id: 'left2',
      x: 500,
      y: 400,
      shape: 'custom-node',
    },
    {
      id: 'left3',
      x: 750,
      y: 500,
      shape: 'custom-node',
    },
    {
      id: 'right1',
      x: 750,
      y: 100,
      shape: 'custom-node',
    },
    {
      id: 'right2',
      x: 1050,
      y: 250,
      shape: 'custom-node',
    },
    {
      id: 'right3',
      x: 1200,
      y: 320,
      shape: 'custom-node',
    },
  ],
  // 边
  edges: [
    {
      source: { x: 360, y: 230 },
      target: { x: 360, y: 230 },
      vertices: [
        { x: 530, y: 140 },
        { x: 700, y: 230 },
        { x: 700, y: 160 },
        { x: 830, y: 90 },
        { x: 970, y: 170 },
        { x: 970, y: 360 },
        { x: 1300, y: 520 },
        { x: 1130, y: 610 },
        { x: 970, y: 530 },
        { x: 970, y: 590 },
        { x: 830, y: 660 },
        { x: 700, y: 595 },
        { x: 700, y: 400 },
      ],
      attrs: {
        line: {
          stroke: '#bbb',
          strokeDasharray: 5,
          targetMarker: {
            tagName: 'path',
          },
          strokeWidth: 1,
          strokeLinecap: 'round',
        },
      },
    },
    // m1->m2
    {
      source: { x: 380, y: 150 },
      target: { x: 470, y: 200 },
      connector: { name: 'smooth' },
      vertices: [{ x: 435, y: 160 }],
      attrs: {
        ...commonAttrs,
      },
    },
    // m2->m3
    {
      source: { x: 580, y: 250 },
      target: { x: 670, y: 300 },
      connector: { name: 'smooth' },
      vertices: [{ x: 635, y: 260 }],
      attrs: {
        ...commonAttrs,
      },
    },
    // m3->m4
    {
      source: { x: 780, y: 350 },
      target: { x: 870, y: 400 },
      connector: { name: 'smooth' },
      vertices: [{ x: 835, y: 360 }],
      attrs: {
        ...commonAttrs,
      },
    },
    // m4->m5
    {
      source: { x: 980, y: 450 },
      target: { x: 1070, y: 500 },
      connector: { name: 'smooth' },
      vertices: [{ x: 1035, y: 460 }],
      attrs: {
        ...commonAttrs,
      },
    },
    // m3->r1
    {
      source: { x: 770, y: 300 },
      target: { x: 820, y: 225 },
      connector: { name: 'smooth' },
      vertices: [{ x: 810, y: 270 }],
      attrs: {
        ...commonAttrs,
      },
    },
    // r1->m4
    {
      source: { x: 825, y: 230 },
      target: { x: 920, y: 370 },
      connector: { name: 'smooth' },
      vertices: [{ x: 860, y: 320 }],
      attrs: {
        ...commonAttrs,
      },
    },
    // m3->l3
    {
      source: { x: 730, y: 380 },
      target: { x: 800, y: 565 },
      connector: { name: 'smooth' },
      vertices: [{ x: 750, y: 480 }],
      attrs: {
        ...commonAttrs,
      },
    },
    // m4->l3
    {
      source: { x: 920, y: 480 },
      target: { x: 850, y: 565 },
      connector: { name: 'smooth' },
      vertices: [{ x: 880, y: 540 }],
      attrs: {
        ...commonAttrs,
      },
    },
  ],
};

const showMseArc = () => {
  const MseBox = document.getElementById('mse-arc-container');
  if (MseBox) {
    if (IS_SAFARI || IS_Mobile) {
      const ImgBox = document.createElement('img');
      ImgBox.src =
        '//img.alicdn.com/imgextra/i2/O1CN01mFrO8X1EYIZp0DMnv_!!6000000000363-2-tps-2880-1512.png';
      ImgBox.style.width = '100%';
      MseBox.appendChild(ImgBox);
    } else {
      const graph = new Graph({
        container: MseBox,
        height: 700,
        // scroller: true,
        interacting: false,
        grid: {
          size: 20,
          visible: true,
        },
        background: {
          color: '#e5f1fe',
        },
        mousewheel: false,
        autoResize: false,
        panning: { enabled: true, eventTypes: ['leftMouseDown'] },
      });
      graph.fromJSON(data);
    }
    timer && clearTimeout(timer);
  }else{
    timer = setTimeout(() => {
      showMseArc()
    }, 500);
  }
};
showMseArc();
