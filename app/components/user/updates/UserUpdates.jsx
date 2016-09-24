import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

class UserUpdates extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  static defaultProps = {
    user: {}
  };

  displayTitle(updates) {
    if (updates) {
      console.log(Object.keys(updates));
      return Object.keys(updates);
    }

  }

  render() {
    const { user } = this.props;
    const recentActions = user.recentActions;
    const title = this.displayTitle(recentActions);

    return (
      <div>
        UserInfo
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
    user: state.users.show
  };
}

export default connect(mapStateToProps)(UserUpdates);
