
import css from './ElementSelect.styl';
import React, { Component } from 'react';
import { StripSpecialSymbols } from 'utils/CommonUtils';

import Label from 'elements/Label/ElementLabel';


export default class ElementSelect extends Component {

  optionsGroupId = 0;

  static defaultProps = {
    defaultValue: '',
    name: '',
    size: 1,
    values: [],
    onChange: (() => {})
  };

  static propTypes = {
    defaultValue: React.PropTypes.string,
    name: React.PropTypes.string,
    size: React.PropTypes.number,
    placeholder: React.PropTypes.string,
    values: React.PropTypes.array,
    label: React.PropTypes.string,
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func
  };

  /**
   * Render option-group
   * @param  {Object} listItem     { title: String, list: [Value] }
   */
  renderList(listItem) {
    return (
      <optgroup label={listItem.title} key={this.optionsGroupId++}>
        {listItem.list.map((item) => this.renderValue(item))};
      </optgroup>
    );
  }


  /**
   * Render select item
   * @param  {Object} item     { title: String, value: Mixed }
   */
  renderValue(item) {
    let keys = {};
    
    if (item.disabled) {
      keys.disabled = 'disabled';
    }
    return <option value={item.value} key={item.value} {...keys}>{item.title}</option>;
  }

  /**
   * ADD DESCRIPTION!
   * @param {[type]} values [description]
   */
  addPlaceholder(values) {
    if (this.props.placeholder) {
      values.unshift({ value: '0', title: this.props.placeholder });
    }
    return values;
  }

  /**
   * Render component
   */
  render() {
    let name = this.props.name;
    let size = this.props.size;
    let id = StripSpecialSymbols(name);
    let required = this.props.required;
    let disabled = this.props.disabled;
    let values = this.props.values;
    const defaultValue = this.props.defaultValue;
    const onChange = this.props.onChange;

    values = this.addPlaceholder(values);

    return (
      <div className={css.Select}>
        <Label htmlFor={id}>{this.props.label}</Label>
        <select name={name} {...{ id, size, required, disabled, onChange, defaultValue }}>
          {values.map((item) => {
            if (item.value) {
              return this.renderValue(item);
            }
            else if (item.list) {
              return this.renderList(item);
            }

            return '';
          })}
        </select>
      </div>
    );
  }
}
