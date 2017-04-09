import React, { Component, PropTypes } from 'react';

import moment from 'moment';
import Select from 'Select/ElementSelect';

export default class ElementTimePicker extends Component {

  state = {
    open: false
  }

  static propTypes = {
    defaultValue: PropTypes.any,
    onChange: PropTypes.func
  };

  static defaultProps = {
    defaultValue: moment().format('HH:00'),
    selected: moment(),
    placeholder: '',
    onChange: () => {}
  };

  hourValue(hour) {
    return String(hour).length > 1 ? hour : `0${hour}`;
  }

  timeValues() {
    let arr = [];

    for (let value = 0; value < 24; value++) {
      const fullTime = `${this.hourValue(value)}:00`;

      arr.push({ title: fullTime, value: fullTime });
    }
    return arr;
  }

  render() {
    const fullTime = this.timeValues();
    let { defaultValue, onChange } = this.props;

    if (!defaultValue) {
      defaultValue = moment().format('HH:00');
    }

    return (
      <Select
        defaultValue={defaultValue}
        ref="scope"
        name="scope"
        values={fullTime}
        onChange={onChange} />
    );
  }
}
