import React from "react";
import "./index.less";
import NodeIcon from "./NodeIcon";

const FourNode = (props) => {
  const { iconSource } = props;

  return (
    <React.Fragment>
      <div className="four-node"></div>
      <div className="four-node-base1">
        <NodeIcon iconSource={iconSource[0]} />
      </div>
      <div className="four-node-base2">
        <NodeIcon iconSource={iconSource[1]} />
      </div>
      <div className="four-node-base3">
        <NodeIcon iconSource={iconSource[2]} />
      </div>
      <div className="four-node-base4">
        <NodeIcon iconSource={iconSource[3]} />
      </div>
    </React.Fragment>
  );
};

export default FourNode;
