import React, { FC, useState, useEffect, Fragment } from 'react';
import { get, isEmpty, map } from 'lodash';
import {
  Table, Icon, Grid,
} from '@alicloud/console-components';
import { i18n } from '../../utils';
import { getAppV3 } from '../../services/registry';
import { filterService } from '../../constants/service-project';
import './ServiceStatus.less'
import SubTitle from './SubTitle';
import ExternalLink from './ExternalLink';


const { Row, Col } = Grid;

type Props = {
  template: string;
};

const ServiceStatus: FC<Props> = (props) => {
  const { template, } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [template]);

  const fetchData = async () => {
    if (isEmpty(template)) return;
    setLoading(true);
    try {
      const result = await getAppV3(template);
      const service = get(result, 'publish_yaml.Service', {});
      const serviceInfo = filterService(service);
      const data = map(serviceInfo, item => {
        return {
          ...item,
          status: true,
        }
      }).filter((item) => item.product !== 'acr');
      setData(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: i18n('serviceName.label'),
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: i18n('service.open.status'),
      dataIndex: 'status',
      key: 'status',
      cell: (value, index, record) =>
        value ? (
          <>
            <Icon type="success" size="xs" className="color-success" />
            <span className="ml-4">{i18n('service.enable')}</span>
          </>
        ) : (
          <>
            <Icon type="error" size="xs" className="color-error" />
            <span dangerouslySetInnerHTML={{
              __html: i18n('service.non.enable', {
                url: record.url,
              })
            }}></span>
          </>
        ),
    },
    {
      title: i18n('service.enable.purpose'),
      dataIndex: 'extend',
      key: 'extend',
      cell: (value, index, record) => {
        return (
          <>
            <ExternalLink
              className="color-link cursor-pointer mr-20"
              url={record.helpUrl}
              label={'帮助文档'}
            />
            <ExternalLink
              className="color-link cursor-pointer"
              url={record.chargingUrl}
              label={'计费文档'}
            />
          </>
        );
      },
    },
  ];

  if (isEmpty(data)) return null;

  return (
    <Fragment>
      <SubTitle
        title={'所依赖服务校验'}
        subTitle={`创建 ${template} 项目所需要的资源、权限与相关计费说明等`}
      />
      <div className="mb-20">
        <Row>
          <Col span="24">
            <Table columns={columns} loading={loading} dataSource={data} className='qianzhizhunbei' />
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default ServiceStatus;
