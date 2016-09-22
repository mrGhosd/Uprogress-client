import './ElementLabel.styl';

import { Label as labelClassName } from './ElementLabel.styl';
import React, { Component } from 'react';

export default class ElementLabel extends Component {

  static defaultProps = {
    htmlFor: ''
  }

  static propTypes = {
    htmlFor: React.PropTypes.string,
    children: React.PropTypes.any
  }

  render() {
    const children = this.props.children;
    let label = null;

    if (children) {
      const labelOptions = {
        htmlFor: this.props.htmlFor,
        className: labelClassName
      };

      label = <label {...labelOptions}>{children}</label>;
    }

    return label;
  }
}
