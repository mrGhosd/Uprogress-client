import React, { Component, PropTypes } from 'react';

import moment from 'moment';
import Select from 'Select/ElementSelect';

export default class ElementTimePicker extends Component {

  state = {
    open: false
  }

  static propTypes = {
    error: React.PropTypes.any,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func
  };

  static defaultProps = {
    error: false,
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
    const fullTime = this.timeValues();
    const error = this.getError();
    let { defaultValue, onChange } = this.props;

    if (!defaultValue) {
      defaultValue = moment().format('HH:00');
    }

    return (
      <div>
        <Select
          defaultValue={defaultValue}
          ref="scope"
          name="scope"
          values={fullTime}
          onChange={onChange} />
        {error}
      </div>
    );
  }
}
