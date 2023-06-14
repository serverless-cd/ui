import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { isEmpty, noop, first, get, join, split, filter } from 'lodash';
import { Form, Input, Select, Field, Radio } from '@alicloud/console-components';
import { FORM_CUSTOM_MIDDLE_LABEL_LEFT } from './types';
import { customRuntime, sourceRuntime } from './constants/Runtime';
import Specification from './components/Specification';
import './index.less';
import yaml from 'js-yaml';
import { i18n } from './utils';
import { W } from './constants/index';

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
    codeUri
  } = values;

  const isCustom = shellType === 'custom';
  const cmd = split(command, ' ');
  const runtimeConfig = runtimeFormat(runtime, region);
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
            runtime: isCustom ? runtimeConfig.runtime : runtime,
            environmentVariables: isCustom ? runtimeConfig.environmentVariables : undefined,
            layers: isCustom ? runtimeConfig.layers : undefined,
            handler: !isCustom && handler ? handler : undefined,
            memorySize: memorySize,
            cpu: cpuCore,
            timeout: 60,
            codeUri: codeUri || './',
            diskSize: diskSize,
            caPort: isCustom && command ? caPort : undefined,
            customRuntimeConfig: isCustom && command ? { command: [cmd[0]], args: filter(cmd, (_, i) => i !== 0) } : undefined,
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

const runtimeFormat = (runtime, regionId) => {
  try {
    const {
      publicLayer,
      publicLayerPath,
      extraPublicLayer,
      demoCodePublicLayer,
      customRuntimeConfig,
      extraEnvs = {},
    } = W.LAYERS[runtime];

    let out = {
      runtime: 'custom'
    } as any;
    if (runtime.indexOf('debian10') !== -1) {
      out['runtime'] = 'custom.debian10'
    }

    if (publicLayer) {
      const layers = [`acs:fc:${regionId}:official:layers${publicLayer}`];
      if (extraPublicLayer) {
        layers.push(`acs:fc:${regionId}:official:layers${extraPublicLayer}`);
      }
      out = {
        ...out,
        layers,
        environmentVariables: { PATH: `${publicLayerPath}${W.PATH}`, ...extraEnvs },
      };
    }

    if (!publicLayer && publicLayerPath) {
      out['environmentVariables'] = { PATH: `${publicLayerPath}${W.PATH}`, ...extraEnvs };
    }

    const envs = out.environmentVariables || {};
    const layers = out.layers || [];

    if (demoCodePublicLayer) {
      layers.push(`acs:fc:${regionId}:official:layers${demoCodePublicLayer}`);
    }

    if (layers.length > 0) {
      out['layers'] = layers;
    }

    if (runtime?.startsWith('node')) {
      envs['NODE_PATH'] = '/opt/nodejs/node_modules';
    } else if (runtime?.startsWith('python') || runtime === 'debian10') {
      envs['PYTHONPATH'] = W.PYTHONPATH;
    }

    const envsOut = {
      ...envs,
      LD_LIBRARY_PATH:
        '/code:/code/lib:/usr/local/lib:/opt/lib:/opt/php8.1/lib:/opt/php8.0/lib:/opt/php7.2/lib',
    };

    if (!envsOut['JAVA_HOME']) {
      if (runtime === 'java17') {
        envsOut['JAVA_HOME'] = '/opt/java17';
      } else if (runtime === 'java11') {
        envsOut['JAVA_HOME'] = '/opt/java11';
      } else if (runtime === 'java8') {
        envsOut['JAVA_HOME'] = '/usr/lib/jvm/java-8-openjdk-amd64';
      }
    }

    out = {
      ...out,
      environmentVariables: envsOut,
      customRuntimeConfig,
    };
    return out;

  } catch (error) { }
}

const ResourceUI = (props: IProps, ref) => {
  const { onChange = noop, regionList, value } = props;
  const [dataSource, setDataSource] = useState([]);
  const field = Field.useField({
    onChange: () => {
      onChange(getValues());
    },
  });
  const { init, getValue, getValues, validate, reset, setValue } = field;

  useImperativeHandle(ref, () => ({
    validate,
  }));

  useEffect(() => {
    reset(['runtime']);
    setDataSource(getValue('shellType') === 'custom' ? customRuntime : sourceRuntime);
  }, [getValue('shellType')]);


  useEffect(() => {
    if (getValue('shellType') !== 'custom') return;
    const runtimeConfig = runtimeFormat(getValue('runtime'), getValue('region'));
    if (runtimeConfig) {
      const { customRuntimeConfig } = runtimeConfig;
      if (!isEmpty(customRuntimeConfig)) {
        const { args, command } = customRuntimeConfig;
        const cmd = join([...command, ...args], ' ');
        if (cmd) {
          setValue('command', cmd);
          onChange(getValues());
        }
      }
    }
  }, [getValue('runtime'), getValue('region')]);


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
              {...init('caPort', { initValue: 9000 })}
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
      <Form.Item label="执行构建命令路径" extra={<div className='mt-4 color-gray'>此处可以指定构建命令的执行目录，只需填写自己的代码的相对目录即可，例如在当前文件夹：./</div>}>
        <Input
          {...init('codeUri', { initValue: './' })}
          className="full-width"
        />
      </Form.Item>
    </Form>
  );
};

export default forwardRef(ResourceUI);
