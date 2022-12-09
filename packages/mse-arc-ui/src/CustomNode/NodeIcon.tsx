import React, { useState } from 'react';
import { Popover } from 'antd';
import Base from '../../icon/Base.svg';
import NodeCard from './NodeCard';
import Active from '../../icon/Active.svg';
import './index.less';

const NodeIcon = ({ iconSource, hasBase = true }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  const handleOpenChange = (newopen) => {
    setOpen(newopen);
  };

  const onMouseEnterIcon = () => {
    setActive(true);
  };
  const onMouseLeaveIcon = () => {
    setActive(false);
  };

  return (
    <React.Fragment>
      {hasBase && (
        <div>
          <img src={Base} alt="" style={{ width: 70 }} />
          {active && (
            <div className="base-active">
              <img src={Active} alt="" />
            </div>
          )}
        </div>
      )}

      <div className="node-icon-title">{iconSource.name}</div>
      {hasBase ? (
        <Popover
          content={<NodeCard source={iconSource} />}
          trigger="hover"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <div
            className="node-icon"
            onMouseEnter={onMouseEnterIcon}
            onMouseLeave={onMouseLeaveIcon}
          >
            <img src={iconSource.url} alt="" />
          </div>
        </Popover>
      ) : (
        <div className="node-icon" onMouseEnter={onMouseEnterIcon} onMouseLeave={onMouseLeaveIcon}>
          <img src={iconSource.url} alt="" />
        </div>
      )}
    </React.Fragment>
  );
};

export default NodeIcon;
