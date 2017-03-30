import css from './UserForm.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';

import { uploadImage, updateUser } from 'actions/users';
import { setByExistedParams } from 'utils/CommonUtils';

import TextField from 'TextField/ElementTextField';
import TextArea from 'TextArea/ElementTextArea';
import Image from 'Image/ElementImage';
import Button from 'Button/ElementButton';
import FileUploader from 'FileUploader/ElementFileUploader';

export default class UserForm extends Component {

  state = {
    user: {}
  };

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    user: {},
    dispatch: () => {}
  };

  componentWillMount() {
    this.handleUserInfo(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleUserInfo(props);
  }

  handleUserInfo(props) {
    if (props.user.attachment !== null) {
      this.setState({ user: { attachment: props.user.attachment } });
    }

    this.parseUserData(props);
  }

  parseUserData(props) {
    if (props.user) {
      const prevState = this.state;
      const user = setByExistedParams(props.user);

      prevState.user = user;
      this.setState(prevState);
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
          <FileUploader className="uploader" onDrop={this::this.onDrop}>
            {image}
          </FileUploader>
        </div>
        <div className="user-fields">
          <TextField ref="firstName"
             name="firstName"
             label="First name"
             onChange={this::this.handleChange}
             value={user.firstName} />
          <TextField ref="lastName"
             name="lastName"
             label="Last name"
             onChange={(event) => this.handleChange(event)}
             value={user.lastName} />
          <TextField
            ref="email"
             name="email"
             label="Email"
             onChange={(event) => this.handleChange(event)}
             value={user.email} />
          <TextArea
             ref="description"
             name="description"
             label="Description"
             onChange={(event) => this.handleChange(event)}
             value={user.description} />
          <TextField
             ref="location"
             name="location"
             label="Location"
             onChange={(event) => this.handleChange(event)}
             value={user.location} />
          <Button color="blue" onClick={this::this.submitForm}>Save</Button>
        </div>
      </div>
    );
  }
}
