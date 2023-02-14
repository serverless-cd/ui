import React from 'react';
import { Button } from '@alicloud/console-components';
import { isEmpty } from 'lodash';

export default function ExternalLinkInButton({ url, text }) {
  if (isEmpty(url)) {
    return null;
  }
  return (
    <Button
      type="normal"
      className="mr-8"
      onClick={() => {
        window.open(url);
      }}
    >
      <div className="align-center">
        <span className="mr-5">{text}</span>
        <i className="next-icon next-icon-external-link next-xs"></i>
      </div>
    </Button>
  );
}
