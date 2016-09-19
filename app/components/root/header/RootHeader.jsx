import CN from 'classnames';
import { connect } from 'react-redux';
import css from './RootHeader.styl';
import React, { Component } from 'react';

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

  componentWillReceiveProps(props) {
    if (props.currentUser) {
      this.setState({ currentUser: props.currentUser });
    }
  }

  render() {
    const nickName = this.state.currentUser.nick;

    return (
      <div className={CN(css.rootHeader, 'Card')}>Header {nickName}</div>
    );
  }
}

export default connect(mapStateToProps)(RootHeader);
