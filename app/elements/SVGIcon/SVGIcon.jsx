import React, { Component } from 'react';
import 'images/sprite.svg';

export default class ElementSvgIcon extends Component {

  static propTypes = {
    icon: React.PropTypes.string.isRequired
  }

  render() {
    let icon = `<use xlink:href="/images/sprite.svg#${this.props.icon}" />`;

    return (<svg dangerouslySetInnerHTML={{ __html: icon }} />);
  }
}
