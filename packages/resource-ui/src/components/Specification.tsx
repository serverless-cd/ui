import React, { useMemo, useState, useEffect } from 'react';
import { Message, Form, Select, NumberPicker, Grid, Button } from '@alicloud/console-components';
import { divide, multiply } from '../utils/math';
import { i18n } from '../utils';
// import { isEmpty } from 'lodash';

const { Row, Col } = Grid;

const CPUCORE = 'cpu';
const MEMORYSPECIFICATIONS_UNIT = 'memorySpecifications_unit';
const MEMORY_SPECIFICATIONS = 'memorySpecifications';
const VALIDATION_RATIO = 'validation_ratio';

const MEMORY_SPECIFICATIONS_OPTIONS_MB = [128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768];
const MEMORY_SPECIFICATIONS_OPTIONS_GB = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32];

const CPU_SPECIFICATIONS_OPTIONS = [
  0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.5, 0.75, 1, 1.5, 2, 4, 6, 8, 12, 16,
];

const MEMORY_UNIT_TYPE = ['MB', 'GB'];

function isInvalidCpu(value) {
  return Number((value % 0.05).toFixed(2)) !== 0 && Number((value % 0.05).toFixed(2)) !== 0.05;
}
// cpu错误提示
function calculateProperCpuRange(memory, memoryUnitType) {
  let start;
  let end;

  if (memoryUnitType === 'GB') {
    start = divide(memory, 4);
    end = memory;
  } else {
    start = divide(memory, 4096);
    end = divide(memory, 1024);
  }

  start = multiply(Math.ceil(divide(start, 0.05)), 0.05);
  end = multiply(Math.floor(divide(end, 0.05)), 0.05);

  if (end > 16) {
    end = 16;
  }

  if (start < 0.05) {
    start = 0.05;
  }

  return i18n('function.instance_type.proper.cpu.range', {
    current: `${memory} ${memoryUnitType}`,
    value: `${start} vCPU ~ ${end} vCPU`,
  });
}
// 内存规格错误提示
function calculateProperMemoryRange(cpu, memoryUnitType) {
  let start;
  let end;

  start = multiply(cpu, 1024);
  end = multiply(cpu, 4096);

  start = multiply(Math.ceil(divide(start, 64)), 64);
  end = multiply(Math.floor(divide(end, 64)), 64);

  if (end > 32768) {
    end = 32768;
  }

  if (start < 128) {
    start = 128;
  }

  return i18n('function.instance_type.proper.memory.range', {
    current: cpu,
    value: `${start} MB ~ ${end} MB`,
    gbValue: `${divide(start, 1024)} GB ~ ${divide(end, 1024)} GB`,
  });
}

type IProps = {
  field: any;
  initValue?: object;
};

