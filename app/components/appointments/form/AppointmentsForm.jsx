import css from './AppointmentForm.styl';

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import CN from 'classnames';

import TextArea from 'TextArea/ElementTextArea';
import Button from 'Button/ElementButton';

import DatePicker from 'DatePicker/ElementDatePicker';
import TimePicker from 'TimePicker/ElementTimePicker';
import Select from 'Select/ElementSelect';

export default class AppointmentsForm extends Component {

  static propTypes = {
    direction: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    errors: PropTypes.object
  };

  static defaultProps = {
    direction: {},
    dispatch: () => {},
    params: {},
    errors: {}
  };

  state = {
    date: moment(),
    message: '',
    time: moment().format('HH:00'),
    repeats: 'never'
  };

  handleChange(event) {
    let lastState = this.state;

    lastState[event.target.name] = event.target.value;
    this.setState(lastState);
  }

  dateChange(date) {
    let lastState = this.state;

    lastState['date'] = date;
    this.setState(lastState);
  }

  timeChange(event) {
    let lastState = this.state;

    lastState['time'] = event.target.value;
    this.setState(lastState);
  }

  submitForm() {
    const { date, time } = this.state;
    const validDate = `${date.format('YYYY-MM-DD')} ${time}`;
    const params = {
      date: validDate,
      message: this.state.message,
      repeats: this.state.repeats,
      direction_id: this.props.direction.id
    };
    console.log(params);
    // const { user  } = this.props;
    //
    // let func;
    //
    // if (this.props.params && this.props.params.id) {
    //   func = updateDirection(user.nick, this.props.params.id, params);
    // }
    // else {
    //   func = createDirection(user.nick, params);
    // }
    //
    // this.props.dispatch(func);
  }

  render() {
    const repeats = [
      { title: 'Never', value: 'never' },
      { title: 'Every day', value: 'every_day' }
    ];
    const { date, time } = this.state;
    const { errors } = this.props;

    return (
      <div className={CN(css.appointmentForm)}>
        <form>
          <DatePicker selected={date} onChange={ this::this.dateChange } />
          <TimePicker defaultValue={time} onChange={ this::this.timeChange } />
          <Select
            classValue="repeats-field"
            ref="repeats"
            name="repeats"
            values={repeats}
            onChange={this::this.handleChange} />
         <TextArea
           classValue="message-field"
           ref="message"
           name="message"
           onChange={this::this.handleChange}
           value={this.state.message}
           error={errors.message} />
         <Button onClick={this::this.submitForm} color="blue" >Save</Button>
        </form>
      </div>
    );
  }
}
