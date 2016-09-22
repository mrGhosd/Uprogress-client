import css from './UserLayout.styl';

import React, { Component, PropTypes } from 'react';

import CN from 'classnames';

import { connect } from 'react-redux';

import RootHeader from 'root/header/RootHeader';
import ProfileNavigation from 'navigation/profile/ProfileNavigation';

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
    return (
      <div className={CN(css.userLayout)}>
        <RootHeader />
        <div className="main-content">
          <ProfileNavigation {...this.props} />
          <div className={CN('content', 'Card')}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}


export default connect()(UserLayout);
