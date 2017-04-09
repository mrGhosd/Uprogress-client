import React, { Component, PropTypes } from 'react';

import TextField from 'TextField/ElementTextField';
import TextArea from 'TextArea/ElementTextArea';
import Button from 'Button/ElementButton';

import DatePicker from 'DatePicker/ElementDatePicker';

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
    date: '',
    message: ''
  };

  handleChange(event) {
    let lastState = this.state;

    lastState[event.target.name] = event.target.value;
    this.setState(lastState);
  }

  dateChange(date) {
    this.setState({ date });
    // console.log(date.format('YYYY-MM-DD'));
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
    const { date } = this.state;
    const { errors } = this.props;

    return (
      <div>
        <form>
          <DatePicker selected={date} onChange={ this::this.dateChange } />
         <TextArea ref="description"
           name="description"
           onChange={(event) => this.handleChange(event)}
           value={this.state.message}
           error={errors.message} />
         <Button onClick={this::this.submitForm} color="blue" >Save</Button>
        </form>
      </div>
    );
  }
}
