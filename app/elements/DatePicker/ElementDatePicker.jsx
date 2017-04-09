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
    error: React.PropTypes.any,
    startDate: PropTypes.any,
    selected: PropTypes.any,
    placeholder: PropTypes.string,
    dateFormat: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    error: false,
    startDate: moment(),
    selected: moment(),
    placeholder: '',
    dateFormat: 'DD.MM.YYYY',
    onChange: () => {}
  };

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
    let { startDate, placeholder, selected, dateFormat, onChange } = this.props;
    let error = this.getError();

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
        {error}
      </div>
    );
  }
}
