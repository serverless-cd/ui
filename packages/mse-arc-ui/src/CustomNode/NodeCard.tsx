import React, { useState, useEffect } from "react";
import { Divider, Tag, Col, Row } from "antd";
import { StarOutlined, ApartmentOutlined } from "@ant-design/icons";
import "whatwg-fetch";

const NodeCard = ({ source }) => {
  const {
    url,
    describe,
    tags = [],
    websiteUrl,
    githubUrl,
    latestVersionUrl,
    overviewUrl,
    apiUrl,
  } = source;
  const [starCount, setStarCount] = useState(0);
  const [forkCount, setForkCount] = useState(0);

  const UrlEnum = [
    { label: "GitHub", url: githubUrl },
    { label: "官网", url: websiteUrl },
    { label: "最新版本", url: latestVersionUrl },
    { label: "快速入门", url: overviewUrl },
  ];

  const getGitHubInfo = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setStarCount(data.stargazers_count);
        setForkCount(data.forks_count);
      });
  };

  useEffect(() => {
    getGitHubInfo();
  }, []);

  return (
    <div className="node-card">
      <div
        style={{
          marginBottom: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src={url} alt="" style={{ width: 40, height: 40 }} />
        <div>
          {tags.map((tag) => {
            return <Tag color="processing">{tag}</Tag>;
          })}
        </div>
      </div>
      <Divider style={{ margin: "8px 0" }} />
      <div style={{ marginBottom: 12 }}>{describe}</div>
      <div>
        {UrlEnum.map((item) => {
          return (
            <Row>
              <Col span={6}>{item.label}:</Col>
              <Col span={18}>
                <div
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <a href={item.url} target="_blank">
                    {item.url}
                  </a>
                </div>

                {item.label === "GitHub" && (
                  <div>
                    <Tag
                      color="#cccffd"
                      icon={<StarOutlined style={{ color: "#5072fc" }} />}
                    >
                      <span style={{ color: "#5072fc" }}>{starCount}</span>
                    </Tag>
                    <Tag
                      color="#cccffd"
                      icon={<ApartmentOutlined style={{ color: "#5072fc" }} />}
                    >
                      <span style={{ color: "#5072fc" }}>{forkCount}</span>
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
