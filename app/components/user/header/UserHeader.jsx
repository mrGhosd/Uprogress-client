import css from './UserHeader.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DropdownMenu from 'react-dd-menu';

import { signOut } from 'actions/users';

import Button from 'Button/ElementButton';
import Image from 'Image/ElementImage';
import SvgIcon from 'SVGIcon/SVGIcon';

export default class UserHeader extends Component {

  state = {
    isOpen: false
  };

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

  close() {
    this.setState({ isMenuOpen: false });
  }

  toggle() {
    let prevState = this.state;

    prevState.isOpen = !prevState.isOpen
    this.setState(prevState);
  }

  click() {
    console.log('You clicked an item');
  }

  render() {
    const { user } = this.props;
    const image = this.displayImage(user);
    // const dropDownItems = [
    //   {
    //     text: '111',
    //     value: '1'
    //   },
    //   {
    //     text: '222',
    //     value: '2'
    //   },
    //   {
    //     text: '333',
    //     value: '3'
    //   }
    // ];
    const menuOptions = {
      isOpen: this.state.isOpen,
      close: this.close.bind(this),
      toggle: <button type="button" onClick={this.toggle.bind(this)}>Click me!</button>,
      align: 'right',
    };
    console.log(menuOptions);

    return (
      <div className={CN(css.userHeader)}>
        <div className="user-nick">
          <span className="nick">
            {image}
            <span >{user.nick}</span>
          </span>
          <DropdownMenu isOpen={this.state.isOpen} close={menuOptions.close} toggle={menuOptions.toggle}>
            <li><a href="#">Example 1</a></li>
            <li><button type="button" onClick={this.click.bind(this)}>Example 2</button></li>
          </DropdownMenu>
        </div>
        <Button size="auto" color="red" onClick={this::this.signOut} className="sign-out-button">Sign out</Button>
      </div>
    );
  }
}
