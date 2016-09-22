import css from './ElementImage.styl';

import CN from 'classnames';
import React, { Component } from 'react';

export default class ElementImage extends Component {
  static defaultProps = {
    height: 50,
    width: 50,
    size: 50,
    className: '',
    src: ''
  }

  static propTypes = {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    size: React.PropTypes.number,
    className: React.PropTypes.string,
    src: React.PropTypes.string
  }

  render() {
    const { size, className, src } = this.props;

    return (
      <div className={CN(css.elementImage)}>
        <img src={src} height={size} width={size} className={className} />
      </div>
    );
  }
}
