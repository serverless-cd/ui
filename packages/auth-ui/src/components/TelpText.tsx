import { isEmpty } from 'lodash';
import React, { memo } from 'react';
import ExternalLink from './ExternalLink';

interface LinkConfig {
  label: string;
  url: string;
}

interface IProps {
  text?: string | any;
  linkConfig?: LinkConfig;
}

const TelpText = (props: IProps) => {
  const { text, linkConfig = {} as LinkConfig } = props;
  return (
    <>
      <span
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      ></span>
      {!isEmpty(linkConfig) && <ExternalLink label={linkConfig.label} url={linkConfig.url} />}
    </>
  );
};

export default memo(TelpText);
