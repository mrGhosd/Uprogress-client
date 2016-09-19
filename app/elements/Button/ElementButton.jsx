
import css from './ElementButton.styl';
import React, { Component } from 'react';
import CN from 'classnames';

import Svgo from 'SVGIcon/SVGIcon';

export default class ElementButton extends Component {

  static propTypes = {
    onClick: React.PropTypes.func,
    type: React.PropTypes.string,
    color: React.PropTypes.string,
    size: React.PropTypes.string,
    height: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    children: React.PropTypes.any
  };

  static defaultProps = {
    type: 'button',
    onClick: (() => {}),
    disabled: false,
    loading: false,
    color: '',
    size: '',
    children: null,
    height: 'fixed'
  };

  onClick(event) {
    if ((!this.props.loading && !this.props.disabled)) {
      this.props.onClick(event);
    }
  }

  setClassNameOf(buttonAttibuteName) {
    let className = '';

    if (this.props[buttonAttibuteName]) {
      className = `${buttonAttibuteName}-${this.props[buttonAttibuteName]}`;
    }

    return className;
  }

  render() {
    const type = this.props.type;
    const color = this.setClassNameOf('color');
    const size = this.setClassNameOf('size');
    const height = this.setClassNameOf('height');

    const buttonOptions = {
      type,
      className: CN(css.Button, color, size, height, { Disabled: this.props.disabled })
    };

    return (
      <button {...buttonOptions} onClick={this::this.onClick}>
        {this.props.loading ? <Svgo icon="icon__loading" /> : this.props.children}
      </button>
    );
  }
}
