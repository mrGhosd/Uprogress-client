import React, { Component, PropTypes } from 'react';
import CN from 'classnames';
import { connect } from 'react-redux';
import Loader from 'react-loader';

import { changePassword } from 'actions/users';

import TextField from 'TextField/ElementTextField';
import Button from 'Button/ElementButton';
import PopupNotifications from 'popup_notifications/list/PopupNotificationsList';

class UserSecurity extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    dispatch: PropTypes.func,
    errors: PropTypes.object,
    loader: PropTypes.bool,
    location: PropTypes.object
  };

  static defaultProps = {
    dispatch: () => {},
    errors: {},
    loader: true,
    location: {}
  };

  state = {
    user: {
      password: '',
      password_confirmation: ''
    }
  }

  handleChange(event) {
    let lastState = this.state.user;

    lastState[event.target.name] = event.target.value;
    this.setState({ user: lastState });
  }

  submitForm() {
    const user = this.state.user;

    this.props.dispatch(changePassword(user));
  }

  render() {
    const { user } = this.state;
    const { loader, errors } = this.props;

    return (
      <div className={CN('Card')}>
        <Loader loaded={loader} />
        <p>Password</p>
        <form>
          <TextField ref="password"
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={this::this.handleChange} error={errors.password} />
          <TextField ref="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            placeholder="Password Confirmation"
            value={user.passwordConfirmation}
            onChange={this::this.handleChange} error={errors.passwordConfirmation} />
          <Button onClick={this::this.submitForm} color="blue">Reset password</Button>
        </form>
        <PopupNotifications />
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
    errors: state.users.changePasswordErrors,
    loader: state.loaders.main
  };
}

export default connect(mapStateToProps)(UserSecurity);
