import css from './ElementTextArea.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';

import Label from 'elements/Label/ElementLabel';
import { StripSpecialSymbols } from 'utils/CommonUtils';

export default class ElementTextArea extends Component {
  static propTypes = {
    name: PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    error: React.PropTypes.any,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    label: React.PropTypes.string
  }

  static defaultProps = {
    name: '',
    onChange: () => {},
    type: 'text',
    error: false,
    value: '',
    placeholder: '',
    label: ''
  }

  componentDidMount() {
    this.value(this.props.value);
  }

  value(newVal) {
    if (typeof newVal !== 'undefined') {
      this.refs.textarea.value = newVal;
    }
    return this.refs.textarea.value;
  }

  getError() {
    const error = this.props.error;

    if (error) {
      return <span className="error">{error === true ? comment : error}</span>;
    }
  }

  render() {
    const name = this.props.name;
    const id = StripSpecialSymbols(name);
    const listener = this.props.onChange;
    const value = this.props.value;
    const error = this.getError();

    return (
      <div className={CN(css.textArea)}>
        <Label htmlFor={id}>{this.props.label}</Label>
        <textarea name={name} ref="textarea" rows="3"
        placeholder={this.props.placeholder} value={value} onChange={listener}/>
      {error}
      </div>
    );
  }
}
