import css from './ElementCheckBox.styl';
import React, { Component } from 'react';

export default class ElementCheckBox extends Component {

  static defaultProps = {
    name: '',
    onChange: (() => {})
  }

  static propTypes = {
    name: React.PropTypes.string,
    id: React.PropTypes.string,
    value: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    label: React.PropTypes.string
  }

  /**
   * Check if checkbox is checked
   * @return {Boolean} Is checkbox cheched?
   */
  value(newcheck) {
    if (typeof newcheck === 'boolean') {
      this.refs.checkbox.checked = newcheck;
    }
    return this.refs.checkbox.checked;
  }

  setOption(optionName, options) {
    if (this.props[optionName]) {
      options[optionName] = optionName;
    }
    return options;
  }


  /**
   * Render base element
   */
  render() {
    const name = this.props.name;
    const value = this.props.value;
    const id = this.props.id;
    const onChange = this.props.onChange;
    const checked = this.props.checked;

    let inputOptions = { type: 'checkbox', ref: 'checkbox', id, value, name, onChange };

    inputOptions = this.setOption('disabled', inputOptions);
    inputOptions = this.setOption('checked', inputOptions);
    
    return (
      <div className={css.CheckBox}>
        <input type="checkbox" name={name} checked={checked} onChange={onChange} />
      </div>
    );
  }
}
