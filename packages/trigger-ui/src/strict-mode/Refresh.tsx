import React from 'react';
import { Icon } from '@alicloud/console-components';
import { noop } from 'lodash';
import '../index.less';

const Refresh = (props) => {
  const { style, onRefresh = noop } = props;

  return (
    <Icon
      type="refresh"
      onClick={onRefresh}
      size={'small'}
      className="trigger-matching-refresh-icon"
      style={style}
    />
  );
};

export default Refresh;
