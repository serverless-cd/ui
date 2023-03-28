import { isEmpty } from 'lodash';
import React, { Children, cloneElement, ReactNode, useEffect, useState } from 'react';
import '../index.less';
import { AppArchitectureItemProps, AppArchitectureProps } from '../types';
import AppArchitectureItem from './AppArchitectureItem';

const AppArchitecture = (props: AppArchitectureProps) => {
  const {
    label,
    maxColCount = 2,
    value = [],
    children,
    defaultSelectedKey = ' ',
    selectedKey: selectedKeyControlled,
    onChange,
  } = props;
  const [selectedKey, setSelectedKey] = useState(selectedKeyControlled || defaultSelectedKey);

  useEffect(() => {
    setSelectedKey(selectedKeyControlled || defaultSelectedKey);
  }, [selectedKeyControlled, defaultSelectedKey]);

  const renderByChildren = () => {
    const loop = (children: ReactNode, props: AppArchitectureProps) => {
      return Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return;
        }

        const { props: childProps, key } = child;

        const _props = {
          ...childProps,
          _key: key,
          maxColCount,
          isControlled: !!selectedKeyControlled,
          selectedKey,
          setSelectedKey,
          onChange,
        };

        if (child.props.children) {
          _props.children = loop(child.props.children, _props);
        }

        const node = cloneElement(child, _props);
        return node;
      });
    };

    return loop(children, props);
  };

  const renderItemNode = (childNodes: ReactNode, props: AppArchitectureItemProps) => {
    return <AppArchitectureItem {...props}>{childNodes}</AppArchitectureItem>;
  };

  const renderByDataSource = () => {
    const drill = (data: Array<any>) => {
      return data.map((item, index) => {
        const { key, children, ...others } = item;
        const props = {
          ...others,
          _key: key,
          maxColCount,
          isControlled: !!selectedKeyControlled,
          selectedKey,
          setSelectedKey,
          onChange,
        };

        if (children && children.length) {
          props.children = drill(children);
        }

        const node = renderItemNode(props.children, props);
        return node;
      });
    };

    return drill(value);
  };

  const renderContent = () => {
    const contentChildren: Array<ReactNode> = [];
    Children.forEach(children, (child) => {
      const active = selectedKey == child.key;
      if (child?.type?.name === 'AppArchitectureContent') {
        contentChildren.push(
          React.cloneElement(child, {
            active,
          }),
        );
      }
    });

    return contentChildren;
  };

  return (
    <div className="architecture">
      <div className="architecture_wrapper">
        <div className="architecture_header">{label}</div>
        <div className="architecture_body">
          {children && isEmpty(value) && <div>{renderByChildren()}</div>}
          {!isEmpty(value) && renderByDataSource()}
        </div>
      </div>
      <div className="architecture_content">{renderContent()}</div>
    </div>
  );
};
export default AppArchitecture;
