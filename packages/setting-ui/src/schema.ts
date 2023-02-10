import { fetchOss } from './services';
import { REGION } from './constants';

export default {
  type: 'object',
  properties: {
    [REGION]: {
      type: 'string',
      required: true,
      title: 'Region',
      'x-decorator': 'FormItem',
      enum: [
        {
          label: '杭州',
          value: 'cn-hangzhou',
        },
        {
          label: '成都',
          value: 'cn-chengdu',
        },
      ],
      'x-component': 'Select',
      'x-component-props': {
        placeholder: 'Select',
      },
    },
    bb: {
      type: 'string',
      required: true,
      title: 'BB',
      'x-decorator': 'FormItem',
      'x-component': 'AsyncSelect',
      'x-component-props': {
        fetchData: fetchOss,
        dependencies: [REGION],
      },
      'x-reactions': {
        dependencies: [`.${REGION}`],
        fulfill: {
          schema: {
            [`x-component-props.${REGION}`]: '{{$deps[0]}}',
          },
        },
      },
    },
    cc: {
      type: 'string',
      required: true,
      title: 'CC',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      pattern: '^[a-zA-Z0-9-_]{1,128}$',
    },
  },
};
