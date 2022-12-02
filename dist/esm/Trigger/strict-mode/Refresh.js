import React from 'react';
import { Icon } from '@alicloud/console-components';
import { noop } from 'lodash';
import '../index.less';

var Refresh = function Refresh(props) {
  var style = props.style,
    _props$onRefresh = props.onRefresh,
    onRefresh = _props$onRefresh === void 0 ? noop : _props$onRefresh;
  return /*#__PURE__*/ React.createElement(Icon, {
    type: 'refresh',
    onClick: onRefresh,
    size: 'small',
    className: 'trigger-matching-refresh-icon',
    style: style,
  });
};

export default Refresh;
