import css from './ElementTextArea.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';

export default class ElementTextArea extends Component {
  static propTypes = {
    name: PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    error: React.PropTypes.any,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string
  }

  static defaultProps = {
    name: '',
    onChange: () => {},
    type: 'text',
    error: false,
    value: '',
    placeholder: ''
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
    const listener = this.props.onChange;
    const value = this.props.value;
    const error = this.getError();

    return (
      <div className={CN(css.textField)}>
        <textarea name={name} ref="textarea" rows="3"
        placeholder={this.props.placeholder} value={value} onChange={listener}/>
      {error}
      </div>
    );
  }
}
