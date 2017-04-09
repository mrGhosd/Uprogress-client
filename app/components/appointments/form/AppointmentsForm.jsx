import css from './AppointmentForm.styl';

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import CN from 'classnames';

import TextArea from 'TextArea/ElementTextArea';
import Button from 'Button/ElementButton';

import DatePicker from 'DatePicker/ElementDatePicker';
import TimePicker from 'TimePicker/ElementTimePicker';

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
    time: moment().format('HH:00')
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
    // const params = {
    //   title: this.state.title,
    //   description: this.state.description
    // };
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
    const { date, time } = this.state;
    const { errors } = this.props;

    return (
      <div className={CN(css.appointmentForm)}>
        <form>
          <DatePicker selected={date} onChange={ this::this.dateChange } />
          <TimePicker defaultValue={time} onChange={ this::this.timeChange } />
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
