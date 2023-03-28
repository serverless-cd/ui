import React from 'react';
import AppArchitectureContent from './components/AppArchitectureContent';
import AppArchitectureItem from './components/AppArchitectureItem';
import AppArchitecture from './components/Architecture';
import { AppArchitectureProps } from './types';

class AppArchitectureUi extends React.Component<AppArchitectureProps> {
  static Item = AppArchitectureItem;
  static Content = AppArchitectureContent;

  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    return <AppArchitecture {...this.props} />;
  }
}

export default AppArchitectureUi;
