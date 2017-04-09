import css from './ElementDatePicker.styl';
import textFieldCss from 'TextField/ElementTextField.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';
import moment from 'moment';

import DatePicker from 'react-datepicker';

export default class ElementDatePicker extends Component {
  handleChange(date) {
    this.setState({ startDate: date });
  }

  static propTypes = {
    startDate: PropTypes.any,
    selected: PropTypes.any,
    placeholder: PropTypes.string,
    dateFormat: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    startDate: moment(),
    selected: moment(),
    placeholder: '',
    dateFormat: 'DD.MM.YYYY',
    onChange: () => {}
  };


  render() {
    let { startDate, placeholder, selected, dateFormat, onChange } = this.props;

    if (!selected) {
      selected = moment();
    }

    return (
      <div className={CN(css.datePicker, textFieldCss.textField)}>
        <DatePicker
          minDate={startDate}
          placeholderText={placeholder}
          dateFormat={dateFormat}
          selected={selected}
          onChange={onChange} />
      </div>
    );
  }
}
