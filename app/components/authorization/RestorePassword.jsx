import css from './SignPage.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';
import { connect } from 'react-redux';
import Loader from 'react-loader';

import { restorePassword } from 'actions/users';

import TextField from 'TextField/ElementTextField';
import Button from 'Button/ElementButton';
import PopupNotifications from 'popup_notifications/list/PopupNotificationsList';

class RestorePassword extends Component {
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
      email: ''
    }
  }

  handleChange(event) {
    let lastState = this.state.user;

    lastState[event.target.name] = event.target.value;
    this.setState({ user: lastState });
  }

  submitForm() {
    const user = this.state.user;

    this.props.dispatch(restorePassword(user));
  }

  render() {
    const { user } = this.state;
    const { loader, errors } = this.props;

    return (
      <div className={CN(css.signPage, 'Card')}>
        <Loader loaded={loader} />
        <p>Mail with link will be sended to your email.</p>
        <form>
          <TextField ref="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={this::this.handleChange} error={errors.email} />
          <Button onClick={this::this.submitForm} color="blue">Restore password</Button>
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

export default connect(mapStateToProps)(RestorePassword);
