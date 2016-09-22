import css from './ElementTextField.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';

import Label from 'Label/ElementLabel';
import { StripSpecialSymbols } from 'utils/CommonUtils';

export default class ElementTextField extends Component {

  state = {
    value: ''
  };

  static propTypes = {
    name: PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    error: React.PropTypes.any,
    value: React.PropTypes.string,
    label: PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]),
    placeholder: React.PropTypes.string
  }

  static defaultProps = {
    name: '',
    onChange: () => {},
    type: 'text',
    error: false,
    value: '',
    placeholder: '',
    label: '',
  }

  componentDidMount() {
    this.value(this.props.value);
  }

  value(newVal) {
    if (typeof newVal !== 'undefined') {
      this.refs.input.value = newVal;
    }
    return this.refs.input.value;
  }

  getError() {
    const error = this.props.error;

    if (error) {
      return (
        <div className="errors-list">
          {error.map((err, index) => {
            return <p key={index} className="error">{err === true ? comment : err}</p>;
          })
        }
        </div>
      );
    }
  }

  render() {
    const name = this.props.name;
    const id = StripSpecialSymbols(name);
    const listener = this.props.onChange;
    const type = this.props.type;
    const placeholder = this.props.placeholder;
    const value = this.props.value;
    let error = this.getError();

    return (
      <div className={CN(css.textField)}>
        <Label htmlFor={id}>{this.props.label}</Label>
        <input name={name} ref="input" type={type}
          placeholder={placeholder} onChange={listener} value={value}/>
        {error}
      </div>
    );
  }
}
