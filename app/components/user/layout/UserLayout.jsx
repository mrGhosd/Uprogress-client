import css from './UserLayout.styl';

import React, { Component, PropTypes } from 'react';
import Loader from 'react-loader';

import CN from 'classnames';

import { connect } from 'react-redux';

import RootHeader from 'root/header/RootHeader';
import ProfileNavigation from 'navigation/profile/ProfileNavigation';
import PopupNotifications from 'popup_notifications/list/PopupNotificationsList';

class UserLayout extends Component {

  static propTypes = {
    children: PropTypes.object,
    currentUser: PropTypes.object
  };

  static defaultProps = {
    children: {},
    currentUser: {}
  };

  render() {
    const isLoading = this.props.loaders.main;

    return (
      <div className={CN(css.userLayout)}>
        <RootHeader />
        <Loader loaded={isLoading} />
        <div className="main-content">
          <ProfileNavigation {...this.props} />
          <div className={CN('content', 'Card')}>
            {this.props.children}
          </div>
        </div>
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
  return { loaders: state.loaders, currentUser: state.users.current };
}

export default connect(mapStateToProps)(UserLayout);
