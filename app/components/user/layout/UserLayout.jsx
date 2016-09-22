import React, { Component, PropTypes } from 'react';

import CN from 'classnames';

import { connect } from 'react-redux';

import RootHeader from 'root/header/RootHeader';

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
      <div>
        <RootHeader />
        {this.props.children}
      </div>
    );
  }
}


export default connect()(UserLayout);
