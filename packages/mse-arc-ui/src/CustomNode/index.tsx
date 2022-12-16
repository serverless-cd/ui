import React from "react";
import SingleNode from "./SingleNode";
import DoubleNode from "./DoubleNode";
import FourNode from "./FourNode";
import { IconMap } from "./constant";
import "./index.css";

const NodeTitleEnum = {
  middle1:'loT/PC/Moblie',
  middle2:'网关',
  middle3:'服务集群A',
  middle4:'服务集群B',
  middle5:'数据存储',
  left1:'治理面',
  left2:'运维面',
  left3:'分布式事务',
  right1:'异步调用',
  right2:'控制面',
  right3:'可观测',
}


const NoBase = ["middle1", "middle5"];

const CustomNode = (props) => {
  const { node } = props;
  const { id } = node;

  return (
    <React.Fragment>
      <div className="custom-node-title">{NodeTitleEnum[id]}</div>
      {IconMap[id] && IconMap[id].length === 1 && (
        <SingleNode iconSource={IconMap[id]} hasBase={!NoBase.includes(id)} />
      )}
      {IconMap[id] && IconMap[id].length === 2 && (
        <DoubleNode iconSource={IconMap[id]} />
      )}
      {IconMap[id] && IconMap[id].length === 4 && (
        <FourNode iconSource={IconMap[id]} />
      )}
    </React.Fragment>
  );
};

export default CustomNode;