const Specification = ({ field, initValue }: IProps) => {
  const [memoryUnitType, setMemoryUnitType] = useState('MB');
  const [configCpuType, setConfigCpuType] = useState(true);
  const [lastChangedType, setLastChangedType] = useState('cpu');
  const [configMemoryType, setConfigMemoryType] = useState(true);
  //根据选择的内存单位类型返回数据源
  const memorySpecificationsDataSource = useMemo(() => {
    const type = {
      MB: MEMORY_SPECIFICATIONS_OPTIONS_MB,
      GB: MEMORY_SPECIFICATIONS_OPTIONS_GB,
    };
    return type[memoryUnitType];
  }, [memoryUnitType]);

  //CPU规格选取的数据
  const [cpuSpecificationsValue, setCpuSpecificationsValueInner] = useState(
    CPU_SPECIFICATIONS_OPTIONS[0],
  );

  //内存规格选取的数据
  const [memorySpecificationsValue, setMemorySpecificationsValueInner] = useState(
    memorySpecificationsDataSource[0],
  );

  useEffect(() => {
    // if (isEmpty(initValue)) return
    if (!initValue['cpuCore'] || !initValue['memorySize']) {
      field.setValue('cpuCore', cpuSpecificationsValue);
      field.setValue('memorySize', memorySpecificationsValue);
    } else {
      setMemoryUnitType('MB');
      onCpuChange(initValue['cpuCore']);
      setMemorySpecificationsValue(initValue['memorySize']);
    }
  }, [JSON.stringify(initValue)]);

  //计算CPU规格和内存规格配比是否合法
  useEffect(() => {
    field.reset([VALIDATION_RATIO]);
    if (cpuSpecificationsValue !== undefined && memorySpecificationsValue !== undefined) {
      const conversionMemoryValue =
        memoryUnitType === 'GB'
          ? memorySpecificationsValue
          : divide(memorySpecificationsValue, 1024);
      const proportion = divide(conversionMemoryValue, cpuSpecificationsValue);
      if (proportion < 1 || proportion > 4) {
        field.setError(VALIDATION_RATIO, i18n('function.cpu_memor.instance.not_match'));
      }
    }
  }, [cpuSpecificationsValue, memorySpecificationsValue]);

  //校验输入的CPU规格是否合法
  const cpuSpecificationsValidator = (_, value, callback) => {
    // const currentMemory = memorySpecificationsValue * (memoryUnitType === 'GB' ? 1024 : 1);
    if (isInvalidCpu(value)) {
      return callback([
        new Error(
          i18n('function.cpu_specifications.input.scope.patternMessage', {
            size: '0.05',
          }) as string,
        ),
      ]);
    } else {
      return callback();
    }
  };

  const setCpuSpecificationsValue = (v) => {
    setCpuSpecificationsValueInner(v);
    setLastChangedType('cpu');
  };

  //校验输入的内存规格规格是否合法
  const memorySpecificationsValidator = (_, value, callback) => {
    if (memoryUnitType === 'MB' && _.field !== 'cpuSpecifications_unit') {
      if (value % 64 !== 0) {
        return callback([
          new Error(
            i18n('function.memory_specifications.input.scope.patternMessage', {
              size: 64,
            }) as any,
          ),
        ]);
      }
    }

    if (memoryUnitType === 'GB' && _.field !== 'cpuSpecifications_unit') {
      if (multiply(value, 1024) % 64 !== 0) {
        return callback([
          new Error(
            i18n('function.memory_specifications.input.scope.patternMessage', {
              size: 64,
            }) as any,
          ),
        ]);
      }
    }
    return callback();
  };

  const setMemorySpecificationsValue = (v) => {
    setMemorySpecificationsValueInner(v);
    setLastChangedType('memory');
    field.setValue('memorySize', memoryUnitType === 'MB' ? v : multiply(v, 1024));
  };

  const onCpuChange = (v) => {
    setCpuSpecificationsValue(v);
    field.setValue('cpuCore', v);
  };

  return (
    <Form>
      <Form.Item>
        <Row>
          {/* cpu 规格 */}
          <Col span={9}>
            <Form.Item
              labelAlign="top"
              required
              requiredMessage={
                i18n('general.required', {
                  name: i18n('function.cpu_specifications.title'),
                }) as string
              }
              validator={cpuSpecificationsValidator}
            >
              <p className="color-light-black">{i18n('function.cpu_specifications.title')}</p>
              {configCpuType ? (
                <Select
                  className="full-width"
                  name={CPUCORE}
                  value={cpuSpecificationsValue}
                  placeholder={i18n('function.cpu_specifications.placeholder')}
                  onChange={onCpuChange}
                >
                  {CPU_SPECIFICATIONS_OPTIONS.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <NumberPicker
                  className="full-width"
                  name={CPUCORE}
                  value={cpuSpecificationsValue}
                  min={0.05}
                  max={16}
                  precision={2}
                  step={0.5}
                  onChange={onCpuChange}
                  placeholder={i18n('function.cpu_specifications.input.placeholder')}
                />
              )}
              <Button
                onClick={() => {
                  setConfigCpuType(!configCpuType);
                }}
                type="primary"
                text
                style={{ marginTop: 15 }}
              >
                <span className="noselect">
                  {configCpuType
                    ? i18n('cpuSize.mode.input.label')
                    : i18n('cpuSize.mode.select.label')}
                </span>
              </Button>
            </Form.Item>
          </Col>
          <Col span="1">
            <span className="ml-5" style={{ display: 'inline-block', marginTop: 38 }}>
              {i18n('function.gpu_specifications.unit')}
            </span>
          </Col>
          {/* 内存 规格 */}
          <Col span={9}>
            <Form.Item
              labelAlign="top"
              className="ml-30"
              required
              requiredMessage={
                i18n('general.required', {
                  name: i18n('function.memory_specifications.title'),
                }) as string
              }
              validator={memorySpecificationsValidator}
            >
              <p className="color-light-black">{i18n('function.memory_specifications.title')}</p>
              {configMemoryType ? (
                <Select
                  className="full-width"
                  name={MEMORY_SPECIFICATIONS}
                  value={memorySpecificationsValue}
                  placeholder={i18n('function.memory_specifications.placeholder')}
                  onChange={(v) => setMemorySpecificationsValue(v)}
                >
                  {memorySpecificationsDataSource.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <NumberPicker
                  className="full-width"
                  name={MEMORY_SPECIFICATIONS}
                  value={memorySpecificationsValue}
                  precision={memoryUnitType === 'MB' ? undefined : 4}
                  min={memoryUnitType === 'MB' ? 128 : 128 / 1024}
                  max={memoryUnitType === 'MB' ? 32768 : 32}
                  step={memoryUnitType === 'MB' ? 64 : 1}
                  onChange={(v) => setMemorySpecificationsValue(v)}
                  placeholder={i18n('function.memory_specifications.input.placeholder')}
                />
              )}
              <Button
                onClick={() => {
                  setConfigMemoryType(!configMemoryType);
                }}
                type="primary"
                text
                style={{ marginTop: 15 }}
              >
                <span className="noselect">
                  {configMemoryType
                    ? i18n('memorySize.mode.input.label')
                    : i18n('memorySize.mode.select.label')}
                </span>
              </Button>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item>
              <Select
                className="full-width"
                style={{ display: 'inline-block', marginTop: 32 }}
                name={MEMORYSPECIFICATIONS_UNIT}
                value={memoryUnitType}
                onChange={(v) => {
                  field.reset([CPUCORE, MEMORY_SPECIFICATIONS]);
                  if (v === 'MB') {
                    setMemorySpecificationsValue(512);
                  } else {
                    setMemorySpecificationsValue(4);
                  }
                  setMemoryUnitType(v);
                }}
              >
                {MEMORY_UNIT_TYPE.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* 配置错误提示文案 */}
        {field.getError(VALIDATION_RATIO) &&
          !field.getError(MEMORY_SPECIFICATIONS) &&
          !field.getError(CPUCORE) && (
            <Message className="mb-10" type="error">
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    lastChangedType === 'cpu'
                      ? calculateProperMemoryRange(cpuSpecificationsValue, memoryUnitType)
                      : calculateProperCpuRange(memorySpecificationsValue, memoryUnitType),
                }}
              ></span>
            </Message>
          )}
        {/* 使用文案 */}
        <Message type="notice" className="mb-20" title={i18n('must.read.title')}>
          <span
            dangerouslySetInnerHTML={{
              __html: i18n('function.instance_type.not_use.gpu.detail.tips'),
            }}
          ></span>
        </Message>
      </Form.Item>
    </Form>
  );
};

export default Specification;
