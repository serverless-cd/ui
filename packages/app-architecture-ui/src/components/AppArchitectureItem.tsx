import cx from 'classnames';
import React from 'react';
import '../index.less';
import { AppArchitectureItemProps } from '../types';
import AppArchitectureIcon from './AppArchitectureIcon';

const AppArchitectureItem = (props: AppArchitectureItemProps) => {
  const {
    _key,
    maxColCount,
    label,
    icon,
    disabled = false,
    active = false,
    isControlled,
    selectedKey,
    setSelectedKey,
    onChange,
    children,
    component,
  } = props;

  const innerClassNames = cx({
    architecture_item_wrapper: true,
    architecture_item_wrapper_disabled: disabled,
    architecture_item_wrapper_active: active,
    architecture_item_wrapper_selected: selectedKey === _key,
    architecture_item_wrapper_wide: children,
  });

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (disabled) return;

    if (!isControlled) {
      setSelectedKey?.(_key);
    }

    onChange?.(_key);
  };

  return (
    <div
      className={children ? 'architecture_item_wrapper_parrent' : 'architecture_item_wrapper_leaf'}
      onClick={handleClick}
    >
      <div className={innerClassNames}>
        {icon && (
          <div className="architecture_item_icon">
            <AppArchitectureIcon icon={icon} />
          </div>
        )}
        <div className="architecture_item_text">{label}</div>
        {component && <div className="architecture_item_component">{component}</div>}
      </div>

      {children && (
        <div className="architecture_item_children" style={{ maxWidth: maxColCount * 170 }}>
          {children}
        </div>
      )}
    </div>
  );
};
export default AppArchitectureItem;
