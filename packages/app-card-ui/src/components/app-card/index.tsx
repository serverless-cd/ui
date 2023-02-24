import React, { FC } from 'react';
import { Button, Card, Tag } from '@alicloud/console-components';
import { map, isEmpty, get } from 'lodash';
import ExternalLinkInButton from './ExternalLinkInButton';
import Readme from '../readme';
import { IApiType, IAppCardProps, IAppDataSouce } from '../../types';
import { i18n } from '../../utils';

const AppCard: FC<IAppCardProps> = (props) => {
  const { dataSouce = {} as IAppDataSouce, apiType = IApiType.fc, column = 1, fetchReadme } = props;

  const create = () => {
    const url =
      apiType === IApiType.fc
        ? `https://fcnext.console.aliyun.com/applications/create?template=${dataSouce.package}`
        : ` https://fcnext.console.aliyun.com/web/create?template=${dataSouce.package}`;
    window.open(url);
  };

  const tags = get(dataSouce, 'tags', []);
  return (
    <Card
      free
      className="applications-card pt-20 pl-16 pr-16 pb-12"
      style={{ width: `calc((100% - ${16 * column}px) / ${column})` }}
    >
      <div className="applications-card-content-img mb-6">
        {dataSouce.logo ? (
          <img alt="" style={{ height: 34 }} src={dataSouce.logo} />
        ) : (
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7247"
            width="34"
            height="34"
          >
            <path
              d="M249.344 291.328L301.568 343.04l-205.824 205.824L43.52 497.152l205.824-205.824z"
              fill="#FF6A00"
              p-id="7248"
            ></path>
            <path
              d="M43.52 497.664l51.712-51.712 205.824 205.824-51.712 52.224L43.52 497.664z m673.792 205.824L665.6 651.776l205.824-205.824 52.224 51.712-206.336 205.824z"
              fill="#FF6A00"
              p-id="7249"
            ></path>
            <path
              d="M923.648 497.152l-51.712 51.712L665.6 343.04l51.712-52.224 206.336 206.336zM619.52 135.68l26.112 26.112-361.984 361.984-26.112-26.112L619.52 135.68z"
              fill="#FF6A00"
              p-id="7250"
            ></path>
            <path
              d="M437.248 626.176l-26.112 26.112-154.112-154.624 26.112-26.112 154.112 154.624z"
              fill="#FF6A00"
              p-id="7251"
            ></path>
            <path
              d="M489.472 523.264l26.112 26.112-102.912 102.912-26.112-26.112 102.912-102.912z m168.448-334.848c-35.328 0-64.512-28.672-64.512-63.488 0-35.328 28.672-63.488 64.512-63.488 35.328 0 64.512 28.672 64.512 63.488s-29.184 63.488-64.512 63.488z m0-91.136c-15.36 0-27.648 12.288-27.648 27.136s12.288 27.136 27.648 27.136c15.36 0 27.648-12.288 27.648-27.136s-12.8-27.136-27.648-27.136zM347.136 859.648l-26.112-26.112 361.984-361.984 26.112 26.112-361.984 361.984z"
              fill="#FF6A00"
              p-id="7252"
            ></path>
            <path
              d="M528.896 369.152l26.112-26.112 154.624 154.624-26.112 26.112-154.624-154.624z"
              fill="#FF6A00"
              p-id="7253"
            ></path>
            <path
              d="M477.184 472.064l-26.112-26.112L553.984 343.04l26.112 26.112-102.912 102.912z m-168.448 335.36c35.328 0 64.512 28.672 64.512 63.488 0 35.328-28.672 63.488-64.512 63.488-35.328 0-64.512-28.672-64.512-63.488 0.512-34.816 29.184-63.488 64.512-63.488z m0 91.136c15.36 0 27.648-12.288 27.648-27.136s-12.288-27.136-27.648-27.136c-15.36 0-27.648 12.288-27.648 27.136s12.8 27.136 27.648 27.136z"
              fill="#FF6A00"
              p-id="7254"
            ></path>
          </svg>
        )}
      </div>
      <div className="applications-card-header space-between align-start mb-6">
        <div className="align-start">
          <div className="text-title" style={{ wordBreak: 'break-all' }}>
            {!isEmpty(dataSouce) && (
              <span className="text-bold mr-4">{dataSouce.title || dataSouce.package}</span>
            )}
            {dataSouce.user === 1 ? (
              <Tag
                size="small"
                style={{ border: 0, fontSize: 12, color: '#fe832a', background: '#fff0e5' }}
              >
                {i18n('ui.tag.official')}
              </Tag>
            ) : (
              <Tag
                color="blue"
                size="small"
                style={{ border: 0, fontSize: 12, color: '#8099b2', background: '#eef1f5' }}
              >
                {i18n('ui.tag.community')}
              </Tag>
            )}
          </div>
        </div>
        <div className="align-center">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2064"
            width="12"
            height="12"
          >
            <path
              d="M493.789998 1023.53089C254.799718 1023.53089 85.536259 856.015932 85.536259 625.384341c0-122.523033 72.584129-254.513561 75.782607-259.92965a32.11272 32.11272 0 0 1 31.728902-16.162976c12.879205 1.705855 23.156981 11.088057 26.69663 23.540799 0.255878 0.682342 19.87321 74.887033 45.631621 115.955491 17.271782 27.720143 34.970027 47.16689 54.80059 60.81373-13.433608-58.724057-23.626091-147.129991-6.951359-237.668243C358.771578 63.305131 552.514055 3.642853 560.787452 1.21201a31.814195 31.814195 0 0 1 39.831713 36.93176c-0.213232 1.705855-32.325952 175.95894 35.481784 324.410968 6.183724 13.518901 14.712999 29.084827 23.967262 44.906632a422.199104 422.199104 0 0 1 13.135083-66.698929c24.990775-88.022116 89.344154-118.130456 92.116168-119.281909a31.64361 31.64361 0 0 1 32.496537 4.008759c9.382202 7.249884 13.732132 19.276161 11.64246 31.046561-0.341171 2.217611-9.382202 62.178413 41.196398 147.12999 45.674267 76.678181 58.681411 126.403853 58.68141 221.931731C909.123036 856.143872 734.614073 1023.53089 493.789998 1023.53089zM187.247861 475.269104a407.699336 407.699336 0 0 0-28.10396 147.129991c0 187.814632 138.43013 324.069797 334.774036 324.069797 197.879176 0 341.469517-136.255165 341.469518-324.112443 0-81.198696-9.936605-118.684859-48.275696-183.294116-25.587824-43.072838-38.381737-81.795746-44.181643-112.714367a144.272684 144.272684 0 0 0-15.864451 36.803821c-18.721758 66.10188-13.902718 143.718281-13.902718 144.571208a31.259792 31.259792 0 0 1-20.47026 31.259792 30.278926 30.278926 0 0 1-35.225905-11.301289c-2.430843-3.241124-56.975556-81.454575-81.028111-134.336078-49.896258-109.217364-49.213916-227.475759-44.181643-295.539373-50.5786 29.767169-128.408232 96.423452-153.526947 231.868336-24.308433 131.990528 22.943749 269.951548 23.412859 271.23094a31.430378 31.430378 0 0 1-5.586675 31.728902 30.278926 30.278926 0 0 1-30.278925 9.723373c-3.752881-0.93822-96.551391-23.668738-152.460788-112.970245a376.951301 376.951301 0 0 1-26.568691-54.118249z"
              fill="#888"
              p-id="2065"
            ></path>
          </svg>
          <span className="text-description ml-2">{dataSouce.download || 0}</span>
        </div>
      </div>
      <div className="applications-card-content">
        <div className="applications-card-content-description">{dataSouce.description}</div>
        <div className="applications-card-content-tags text-description text-middle">
          {tags.length > 0 &&
            map(tags.slice(0, 3), (tag, index) => (
              <Tag
                key={index}
                className="mr-4"
                size="small"
                style={{ border: 0, color: '#aaaaaa', background: '#f2f2f2' }}
              >
                {tag}
              </Tag>
            ))}
        </div>
      </div>
      <div className="applications-card-footer">
        <Button className="mr-8" type="primary" onClick={create}>
          {i18n('ui.create.now')}
        </Button>
        <Readme appName={dataSouce.package} onCreate={create} fetchReadme={fetchReadme}>
          <Button className="mr-8">{i18n('ui.details')}</Button>
        </Readme>
        <ExternalLinkInButton url={dataSouce.demo} text={i18n('ui.review')} />
      </div>
    </Card>
  );
};

export default AppCard;
