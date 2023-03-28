import React from 'react';

type IContent = {
  active: boolean;
  title: string;
  children?: React.ReactNode;
};

const AppArchitectureContent = (props: IContent) => {
  const { active, title, children } = props;

  return (
    <>
      {active && title && <div className="architecture_header">{title}</div>}
      {active && children}
    </>
  );
};

export default AppArchitectureContent;
