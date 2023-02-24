import React from 'react';
import { TriggersProps } from './types';
import Trigger from './TriggerContent';
import Preview from './TriggerPreview';

class TriggerUi extends React.Component<TriggersProps> {
  triggerUiRef: any;

  static Preview = Preview;

  constructor(props) {
    super(props);
    this.triggerUiRef = React.createRef();
  }

  validate = () => this.triggerUiRef.current.validate();

  render(): React.ReactNode {
    return <Trigger {...this.props} ref={this.triggerUiRef} />;
  }
}

export default TriggerUi;
