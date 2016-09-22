import React, { Component } from 'react';

export default class ElementImage extends Component {
  static defaultProps = {
    height: 50,
    width: 50,
    className: '',
    src: ''
  }

  static propTypes = {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    className: React.PropTypes.string,
    src: React.PropTypes.string
  }

  render() {
    const { height, width, className, src } = this.props;

    return (
      <div>
        <img src={src} height={height} width={width} className={className} />
      </div>
    );
  }
}
