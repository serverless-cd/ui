import React, { memo } from 'react';
import { Balloon, Icon } from '@alicloud/console-components';

const TextWithBalloon = ({ text, tips, color = '', iconColor = '', align = 't' }) => {
  return (
    <>
      <span className={`mr-5 ${color}`}>{text}</span>
      <Balloon
        cache
        align={
          align as 't' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'bl' | 'br' | 'lt' | 'lb' | 'rt' | 'rb'
        }
        trigger={<Icon size="xs" type="help" className={`fc-help-icon ${iconColor}`} />}
        closable={false}
      >
        <span dangerouslySetInnerHTML={{ __html: tips }}></span>
      </Balloon>
    </>
  );
};

export default memo(TextWithBalloon);
