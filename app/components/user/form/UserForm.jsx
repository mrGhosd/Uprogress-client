import css from './UserForm.styl';

import React, { Component, PropTypes } from 'react';

import Dropzone from 'react-dropzone';
import CN from 'classnames';

import TextField from 'TextField/ElementTextField';
import TextArea from 'TextArea/ElementTextArea';
import Button from 'Button/ElementButton';

export default class UserForm extends Component {

  state = {
    user: {
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    user: {},
    dispatch: () => {}
  };

  componentWillReceiveProps(props) {
    this.setState({ user: props.user });
  }

  handleChange(event) {
    let lastState = this.state.user;

    lastState[event.target.name] = event.target.value;
    this.setState({ user: lastState });
  }

  onDrop(files) {
    console.log(files);
  }

  submitForm() {

  }

  render() {
    let { user } = this.state;

    return (
      <div className={CN(css.userForm)}>
        <div className="user-avatart">
          <Dropzone onDrop={this.onDrop}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </div>
        <div className="user-fields">
          <TextField ref="firstName"
           name="firstName"
           label="First name"
           onChange={(event) => this.handleChange(event)}
           value={user.firstName} />
         <TextField ref="lastName"
            name="lastName"
            label="Last name"
            onChange={(event) => this.handleChange(event)}
            value={user.lastName} />
          <TextField ref="email"
             name="email"
             label="Email"
             onChange={(event) => this.handleChange(event)}
              value={user.email} />
            <Button color="blue" onClick={this::this.submitForm}>Save</Button>
        </div>
      </div>
    );
  }
}
