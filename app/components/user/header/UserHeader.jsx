import css from './UserHeader.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'Dropdown/ElementDropdown';

import { signOut } from 'actions/users';

import Image from 'Image/ElementImage';
import SvgIcon from 'SVGIcon/SVGIcon';

export default class UserHeader extends Component {

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    user: {},
    dispatch: () => {}
  };

  signOut() {
    this.props.dispatch(signOut());
  }

  displayImage(user) {
    let view;

    if (user.attachment) {
      view = <Image size={40} className="circle" src={user.attachment.url} />;
    }
    else {
      view = <SvgIcon icon="empty-user" />;
    }
    return view;
  }

  displayDropdown(user) {
    const userNick = user.nick;
    const items = [
      {
        text: 'Profile',
        value: 'profile'
      },
      {
        text: 'Settings',
        value: 'settings'
      }
    ];

    return (
      <Dropdown
        title={userNick}
        items={items} />
    );
  }

  render() {
    const { user } = this.props;
    const image = this.displayImage(user);
    const titleElement = (
      <div>
        <span className="nick">
          {image}
          <span >{user.nick}</span>
        </span>
      </div>
    );

    return (
      <div className={CN(css.userHeader)}>
        <div className="user-nick">
          <Dropdown titleElement={titleElement}>
            <li><Link to={`/${user.nick}`} >Profile</Link></li>
            <li><Link to="/profile">Settings</Link></li>
            <li><Link onClick={this.signOut.bind(this)} className="sign-out-button">Sign out</Link></li>
          </Dropdown>
        </div>

      </div>
    );
  }
}
