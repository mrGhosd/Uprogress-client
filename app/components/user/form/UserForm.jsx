import css from './UserForm.styl';

import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import CN from 'classnames';

import { uploadImage, updateUser } from 'actions/users';

import TextField from 'TextField/ElementTextField';
import TextArea from 'TextArea/ElementTextArea';
import Image from 'Image/ElementImage';
import Button from 'Button/ElementButton';

export default class UserForm extends Component {

  state = {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      attachment: {}
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
    if (this.props.user.attachment !== null) {
      this.setState({ user: { attachment: this.props.user.attachment } });
    }

    if (props.user) {
      this.setState({ user: props.user });
    }
  }

  handleChange(event) {
    let lastState = this.state.user;

    lastState[event.target.name] = event.target.value;
    this.setState({ user: lastState });
  }

  onDrop(files) {
    const params = {
      attachableType: 'User',
      file: files.first
    };

    this.props.dispatch(uploadImage(params));
  }

  submitForm() {
    this.props.dispatch(updateUser(this.state.user.id, this.state.user));
  }

  showImage(user) {
    let template;

    if (user.attachment) {
      template = <Image size={200} className="avatar-image" src={user.attachment.url} />;
    }
    else {
      template = <div>Try dropping some files here, or click to select files to upload.</div>;
    }

    return template;
  }

  render() {
    let { user } = this.state;
    const image = this.showImage(user);

    return (
      <div className={CN(css.userForm)}>
        <div className="user-avatart">
          <Dropzone onDrop={this::this.onDrop}>
            {image}
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
