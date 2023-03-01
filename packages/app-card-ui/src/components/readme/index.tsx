import React, { FC, useState, PropsWithChildren } from 'react';
import { SlidePanel } from '@alicloud/console-components-slide-panel';
import { Loading, Balloon, Message, Button, Icon } from '@alicloud/console-components';
import Nav, { NavKey } from './Nav';
import ExternalLink from './ExternalLink';
import ReactMarkdown from './ReactMarkdown';
import GithubIcon from './GithubIcon';
import { parseReadme } from '@serverless-cd/ui-help';
import { i18n, copyText, lang } from '../../utils';
import axios from 'axios';
import qs from 'qs';
import { get, isEmpty, map, find, isFunction } from 'lodash';
import { IApiTypeVal, IApiType } from '../../types';

function copy(val) {
  copyText(val);
  Message.show({
    type: 'success',
    content: i18n('ui.copy.sucess'),
    align: 'tr tr',
    offset: [-32, 64],
  });
}

export type Props = PropsWithChildren & {
  appName: string;
  title?: string;
  onCreate?: () => void;
  createButtonDisabled?: boolean;
  activeTab?: `${NavKey}`;
  apiType?: IApiTypeVal;
  visible?: boolean;
  fetchReadme?: () => Promise<string>;
};

const AliReadme: FC<Props> = (props) => {
  const { appName: name } = props;
  const {
    children,
    title = name,
    onCreate,
    createButtonDisabled,
    apiType = IApiType.fc,
    activeTab,
    fetchReadme,
    visible: readmeVisible = false,
  } = props;
  const [visible, setVisible] = useState(readmeVisible);
  const [loading, setLoading] = useState(false);
  const [readmeInfo, setReadmeInfo] = useState<any>({});

  const fetchApps = async () => {
    try {
      const result = await axios({
        method: 'get',
        url: `https://registry.devsapp.cn/console/applications?type=${apiType}&lang=${lang()}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const Response = get(result, 'data.Response', []);
      return Response;
    } catch (e) {
      return [];
    }
  };

  const fetchContent = async () => {
    try {
      const result = await axios({
        method: 'post',
        url: `https://registry.devsapp.cn/package/content?lang=${lang()}`,
        data: qs.stringify({
          name,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return get(result, 'data.Response.readme');
    } catch (e) {}
  };

  const fetchData = async () => {
    setLoading(true);
    const [app, content] = await Promise.all([fetchApps(), fetchContent()]);
    const appInfo = find(app, (item) => item.package === name);
    if (content.match(/(?=<appdetai)[\s\S]+(?=<\/appdetail>)/)) {
      const data = parseReadme(content);
      setReadmeInfo({
        ...data,
        logo: get(data, 'logo') || get(appInfo, 'logo'),
        description: get(data, 'description') || get(appInfo, 'description'),
        codeUrl: get(data, 'codeUrl') || get(appInfo, 'url'),
        previewUrl: get(data, 'previewUrl') || get(appInfo, 'demo'),
      });
    } else {
      setReadmeInfo(content);
    }
    setLoading(false);
  };

  const doFetchReadme = async () => {
    setLoading(true);
    try {
      const content = await fetchReadme();
      if (content.match(/(?=<appdetai)[\s\S]+(?=<\/appdetail>)/)) {
        const data = parseReadme(content);
        setReadmeInfo({
          ...data,
          logo: get(data, 'logo'),
          description: get(data, 'description'),
          codeUrl: get(data, 'codeUrl'),
          previewUrl: get(data, 'previewUrl'),
        });
      } else {
        setReadmeInfo(content);
      }
    } catch (error) {}

    setLoading(false);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onOpen = () => {
    isFunction(fetchReadme) ? doFetchReadme() : fetchData();
    setVisible(true);
  };

  const renderFooter = () => {
    return (
      <>
        {onCreate && (
          <Button
            type="primary"
            onClick={onCreate}
            disabled={createButtonDisabled}
            className="mr-8"
          >
            {i18n('ui.create.now')}
          </Button>
        )}
        {readmeInfo.previewUrl && (
          <Button
            type="normal"
            onClick={() => {
              window.open(readmeInfo.previewUrl);
            }}
            className="mr-8"
          >
            {i18n('ui.review')}
            <Icon type="external-link" className="ml-4" />
          </Button>
        )}
        {readmeInfo.codeUrl && (
          <Button
            type="normal"
            onClick={() => {
              window.open(readmeInfo.codeUrl);
            }}
            iconSize="xs"
            className="mr-8"
          >
            {i18n('ui.source.code')}
            <Icon type="external-link" className="ml-4" />
          </Button>
        )}
        <Button
          type="normal"
          onClick={() => {
            const shareUrl =
              apiType === IApiType.fc
                ? `https://fcnext.console.aliyun.com/applications/create?template=${name}`
                : `https://fcnext.console.aliyun.com/web/create?template=${name}`;
            copyText(shareUrl);
            Message.show({
              type: 'success',
              content: i18n('ui.share.copy.sucess'),
              align: 'tr tr',
              offset: [-32, 64],
            });
          }}
          iconSize="xs"
          className="mr-8"
        >
          {i18n('ui.share')}
          <Icon type="attachment" className="ml-4" />
        </Button>
        <Button type="normal" onClick={onClose}>
          {i18n('ui.cancel')}
        </Button>
      </>
    );
  };
  const renderBody = () => {
    if (loading) {
      return <Loading visible={loading} inline={false} style={{ minHeight: 400 }} />;
    }
    // 兼容旧模版
    if (typeof readmeInfo === 'string') {
      return <ReactMarkdown text={readmeInfo} />;
    }
    return (
      <div className="serverless-cd__alireadme-wrapper">
        <Nav activeTab={activeTab} />
        <div className={readmeInfo.logo || readmeInfo.description ? 'pt-24' : 'pt-1'}>
          {readmeInfo.logo && <img src={readmeInfo.logo} style={{ height: 30 }} />}
          {readmeInfo.description && <div>{readmeInfo.description}</div>}
          <h1 className="mt-20" id={NavKey.codepre}>
            {i18n('ui.codepre.title')}
          </h1>
          {!isEmpty(readmeInfo.service) && (
            <>
              <div className="mb-4">{i18n('ui.codepre.label')}</div>
              <ul style={{ listStyle: 'unset' }} className="pl-16">
                {map(readmeInfo.service, (item) => (
                  <li key={item.label}>
                    <a className="color-link cursor-pointer" href={item.url} target="_blank">
                      {item.name}:
                    </a>
                    <span className="ml-8">{item.description}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {!isEmpty(readmeInfo.auth) && (
            <>
              <div className="mt-16 mb-4">{i18n('ui.codepre.permissions')}</div>
              <ul style={{ listStyle: 'unset' }} className="pl-16">
                {map(readmeInfo.auth, (item) => (
                  <li key={item.label}>
                    <span>{item.name}:</span>
                    <span className="ml-8">{item.description}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {(readmeInfo.codeUrl || readmeInfo.previewUrl) && (
            <>
              <h2 className="mt-20">{i18n('ui.code.and.preview')}</h2>
              {readmeInfo.codeUrl && (
                <div>
                  <GithubIcon />
                  <ExternalLink
                    className="color-link cursor-pointer ml-2"
                    url={readmeInfo.codeUrl}
                    label={i18n('ui.view.code.source')}
                  />
                </div>
              )}
              {readmeInfo.previewUrl && (
                <div>
                  <span className="text-middle">👀</span>
                  <ExternalLink
                    className="color-link cursor-pointer ml-4"
                    url={readmeInfo.previewUrl}
                    label={i18n('ui.preview')}
                  />
                </div>
              )}
            </>
          )}
          {readmeInfo.remark && (
            <>
              <h2 className="mt-20">{i18n('ui.precautions')}</h2>
              {readmeInfo.remark}
            </>
          )}
          {readmeInfo.disclaimers && (
            <>
              <h2 className="mt-20">{i18n('ui.disclaimer')}</h2>
              <ReactMarkdown text={readmeInfo.disclaimers} />
            </>
          )}
          <h1 className="mt-20" id={NavKey.appdetail}>
            {i18n('ui.application.introduction.document')}
          </h1>
          <ReactMarkdown text={readmeInfo.appdetail} />
          <h1 className="mt-20" id={NavKey.usedetail}>
            {i18n('ui.application.usage.document')}
          </h1>
          <ReactMarkdown text={readmeInfo.usedetail} />
          <h1 className="mt-20" id={NavKey.local_experience}>
            {i18n('ui.local_experience')}
          </h1>
          <ul className="ml-0">
            <li className="mt-10">
              <span>{i18n('ui.download.and.install.s')}</span>
              <Balloon
                triggerType="hover"
                align="t"
                closable={false}
                trigger={
                  <code
                    className="cursor-pointer"
                    onClick={() => copy('npm install @serverless-devs/s -g')}
                  >
                    npm install @serverless-devs/s -g
                  </code>
                }
              >
                {i18n('ui.click.copy')}
              </Balloon>
              <ul className="ml-32 mt-4">
                <li>
                  {i18n('ui.install.s.detail')}
                  <ExternalLink
                    className="color-link cursor-pointer ml-4"
                    url="https://docs.serverless-devs.com/serverless-devs/install"
                    label={i18n('ui.s.doc')}
                  />
                </li>
                <li className="align-start mt-8" style={{ background: '#f8f8f9' }}>
                  <div
                    style={{ height: 100, width: 100, background: '#000' }}
                    className="align-center"
                  >
                    <img
                      src="https://serverless-devs.com/logo.png"
                      className="ml-20"
                      style={{ width: 60 }}
                    />
                  </div>
                  <div style={{ flex: 1, height: '100%', padding: 16, border: '1px solid #eee' }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: i18n('ui.s.intro'),
                      }}
                    />
                    <div className="mt-8">
                      <span className="mr-16">
                        <GithubIcon />
                        <ExternalLink
                          className="color-link cursor-pointer ml-4"
                          url="https://github.com/serverless-devs"
                          label={i18n('ui.project.address')}
                        />
                      </span>
                      <span className="mr-16">
                        <GithubIcon />
                        <ExternalLink
                          className="color-link cursor-pointer ml-4"
                          url="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/readme.md"
                          label={i18n('ui.project.document')}
                        />
                      </span>
                      <span>
                        <svg
                          style={{ verticalAlign: 'sub' }}
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="1802"
                          width="16"
                          height="16"
                        >
                          <path
                            d="M709.2224 678.656h114.176c-71.0144 99.2768-139.3152 194.7136-207.616 290.1504-1.6384-0.5632-3.2768-1.1776-4.9152-1.7408 14.8992-62.6688 29.7984-125.3888 45.312-190.72h-89.2416c10.1376-46.2848 19.6608-89.7536 30.0544-137.2672-25.3952 7.6288-47.5136 12.0832-67.7376 20.8896-43.7248 19.0464-83.0976 10.9056-118.5792-17.2544-23.5008-18.6368-46.4384-38.9632-65.5872-61.9008-19.968-23.9616-13.7216-37.632 16.6912-42.752 64.3072-10.8544 128.8192-20.3776 193.4336-32.3584-13.5168 0-27.0336 0.1024-40.5504 0-55.6032-0.5632-111.2064-1.4336-166.8608-1.6384-34.1504-0.1024-58.1632-17.8176-78.7968-42.5472-26.624-31.9488-44.1856-68.4032-54.1184-108.544-6.2976-25.4464 0.6656-32.4608 26.9312-26.368 66.4576 15.4624 132.7104 31.4368 199.168 47.0016 33.9456 7.936 67.9936 15.3088 102.9632 19.712-40.2944-13.312-80.9984-25.4976-120.7808-40.2432-60.6208-22.4768-120.5248-46.9504-180.9408-70.0416-18.3296-7.0144-30.464-19.2-38.144-36.8128-23.6032-53.8624-41.216-109.2096-41.6768-168.6528-0.1536-21.6576 7.0656-26.9824 25.7024-17.9712C377.7536 151.2448 573.44 228.4544 769.8944 303.872c18.8416 7.2192 36.7616 17.8688 53.7088 29.0816 32.6144 21.7088 43.264 49.1008 26.368 83.456-34.7136 70.5536-72.8576 139.4688-109.8752 208.896-9.1648 17.152-19.456 33.6896-30.8736 53.3504z"
                            fill="#2495e8"
                            p-id="1803"
                          ></path>
                          <path
                            d="M763.5968 301.4144C569.2416 226.816 375.7568 150.2208 188.16 59.5456c-18.5856-9.0112-25.856-3.6864-25.7024 17.9712 0.4608 59.4432 18.0736 114.7904 41.6768 168.6528 7.7312 17.6128 19.8144 29.7984 38.144 36.8128 60.416 23.0912 120.32 47.5648 180.9408 70.0416 39.7824 14.7456 80.4864 26.9312 120.7808 40.2432-34.9696-4.4032-69.0176-11.776-102.9632-19.712-66.4064-15.5136-132.7104-31.5392-199.168-47.0016-26.2656-6.0928-33.2288 0.9216-26.9312 26.368 9.9328 40.192 27.4944 76.5952 54.1184 108.544 20.5824 24.7296 44.6464 42.3936 78.7968 42.5472 55.6032 0.2048 111.2064 1.1264 166.8608 1.6384 13.5168 0.1536 27.0336 0 40.5504 0-64.6144 11.9808-129.1264 21.5552-193.4336 32.3584-30.4128 5.12-36.608 18.7904-16.6912 42.752 19.0976 22.9376 42.0864 43.264 65.5872 61.9008 35.4816 28.16 74.8032 36.3008 118.5792 17.2544 20.224-8.8064 42.3936-13.2096 67.7376-20.8896-5.1712 23.6032-10.1376 46.2336-15.0528 68.7104 109.3632-101.632 178.6368-245.8112 181.6064-406.3232z"
                            fill="#3a9ced"
                            p-id="1804"
                            data-spm-anchor-id="a313x.7781069.0.i10"
                          ></path>
                          <path
                            d="M242.2784 282.9312c60.416 23.0912 120.32 47.5648 180.9408 70.0416 33.1264 12.288 66.9184 22.8352 100.5568 33.6896 28.928-47.0016 51.2512-98.4576 65.5872-153.1904-135.4752-53.8624-269.824-110.3872-401.2544-173.9776-18.5856-9.0112-25.856-3.6864-25.7024 17.9712 0.4608 59.4432 18.0736 114.7904 41.6768 168.6528 7.7824 17.6128 19.9168 29.8496 38.1952 36.8128zM441.0368 373.504c-66.4064-15.5136-132.7104-31.5392-199.168-47.0016-26.2656-6.0928-33.2288 0.9216-26.9312 26.368 9.9328 40.192 27.4944 76.5952 54.1184 108.544 20.5824 24.7296 44.6464 42.3936 78.7968 42.5472 26.4192 0.1024 52.8896 0.3584 79.3088 0.6656 36.2496-33.8944 68.096-72.3968 94.5152-114.688-27.1872-4.352-53.9648-10.1888-80.64-16.4352zM361.7792 538.0608c-26.624 4.5056-34.6624 15.5136-22.8864 34.304 19.5072-12.1344 38.1952-25.4464 56.064-39.7824-11.0592 1.792-22.1184 3.584-33.1776 5.4784z"
                            fill="#59adf8"
                            p-id="1805"
                            data-spm-anchor-id="a313x.7781069.0.i11"
                          ></path>
                          <path
                            d="M242.2784 282.9312c14.8992 5.6832 29.7984 11.4688 44.6464 17.3056 44.3904-42.0352 82.0224-91.0848 111.0528-145.5104-70.6048-30.2592-140.6464-61.7472-209.8688-95.232-18.5856-9.0112-25.856-3.6864-25.7024 17.9712 0.4608 59.4432 18.0736 114.7904 41.6768 168.6528 7.7824 17.6128 19.9168 29.8496 38.1952 36.8128zM241.8688 326.5536c-26.2656-6.0928-33.2288 0.9216-26.9312 26.368 0.3584 1.536 0.8704 3.0208 1.28 4.5568 12.9536-8.8576 25.4976-18.2272 37.6832-28.1088-4.0448-0.9216-8.0384-1.8944-12.032-2.816z"
                            fill="#6bc2fc"
                            p-id="1806"
                            data-spm-anchor-id="a313x.7781069.0.i12"
                          ></path>
                        </svg>
                        {i18n('ui.dingding')}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </li>

            <li className="mt-10">
              <span>{i18n('ui.password.config')}</span>
              <Balloon
                triggerType="hover"
                align="t"
                closable={false}
                trigger={
                  <code className="cursor-pointer" onClick={() => copy('s config add')}>
                    s config add
                  </code>
                }
              >
                {i18n('ui.click.copy')}
              </Balloon>
              <ul className="ml-32 mt-4">
                <li>
                  {i18n('ui.password.config.detail')}
                  <ExternalLink
                    className="color-link cursor-pointer ml-4"
                    url="https://docs.serverless-devs.com/serverless-devs/command/config#config-add-%E5%91%BD%E4%BB%A4"
                    label={i18n('ui.password.config.document')}
                  />
                </li>
              </ul>
            </li>
            <li className="mt-10">
              <span>{i18n('ui.init.project')}</span>
              <Balloon
                triggerType="hover"
                align="t"
                closable={false}
                trigger={
                  <code
                    className="cursor-pointer"
                    onClick={() => copy(`s init ${name} -d ${name}`)}
                  >
                    {`s init ${name} -d ${name}`}
                  </code>
                }
              >
                {i18n('ui.click.copy')}
              </Balloon>
            </li>
            <li className="mt-10">
              <span>{i18n('ui.deploy.project')}</span>
              <Balloon
                triggerType="hover"
                align="t"
                closable={false}
                trigger={
                  <code className="cursor-pointer" onClick={() => copy(`cd ${name} && s deploy`)}>
                    {`cd ${name} && s deploy`}
                  </code>
                }
              >
                {i18n('ui.click.copy')}
              </Balloon>
              <ul className="ml-32 mt-4">
                <li>
                  {i18n('ui.remark')}
                  <ExternalLink
                    className="color-link cursor-pointer ml-4"
                    url="https://docs.serverless-devs.com/serverless-devs/command/readme"
                    label={i18n('ui.remark.document')}
                  />
                </li>
              </ul>
            </li>
          </ul>
          <h1 className="mt-20" id={NavKey.disclaimers}>
            {i18n('ui.application.center.disclaimer')}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: i18n('ui.application.center.disclaimer.content') }}
          />
          {readmeInfo.disclaimers && (
            <>
              <h1 className="mt-20">{i18n('ui.disclaimer.for.current.application')}</h1>
              <ReactMarkdown text={readmeInfo.disclaimers} />
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <SlidePanel
        width={960}
        title={title}
        isShowing={visible}
        onClose={onClose}
        customFooter={renderFooter()}
      >
        {renderBody()}
      </SlidePanel>
    </>
  );
};

export default AliReadme;
