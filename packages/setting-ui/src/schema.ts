export default {
  type: 'object',
  properties: {
    aa: {
      type: 'string',
      required: true,
      title: 'AA',
      'x-decorator': 'FormItem',
      enum: [
        {
          label: '111',
          value: '111',
        },
        {
          label: '222',
          value: '222',
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
      'x-component': 'Input',
      pattern: '^[a-zA-Z0-9-_]{1,128}$',
    },
  },
};
