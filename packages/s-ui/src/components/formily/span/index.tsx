import React from 'react';
import { connect, mapProps } from '@formily/react';
import { mapSize } from '@formily/next/lib/__builtins__';
import { Button, Icon, Balloon } from '@alicloud/console-components';
import _ from 'lodash';
import { useState } from 'react';
import yaml from 'js-yaml';
// import axios from 'axios';
import './index.scss';
import { COMMON_VARIABLE_TYPE_REG } from '../../../constants';
import store from '../../../store';

const { Tooltip } = Balloon;

const handleScroll = () => {
  const dom = document.getElementById('global-vars__wrapper');
  if (dom) {
    dom.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
};

const Fc = (props: any) => {
  const value: any = props.value;
  const [data, setData] = useState<any>({});

  const onMouseOver = async () => {
    // const globalMagic: any = await axios.post('/api/globalMagic', store.watchingData);
    // const list = value.match(COMMON_VARIABLE_TYPE_REG);
    // if (_.isEmpty(list)) return;
    // if (list.length === 1) {
    //   const matchResult = list[0].replace(COMMON_VARIABLE_TYPE_REG, '$1');
    //   setData(globalMagic[matchResult]);
    // } else {
    //   const tmp: any = {};
    //   for (const item of list) {
    //     const matchResult = item.replace(COMMON_VARIABLE_TYPE_REG, '$1');
    //     tmp[item] = globalMagic[matchResult];
    //   }
    //   setData(tmp);
    // }
  };

  return (
    <>
      {/* {data ? (
        <Tooltip trigger={<span onMouseOver={onMouseOver}>{value}</span>} align="br">
          <code>
            <pre>{yaml.dump(data)}</pre>
          </code>
        </Tooltip>
      ) : (
        <span>{value}</span>
      )} */}
      <span>{value}</span>
      {_.includes(value, 'vars.') && (
        <Tooltip
          trigger={
            <Button type="primary" text style={{ marginLeft: 8 }} onClick={handleScroll}>
              <Icon type="edit" />
              编辑
            </Button>
          }
        >
          点击编辑按钮可以到 `全局变量` 模块进行修改数据。
        </Tooltip>
      )}
    </>
  );
};

export const Span = connect(
  Fc,
  mapProps(
    {
      value: 'value',
    },
    mapSize,
  ),
);

export default Span;
