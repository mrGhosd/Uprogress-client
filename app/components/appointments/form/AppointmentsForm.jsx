import css from './AppointmentForm.styl';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CN from 'classnames';

import { createAppointment } from 'actions/appointments';

import TextArea from 'TextArea/ElementTextArea';
import Button from 'Button/ElementButton';

import DatePicker from 'DatePicker/ElementDatePicker';
import TimePicker from 'TimePicker/ElementTimePicker';
import Select from 'Select/ElementSelect';

export class AppointmentsForm extends Component {

  static propTypes = {
    direction: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    errors: PropTypes.object,
    appointments: PropTypes.array
  };

  static defaultProps = {
    direction: {},
    dispatch: () => {},
    params: {},
    errors: {},
    appointments: []
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
    const formattedDate = `${date.format('YYYY-MM-DD')} ${time}:00`;
    const params = {
      date: moment(formattedDate).format('YYYY-MM-DD HH:mm ZZ'),
      message: this.state.message,
      repeats: this.state.repeats,
      direction_id: this.props.direction.id
    };
    
    this.props.dispatch(createAppointment(params));
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
          <DatePicker
            selected={date}
            onChange={ this::this.dateChange }
            error={errors.date} />
          <TimePicker
            defaultValue={time}
            onChange={ this::this.timeChange }
            error={errors.date} />
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

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return {
    appointments: state.appointments.list,
    errors: state.appointments.errors
  };
}

export default connect(mapStateToProps)(AppointmentsForm);
