import css from './SignPage.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';
import { connect } from 'react-redux';
import Loader from 'react-loader';

// import { restorePassword } from 'actions/users';

import TextField from 'TextField/ElementTextField';
import Button from 'Button/ElementButton';
import PopupNotifications from 'popup_notifications/list/PopupNotificationsList';

class ResetPassword extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    dispatch: PropTypes.func,
    errors: PropTypes.object,
    loader: PropTypes.bool
  };

  static defaultProps = {
    dispatch: () => {},
    errors: {},
    loader: true
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
    const token = this.props.location.query.reset;

    console.log(token);
    // this.props.dispatch(restorePassword(user));
  }

  render() {
    const { user } = this.state;
    const { loader, errors } = this.props;

    return (
      <div className={CN(css.signPage, 'Card')}>
        <Loader loaded={loader} />
        <p>Enter new password here</p>
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
    errors: state.users.restorePasswordErrors,
    loader: state.loaders.main
  };
}

export default connect(mapStateToProps)(ResetPassword);
