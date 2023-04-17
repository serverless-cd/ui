import _ from 'lodash';
import axios from 'axios';
import { labelWidth, COMMON_VARIABLE_TYPE_REG } from '../constants';
import store from '../store';

function isMagic(value: any) {
  return typeof value === 'string' && value.match(COMMON_VARIABLE_TYPE_REG);
}

function getRefValue(item: any) {
  let tmp = item;
  if (item.$ref) {
    tmp = _.assign(
      {},
      _.get(store.schema, _.join(_.slice(_.split(item.$ref, '/'), 1), '.')),
      _.omit(item, '$ref'),
    );
  }
  return _.omit(tmp, 'required');
}

function isArrayTypeValue(properties: any, type: 'string' | 'object') {
  const oneOf = _.get(properties, 'items.oneOf');
  return _.find(oneOf, (obj) => obj.type === type);
}

function getArrayKeys(properties: any, current: any) {
  if (isMagic(current)) {
    return {
      'x-component': 'Span',
    };
  }
  if (properties['x-component']) {
    return {
      'x-component': properties['x-component'],
      'x-component-props': {
        ...properties['x-component-props'],
        keyText: _.get(properties, 'x-component-props.type') === 'array' ? '键' : '变量',
        item: {
          ...properties,
          oneOf: _.map(properties.items.oneOf, (obj) => getRefValue(obj)),
          labelWidth,
        },
      },
    };
  } else {
    if (isArrayTypeValue(properties, 'string')) {
      return {
        'x-component': 'ArrayStrings',
        'x-component-props': {
          placeholder: _.get(isArrayTypeValue(properties, 'string'), 'examples[0]'),
        },
      };
    } else if (isArrayTypeValue(properties, 'object')) {
      const tmp = isArrayTypeValue(properties, 'object').properties;
      return {
        'x-component': 'ArrayCards',
        items: {
          type: 'object',
          properties: {
            index: {
              type: 'void',
              'x-component': 'ArrayCards.Index',
            },
            ...generateKey(tmp, current),
            remove: {
              type: 'void',
              'x-component': 'ArrayCards.Remove',
            },
            moveUp: {
              type: 'void',
              'x-component': 'ArrayCards.MoveUp',
            },
            moveDown: {
              type: 'void',
              'x-component': 'ArrayCards.MoveDown',
            },
          },
        },
        properties: {
          addition: {
            type: 'void',
            title: '添加条目',
            'x-component': 'ArrayCards.Addition',
          },
        },
      };
    }
  }
}

function getArraySelectKeys(properties: any, current: any) {
  if (isMagic(current)) {
    return {
      'x-component': 'Span',
    };
  }
  if (isArrayTypeValue(properties, 'string')) {
    const tmp = isArrayTypeValue(properties, 'string');
    return {
      'x-component': 'Select',
      'x-component-props': {
        mode: 'multiple',
      },
      enum: tmp.enum,
    };
  }
}

