import {
  FormDrawer,
  FormItem,
  Input,
  Submit,
  Reset,
  FormButtonGroup,
  FormLayout,
} from '@formily/next';
import { createSchemaField } from '@formily/react';
import { Button } from '@alicloud/console-components';
import React from 'react';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});

const schema = {
  type: 'object',
  properties: {
    serviceName: {
      type: 'string',
      title: '服务名称',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
};

export default ({ handleAdd }: { handleAdd: (data: any) => Promise<any> }) => {
  const handleSubmit = async (values: any) => {
    const tmp = {
      component: 'devsapp/fc',
      props: {
        region: 'cn-hangzhou',
        service: {
          name: 'hello-world-service',
          description: 'hello world by serverless devs',
        },
        function: {
          name: 'hello-world-function',
          description: 'hello world by serverless devs',
          runtime: 'nodejs14',
          codeUri: './code',
          handler: 'index.handler',
          memorySize: 128,
          timeout: 60,
        },
        triggers: [
          {
            name: 'httpTrigger',
            type: 'http',
            config: {
              authType: 'anonymous',
              methods: ['GET'],
            },
          },
        ],
        customDomains: [
          {
            domainName: 'auto',
            protocol: 'HTTP',
            routeConfigs: [
              {
                path: '/*',
                methods: ['GET', 'POST'],
              },
            ],
          },
        ],
      },
    };
    return await handleAdd({ serviceName: values.serviceName, data: tmp });
  };
  return (
    <Button
      type="primary"
      text
      style={{ position: 'absolute', top: 12, right: 16, zIndex: 1 }}
      onClick={() => {
        FormDrawer('添加服务', (resolve) => {
          return (
            <FormLayout labelCol={6} wrapperCol={14}>
              <SchemaField schema={schema} />
              <FormDrawer.Footer>
                <FormButtonGroup align="right">
                  <Submit onSubmit={() => handleSubmit(resolve.values)}>Submit</Submit>
                  <Reset>Reset</Reset>
                </FormButtonGroup>
              </FormDrawer.Footer>
            </FormLayout>
          );
        }).open();
      }}
    >
      添加服务
    </Button>
  );
};
