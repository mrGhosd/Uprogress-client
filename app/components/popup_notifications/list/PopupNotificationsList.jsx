import css from './PopupNotificationsList.styl';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Notification from 'popup_notifications/item/PopupNotificationsItem';

export class PopupNotificationsList extends Component { // eslint-disable-line react/no-multi-comp

  static propTypes = {
    notifications: PropTypes.array
  };

  static defaultProps ={
    notifications: []
  };

  render() {
    return (
      <div className={css.PopupNotifications}>
        {this.props.notifications.map((notif) => {
          return <Notification key={notif.id} {...notif} />;
        })}
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
    notifications: state.notifications.list
  };
}

export default connect(mapStateToProps)(PopupNotificationsList);
