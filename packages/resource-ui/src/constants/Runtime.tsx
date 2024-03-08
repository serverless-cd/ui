import React from 'react';
import Runtime from '../components/Runtime';
import { i18n } from '../utils';
import F, { W } from './index';

export const customRuntime = [
  {
    label: i18n('linux.label'),
    children: [
      {
        label: <Runtime customRuntime runtime={'debian'} />,
        value: 'debian',
      },
      {
        label: <Runtime customRuntime runtime={'debian10'} />,
        value: 'debian10',
      },
    ],
  },
  {
    label: i18n('nodejs.label'),
    children: W.NODEJS.map((runtime) => {
      return {
        label: <Runtime customRuntime runtime={runtime} />,
        value: runtime,
      };
    }),
  },
  {
    label: i18n('java.label'),
    children: W.JAVA.map((runtime) => {
      return {
        label: <Runtime customRuntime runtime={runtime} />,
        value: runtime,
      };
    }),
  },
  {
    label: i18n('python.label'),
    children: W.PYTHON.map((runtime) => {
      return {
        label: <Runtime customRuntime runtime={runtime} />,
        value: runtime,
      };
    }),
  },
  {
    label: i18n('php.label'),
    children: [...W.PHP, ...W.PHP_EXT].map((runtime) => {
      return {
        label: <Runtime customRuntime runtime={runtime} />,
        value: runtime,
      };
    }),
  },
  {
    label: i18n('go.label'),
    children: W.GO.map((runtime) => {
      return {
        label: <Runtime customRuntime runtime={runtime} />,
        value: runtime,
      };
    }),
  },
  {
    label: i18n('dotnet.label'),
    children: W.DOT_NET.map((runtime) => {
      return {
        label: <Runtime customRuntime runtime={runtime} />,
        value: runtime,
      };
    }),
  },
];

export const sourceRuntime = [
  {
    label: i18n('function.runtime.latest.label'),
    children: F.LATEST_RUNTIME.map((runtime) => {
      return {
        label: <Runtime runtime={runtime} />,
        value: runtime,
      };
    }),
  },
  {
    label: i18n('function.runtime.other.label'),
    children: F.OTHER_RUNTIMES.map((runtime) => {
      return {
        label: <Runtime runtime={runtime} />,
        value: runtime,
      };
    }),
  },
];
