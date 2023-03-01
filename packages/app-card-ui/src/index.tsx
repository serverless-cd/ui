import React, { FC, Component } from 'react';
import Readme, { Props } from './components/readme';
import AppCard from './components/app-card';
import './style/index.less';
import { IAppCardProps } from './types';
export * from './types';

export default class AppCardUI extends Component<IAppCardProps> {
  static Readme: FC<Props> = Readme;
  render() {
    return <AppCard {...this.props} />;
  }
}
