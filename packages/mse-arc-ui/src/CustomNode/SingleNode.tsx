import React from "react";
import "./index.css";
import NodeIcon from "./NodeIcon";

const SingleNode = (props) => {
  const { iconSource, hasBase = false } = props;

  return (
    <React.Fragment>
      <div className="custom-node"></div>
      <div className="custom-node-base">
        <NodeIcon iconSource={iconSource[0]} hasBase={hasBase} />
      </div>
    </React.Fragment>
  );
};

export default SingleNode;
