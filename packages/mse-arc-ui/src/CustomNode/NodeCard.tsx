import React, { useState, useEffect } from 'react';
import Divider from 'antd/es/divider';
import Tag from 'antd/es/tag';
import { Col, Row } from 'antd/es/grid';
import { StarOutlined, ApartmentOutlined } from '@ant-design/icons';
import 'whatwg-fetch';

const NodeCard = ({ source }) => {
  const {
    url,
    completeUrl,
    describe,
    tags = [],
    websiteUrl,
    githubUrl,
    latestVersionUrl,
    overviewUrl,
    apiUrl,
    name,
  } = source;
  const [starCount, setStarCount] = useState(0);
  const [forkCount, setForkCount] = useState(0);

  const UrlEnum = [
    { label: 'GitHub', url: githubUrl },
    { label: '官网', url: websiteUrl },
    { label: '最新版本', url: latestVersionUrl },
    { label: '快速入门', url: overviewUrl },
  ];

  const getGitHubInfo = () => {
    const ServerlessGitHubInfo = sessionStorage.getItem('ServerlessGitHubInfo');
    const GitHubInfo = JSON.parse(ServerlessGitHubInfo) ?? {};
    if (GitHubInfo.hasOwnProperty(name)) {
      const { starCount, forkCount } = GitHubInfo[name];
      setStarCount(starCount);
      setForkCount(forkCount);
    } else {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setStarCount(data.stargazers_count);
          setForkCount(data.forks_count);
          const newGitHubInfo = { ...GitHubInfo };
          newGitHubInfo[name] = { starCount: data.stargazers_count, forkCount: data.forks_count };
          sessionStorage.setItem('ServerlessGitHubInfo', JSON.stringify(newGitHubInfo));
        });
    }
  };

  const GoGitHub = () => {
    window.open(githubUrl, '_blank');
  };

  const GoGitHubFork = () => {
    const forkUrl = `${githubUrl}/fork`;
    window.open(forkUrl, '_blank');
  };

  useEffect(() => {
    getGitHubInfo();
  }, []);

  return (
    <div className="node-card">
      <div
        style={{
          marginBottom: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <img src={completeUrl} alt="" style={{ width: 150 }} />
        <div>
          {tags.map((tag) => {
            return (
              <Tag color="processing" style={{ marginBottom: 4 }}>
                {tag}
              </Tag>
            );
          })}
        </div>
      </div>
      <Divider style={{ margin: '8px 0' }} />
      <div style={{ marginBottom: 12 }}>{describe}</div>
      <div>
        {UrlEnum.map((item) => {
          return (
            <Row>
              <Col span={6}>{item.label}:</Col>
              <Col span={18}>
                <div
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <a href={item.url} target="_blank">
                    {item.url}
                  </a>
                </div>

                {item.label === 'GitHub' && (
                  <div>
                    <Tag
                      color="#cccffd"
                      icon={<StarOutlined style={{ color: '#5072fc' }} />}
                      onClick={GoGitHub}
                      style={{ cursor: 'pointer' }}
                    >
                      <span style={{ color: '#5072fc' }}>{starCount}</span>
                    </Tag>
                    <Tag
                      color="#cccffd"
                      icon={<ApartmentOutlined style={{ color: '#5072fc' }} />}
                      onClick={GoGitHubFork}
                      style={{ cursor: 'pointer' }}
                    >
                      <span style={{ color: '#5072fc' }}>{forkCount}</span>
                    </Tag>
                  </div>
                )}
              </Col>
            </Row>
          );
        })}
      </div>
    </div>
  );
};

export default NodeCard;