function tranformKey(item: any, current: any) {
  item.type = item['x-type'] || item.type;
  const defaultConfig = {
    type: item.type,
    default: current || item.default,
    // required: item.required,
    title: item.title,
    description: item.description,
    'x-decorator': 'FormItem',
    'x-decorator-props': {
      labelWidth,
      tooltip: item['x-tooltip'],
    },
    'x-reactions': item['x-reactions'],
    'x-component-props': {
      placeholder: _.get(item, 'examples[0]'),
    },
  };

  if (item.enum) {
    // 枚举
    const tmp: { label: any; value: any }[] = [];
    if (item['x-enum-label']) {
      _.each(item['x-enum-label'], (obj, index) => {
        tmp.push({
          label: obj,
          value: item.enum[index],
        });
      });
    }
    return {
      ...defaultConfig,
      'x-component': isMagic(current) ? 'Span' : item['x-component'] || 'Select',
      enum: tmp.length > 0 ? tmp : item.enum,
    };
  } else if (item.type === 'string') {
    // 字符串
    return {
      ...defaultConfig,
      'x-component': isMagic(current) ? 'Span' : 'Input',
    };
  } else if (item.type === 'integer') {
    // 数字
    return {
      ...defaultConfig,
      'x-component': isMagic(current) ? 'Span' : 'NumberPicker',
      'x-component-props': {
        max: item.maximum,
        min: item.minimum,
      },
    };
  } else if (item.type === 'boolean') {
    // 布尔值
    return {
      ...defaultConfig,
      'x-component': isMagic(current) ? 'Span' : 'Switch',
    };
  } else if (item.type === 'array-select') {
    // 数组，但是用select（多选）来渲染，比如methods
    return {
      ...defaultConfig,
      ...getArraySelectKeys(item, current),
    };
  } else if (item.type === 'array') {
    // 数组
    return {
      ...defaultConfig,
      ...getArrayKeys(item, current),
    };
  } else if (item.type === 'object') {
    // 对象
    return {
      ...defaultConfig,
      properties: generateKey(item.properties, current),
    };
  } else if (item.oneOf) {
    // oneOf
    if (isMagic(current)) {
      return {
        ...defaultConfig,
        'x-component': 'Span',
      };
    }
    return {
      'x-component': 'OneOf',
      'x-component-props': {
        item: {
          ...item,
          oneOf: _.map(item.oneOf, (obj) => getRefValue(obj)),
          labelWidth,
        },
      },
    };
  } else {
    return {
      ...defaultConfig,
      'x-component': isMagic(current) ? 'Span' : item['x-component'] || 'Input',
    };
  }
}

export function generateKey(properties: any, current: any = {}) {
  const tmp = {};
  _.each(properties, (item, key) => {
    let newItem = getRefValue(item);
    _.set(tmp, key, tranformKey(newItem, current[key]));
  });
  return tmp;
}

function getTopKey(key: string, item: any, current: any) {
  let newItem = getRefValue(item);
  if (isMagic(current)) {
    return {
      [key]: {
        'x-component': 'Span',
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          labelWidth,
        },
        ...newItem,
        default: current,
      },
    };
  }

  if (item.type === 'object') {
    return {
      [key]: {
        type: 'object',
        properties: generateKey(newItem.properties, current),
      },
    };
  } else {
    return {
      [key]: tranformKey(newItem, current),
    };
  }
}

function formatSchema(obj: any) {
  let result: any = obj.constructor === Array ? [] : {};
  if (typeof obj === 'object') {
    for (var i in obj) {
      const val = obj[i];
      if (_.get(val, 'deprecated')) {
        continue;
      }
      result[i] = typeof val === 'object' ? formatSchema(val) : val;
    }
  } else {
    result = obj;
  }
  return result;
}

const tranformSchema = async (dataSource: Record<string, any>, activeTab: string) => {
  const componentName = _.get(dataSource, `services.${activeTab}.component`, 'devsapp/fc');
  let schema = await axios.post(
    'https://registry.devsapp.cn/package/props',
    {
      name: componentName,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', // application/json
      },
    },
  );

  schema = _.get(schema, 'data.Response');
  schema = formatSchema(schema);
  store.setSchema(schema);
  const tmp = {};
  const properties = _.get(schema, 'properties');
  _.each(properties, (item, key: string) => {
    _.set(tmp, key, {
      type: 'void',
      'x-component': 'FormCollapse.CollapsePanel',
      'x-component-props': {
        title: item['title'],
      },
      properties: getTopKey(key, item, dataSource[key]),
    });
  });

  const schemaObj = {
    type: 'object',
    properties: {
      collapse: {
        type: 'void',
        'x-decorator': 'FormItem',
        'x-component': 'FormCollapse',
        'x-component-props': {
          formCollapse: '{{formCollapse}}',
        },
        properties: tmp,
      },
    },
  };

  return schemaObj;
};

export default tranformSchema;
