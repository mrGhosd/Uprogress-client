import React, { Component, PropTypes } from 'react';

import UserForm from 'user/form/UserForm';

import { connect } from 'react-redux';

class UserProfile extends Component {

  static propTypes = {
    currentUser: PropTypes.object
  };

  static defaultProps = {
    currentUser: {}
  };

  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <UserForm user={currentUser} />
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
    currentUser: state.users.current
  };
}

export default connect(mapStateToProps)(UserProfile);
