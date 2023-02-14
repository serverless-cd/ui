import React, { Component } from 'react';
import Readme from './components/readme';
import AppCard from './components/app-card';
import './style/index.less';
import { IAppCardProps } from './types';
export * from './types';

export default class AppCardUI extends Component<IAppCardProps> {
  static Readme = Readme;
  render() {
    return <AppCard {...this.props} />;
  }
}
