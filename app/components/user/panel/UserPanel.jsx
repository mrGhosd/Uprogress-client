import css from './UserPanel.styl';

import CN from 'classnames';

import React, { Component, PropTypes } from 'react';

import Image from 'Image/ElementImage';
import SvgIcon from 'SVGIcon/SVGIcon';

export default class UserPanel extends Component {

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    user: {},
    dispatch: () => {}
  };

  displayImage(user) {
    let image;

    if (user.isEmpty) {
      image = <SvgIcon icon="empty-user" />;
    }
    else {
      image = <Image size={200} className="avatar-image" src={user.attachment.url} />;
    }

    return image;
  }

  displayFullName(user) {
    if (!user.isEmpty && user.firstName && user.lastName) {
      const fullName = `${user.firstName} ${user.lastName}`;

      return (
        <div className="fullName">
          <h1>{fullName}</h1>
        </div>
      );
    }
  }

  displayNick(user) {
    if (!user.isEmpty) {
      return (
        <div className="nickname">
          <h3>{user.nick}</h3>
        </div>
      );
    }
  }

  displayConnectInfo(user) {
    let location;

    if (!user.isEmpty) {
      if (user.location) {
        location = this.displayLocation(user.location);
      }
    }
    return (
      <div className="connect-info">
        {location}
      </div>
    );
  }

  displayLocation(location) {
    return (
      <div className="location">
        <SvgIcon icon="location-icon" />
        <p className="title">{location}</p>
      </div>
    );
  }

  render() {
    let { user } = this.props;
    const image = this.displayImage(user);
    const name = this.displayFullName(user);
    const nick = this.displayNick(user);
    const connectInfo = this.displayConnectInfo(user);

    return (
      <div className={CN(css.userPanel)}>
        <div className="avatar">
          {image}
        </div>
        {name}
        {nick}
        {connectInfo}
      </div>
    );
  }
}
