import { Icon } from '@alicloud/console-components';
import React, { memo } from 'react';

const ExternalLink = ({
  label,
  url,
  icon = true,
  className = '',
  self = false,
  noSpm = false,
  handelClick = () => {},
}) => {
  const attributes = noSpm ? { 'data-spm-protocol': 'i' } : {};
  return (
    <a
      className={className}
      {...attributes}
      href={url}
      onClick={() => {
        return handelClick();
      }}
      target={self ? '_self' : '_blank'}
      rel="noopener noreferrer"
    >
      <span style={{ wordBreak: 'break-all' }}>{label}</span>
      {icon && (
        <span className="ml-5">
          <Icon type="external-link" size="xs" />
        </span>
      )}
    </a>
  );
};

export default memo(ExternalLink);
