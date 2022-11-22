import React, { memo } from 'react';
import { Balloon, Icon } from '@alicloud/console-components';

var TextWithBalloon = function TextWithBalloon(_ref) {
  var text = _ref.text,
    tips = _ref.tips,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? '' : _ref$color,
    _ref$iconColor = _ref.iconColor,
    iconColor = _ref$iconColor === void 0 ? '' : _ref$iconColor,
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? 't' : _ref$align;
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(
      'span',
      {
        className: 'mr-5 '.concat(color),
      },
      text,
    ),
    /*#__PURE__*/ React.createElement(
      Balloon,
      {
        cache: true,
        align: align,
        trigger: /*#__PURE__*/ React.createElement(Icon, {
          size: 'xs',
          type: 'help',
          className: 'fc-help-icon '.concat(iconColor),
        }),
        closable: false,
      },
      /*#__PURE__*/ React.createElement('span', {
        dangerouslySetInnerHTML: {
          __html: tips,
        },
      }),
    ),
  );
};

export default /*#__PURE__*/ memo(TextWithBalloon);
