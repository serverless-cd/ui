import React from "react";
import "./index.less";
import NodeIcon from "./NodeIcon";

const DoubleNode = (props) => {
  const { iconSource } = props;

  return (
    <React.Fragment>
      <div className="double-node"></div>
      <div className="double-node-base1">
        <NodeIcon iconSource={iconSource[0]} />
      </div>
      <div className="double-node-base2">
        <NodeIcon iconSource={iconSource[1]} />
      </div>
    </React.Fragment>
  );
};

export default DoubleNode;
