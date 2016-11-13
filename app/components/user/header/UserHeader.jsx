import css from './UserHeader.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'Dropdown/ElementDropdown';

import { signOut } from 'actions/users';

import Button from 'Button/ElementButton';
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
    if (user.attachment) {
      return <Image size={40} className="circle" src={user.attachment.url} />;
    }
    else {
      return <SvgIcon icon="empty-user" />;
    }
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
    const dropDownItems = [
      {
        value: '1'
      },
      {
        value: '2'
      },
      {
        value: '3'
      }
    ];

    return (
      <div className={CN(css.userHeader)}>
        <div className="user-nick">
          <Dropdown items={dropDownItems}>
            <span className="nick">
              {image}
              <span >{user.nick}</span>
            </span>
          </Dropdown>
        </div>
        <Button size="auto" color="red" onClick={this::this.signOut} className="sign-out-button">Sign out</Button>
      </div>
    );
  }
}
