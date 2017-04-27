import css from './UserNotification.styl';
import React, { Component, PropTypes } from 'react';
import CN from 'classnames';

import { connect } from 'react-redux';
import Loader from 'react-loader';

import { loadUserNotification, updateUserNotification } from 'actions/users';

import CheckBox from 'CheckBox/ElementCheckBox';
import Button from 'Button/ElementButton';

export class UserNotification extends Component {

  state = {
    setting: {
      pushEnabled: false,
      mailEnabled: false
    }
  }

  static propTypes = {
    errors: PropTypes.object,
    setting: PropTypes.object,
    dispatch: PropTypes.func,
    loader: PropTypes.bool,
    currentUser: PropTypes.object
  };

  static defaultProps = {
    setting: {},
    dispatch: () => {},
    loader: true,
    currentUser: {},
    errors: {}
  }

  componentWillMount() {
    this.props.dispatch(loadUserNotification(this.props.currentUser.id));
  }

  componentWillReceiveProps(props) {
    if (!props.setting.isEmpty) {
      let prevState = this.state;

      prevState = {
        setting: props.setting
      };
      this.setState(prevState);
    }
  }

  handleChanges(event) {
    let lastState = this.state.setting;

    lastState[event.target.name] = event.target.checked;
    this.setState(lastState);
  }

  submitForm() {
    const { setting } = this.state;

    this.props.dispatch(
      updateUserNotification(setting.userId, setting.id, setting)
    );
  }

  render() {
    const { setting } = this.state;
    const { loader } = this.props;

    return (
      <div className={CN(css.userNotification)}>
        <Loader loaded={loader} />
          <div className="setting-item">
            <CheckBox name="pushEnabled"
              checked={setting.pushEnabled}
              onChange={this::this.handleChanges} />
            <p>Receive notifications via mobile pushes</p>
          </div>

          <div className="setting-item">
            <CheckBox name="mailEnabled"
              checked={setting.mailEnabled}
              onChange={this::this.handleChanges} />
            <p>Receive notifications via email</p>
          </div>
          <div className="setting-item submit">
            <Button onClick={this::this.submitForm} color="blue">Save</Button>
          </div>
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
    setting: state.users.notificationSetting,
    errors: state.users.notificationSettingError,
    currentUser: state.users.current,
    loader: state.loaders.main
  };
}

export default connect(mapStateToProps)(UserNotification);
