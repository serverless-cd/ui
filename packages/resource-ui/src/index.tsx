import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { isEmpty, noop, first, get } from 'lodash';
import { Form, Input, Select, Field, Radio } from '@alicloud/console-components';
import { FORM_CUSTOM_MIDDLE_LABEL_LEFT } from './types';
import { customRuntime, sourceRuntime } from './constants/Runtime';
import Specification from './components/Specification';
import './index.less';
import yaml from 'js-yaml';
import { i18n } from './utils';
const RadioGroup = Radio.Group;
const NAME_REG = /^[a-zA-Z0-9-_]{1,128}$/;
const STARTS_WITH_REG = /^[a-zA-Z_]{1}.*$/;

type IProps = {
  value: any;
  onChange: Function;
  dataSource: any[];
  regionList: any[];
};

export const onToYamlString = (values) => {
  if (isEmpty(values)) return '';
  const {
    shellType,
    runtime,
    handler,
    memorySize,
    cpuCore,
    caPort,
    command,
    serviceName,
    functionName,
    region,
    diskSize,
  } = values;

  const isCustom = shellType === 'custom';
  const componentsJson = {
    edition: '1.0.0',
    name: 'my-framework-app',
    access: 'default',
    services: {
      framework: {
        component: 'fc',
        props: {
          region: region,
          service: {
            name: serviceName,
          },
          function: {
            name: functionName,
            description: 'Initialize',
            runtime: runtime,
            handler: !isCustom && handler ? handler : undefined,
            memorySize: memorySize,
            cpu: cpuCore,
            timeout: 60,
            codeUri: './',
            diskSize: diskSize,
            caPort: isCustom && command ? caPort : undefined,
            customRuntimeConfig: isCustom && command ? { command: [command] } : undefined,
          },
          triggers: isCustom
            ? [
                {
                  name: 'httpTrigger',
                  type: 'http',
                  config: {
                    authType: 'anonymous',
                    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
                  },
                },
              ]
            : undefined,
        },
      },
    },
  };
  try {
    const newJson = JSON.parse(JSON.stringify(componentsJson));
    return yaml.dump(newJson);
  } catch (error) {
    return '';
  }
};

const ResourceUI = (props: IProps, ref) => {
  const { onChange = noop, regionList, value } = props;
  const [dataSource, setDataSource] = useState([]);
  const field = Field.useField({
    onChange: () => {
      onChange(getValues());
    },
  });
  const { init, getValue, getValues, validate, reset } = field;

  useImperativeHandle(ref, () => ({
    validate,
  }));

  useEffect(() => {
    reset(['runtime']);
    setDataSource(getValue('shellType') === 'custom' ? customRuntime : sourceRuntime);
  }, [getValue('shellType')]);

  const nameValidator = (_, value, callback) => {
    if (value && NAME_REG.test(value) && STARTS_WITH_REG.test(value)) {
      callback();
    } else if (!value) {
      callback();
    } else {
      callback([new Error(i18n('service.name.rule.tips'))]);
    }
  };

  return (
    <Form {...FORM_CUSTOM_MIDDLE_LABEL_LEFT} field={field}>
      <Form.Item label="将该应用部署到" required>
        <Select
          {...init('component', { initValue: 'fc' })}
          dataSource={[{ label: '函数计算 FC', value: 'fc' }]}
          className="full-width"
        />
      </Form.Item>
      <Form.Item label="服务名称" required>
        <Input
          {...init('serviceName', {
            initValue: value['serviceName'],
            rules: [{ required: true, validator: nameValidator }],
          })}
          className="full-width"
          maxLength={128}
          minLength={1}
          showLimitHint
          placeholder="请输入服务名"
        />
      </Form.Item>
      <Form.Item label="函数名称" required>
        <Input
          {...init('functionName', {
            initValue: value['functionName'],
            rules: [{ required: true, validator: nameValidator }],
          })}
          className="full-width"
          maxLength={128}
          minLength={1}
          showLimitHint
          placeholder="请输入函数名"
        />
      </Form.Item>
      <Form.Item label="地域" required>
        <Select
          {...init('region', { initValue: get(first(regionList), 'value') })}
          dataSource={regionList}
          className="full-width"
        />
      </Form.Item>
      <Form.Item label="是否使用了框架" required>
        <RadioGroup {...init('shellType', { initValue: 'custom' })}>
          <Radio id="custom" value="custom" label="是" />
          <Radio id="origin" value="origin" label="否" />
        </RadioGroup>
      </Form.Item>
      <Form.Item label="编程语言/选型" required>
        <Select
          {...init('runtime', { rules: [{ required: true }] })}
          dataSource={dataSource}
          className="full-width"
        />
      </Form.Item>
      <Form.Item label="环境算力配置">
        <Specification field={field} initValue={{}} />
      </Form.Item>
      <Form.Item label="函数磁盘大小">
        <Select
          {...init('diskSize', { initValue: 512 })}
          dataSource={[
            { label: '512 MB', value: 512 },
            { label: '10240 MB', value: 10240 },
          ]}
          className="full-width"
        />
      </Form.Item>
      {getValue('shellType') === 'custom' && (
        <>
          <Form.Item label="启动命令/脚本">
            <Input
              {...init('command')}
              className="full-width"
              placeholder="启动您程序的命令。例如：python app.py 或 java -jar app.jar"
            />
          </Form.Item>
          <Form.Item label="端口配置">
            <Input
              {...init('caPort')}
              className="full-width"
              htmlType={'number'}
              placeholder="您的代码中所监听的端口"
            />
          </Form.Item>
        </>
      )}
      {getValue('shellType') === 'origin' && (
        <>
          <Form.Item label="函数入口">
            <Input {...init('handler')} className="full-width" />
          </Form.Item>
        </>
      )}
    </Form>
  );
};

export default forwardRef(ResourceUI);
