import css from './RootHeader.styl';

import CN from 'classnames';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { signOut } from 'actions/users';

import Button from 'Button/ElementButton';

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return { currentUser: state.users.current };
}

export default class RootHeader extends Component {
  state = {
    currentUser: {}
  };

  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    currentUser: {},
    dispatch: () => {}
  };

  componentWillMount() {
    this.setCurrentUserState(this.props);
  }

  componentWillReceiveProps(props) {
    this.setCurrentUserState(props);
  }

  setCurrentUserState(props) {
    if (props.currentUser) {
      this.setState({ currentUser: props.currentUser });
    }
  }

  userInfo() {
    const nickName = this.state.currentUser.nick;

    return (
      <div className="user-info">
        <div className="user-nick">
          <span className="nick">{nickName}</span>
        </div>
        <Button size="auto" color="red" onClick={this::this.signOut} className="sign-out-button">Sign out</Button>
      </div>
    );
  }

  signOut() {
    this.props.dispatch(signOut());
  }

  unAuthorizedUser() {
    return (
      <div className="authorization">
        <Link to="/sign_in">Sign in</Link>
        <Link to="/sign_up">Sign up</Link>
      </div>
    );
  }

  rightHeaderPart() {
    let template;

    if (!this.state.currentUser.isEmpty) {
      template = this.userInfo();
    }
    else {
      template = this.unAuthorizedUser();
    }

    return template;
  }

  render() {
    const template = this.rightHeaderPart();

    return (
      <div className={CN(css.rootHeader, 'Card')}>
        <div className="left-part">UProgress</div>
        <div className="right-part">{template}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(RootHeader);
