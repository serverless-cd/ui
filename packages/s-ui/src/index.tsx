import React, { FC, useState, useEffect, ReactElement } from 'react';
import RcInfo from '@alicloud/console-components-info';
import { isEmpty, debounce, get, omit, isFunction } from 'lodash';
import { Input } from '@alicloud/console-components';
import ProjectBase from './components/project-base';
import { tryfun } from './utils';
// import App from '../App/index';
import './style/index.less';

type Props = {
  value: Record<string, any>;
  accessList: string[];
  EditorRender: ({ value, onChange }) => ReactElement;
};

const SUi: FC<Props> = (props) => {
  const { value: dataSource = {}, accessList, EditorRender } = props;
  const [data, setData] = useState<any>(dataSource);

  useEffect(() => {
    console.log('data', data);
  }, [JSON.stringify(data)]);

  return (
    <>
      <RcInfo title="基本信息">
        <ProjectBase
          dataSource={{
            edition: dataSource.edition,
            name: dataSource.name,
            access: dataSource.access,
          }}
          accessList={accessList}
          onChange={(value) => setData({ ...data, ...value })}
        />
      </RcInfo>
      {data.vars && (
        <RcInfo title="全局变量">
          <div className="ml-16 mr-16">
            {isEmpty(EditorRender) ? (
              <Input.TextArea
                className="full-width"
                value={JSON.stringify(data.vars, null, 2)}
                onChange={(value) => {
                  const newValue = tryfun(JSON.parse, value);
                  newValue && setData({ ...data, vars: newValue });
                }}
              />
            ) : (
              <EditorRender
                value={data.vars}
                onChange={(value) => setData({ ...data, vars: value })}
              />
            )}
          </div>
        </RcInfo>
      )}
      <RcInfo title="应用配置">
        {/* <App
          dataSource={get(data, 'services')}
          onChange={(value: object) => setData({ ...data, services: value })}
        /> */}
      </RcInfo>
    </>
  );
};

export default SUi;
