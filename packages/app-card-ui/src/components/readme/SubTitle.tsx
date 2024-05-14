import React, { memo } from 'react';

const SubTitle = ({ title, subTitle, id = '', isRight = false }) => {
  return (
    <div className={isRight ? 'align-center' : 'mb-8'}>
      <div id={id} className={`text-bold fz-14 ${!isRight ? ' mb-8' : ''}`}>
        {title}
      </div>
      <div
        className={isRight ? 'ml-10 text-description color-gray' : 'color-gray text-description'}
      >
        {subTitle}
      </div>
    </div>
  );
};

export default memo(SubTitle);
