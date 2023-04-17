import React from 'react';
import './iconfont';

type IIcon = {
  icon: string | React.ReactNode;
};

const AppArchitectureIcon = (props: IIcon) => {
  const { icon } = props;

  return (
    <>
      {typeof icon === 'string' && (
        <svg
          style={{
            width: 32,
            height: 32,
            fill: 'currentColor',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          <use xlinkHref={`#icon${icon}`} />
        </svg>
      )}
      {React.isValidElement(icon) && icon}
    </>
  );
};

export default AppArchitectureIcon;
