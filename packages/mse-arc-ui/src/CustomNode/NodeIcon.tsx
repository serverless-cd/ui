import React, { useState } from 'react';
import { Popover } from 'antd';
import NodeCard from './NodeCard';
import './index.less';

const Base =
  'https://img.alicdn.com/imgextra/i2/O1CN01uk4pyc1Hf7Jj1MMc9_!!6000000000784-55-tps-72-49.svg';
const Active =
  'https://img.alicdn.com/imgextra/i1/O1CN01xf1t2a1QDTxbMruxa_!!6000000001942-55-tps-60-30.svg';

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
        <div className="node-base">
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
