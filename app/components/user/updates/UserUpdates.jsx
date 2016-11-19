import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { getUser } from 'actions/users';

import UserUpdatesBlock from 'user/updates/block/UserUpdatesBlock';

class UserUpdates extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  static defaultProps = {
    user: {}
  };

  componentWillReceiveProps(props) {
    console.log(props);
    // if (props.user.isEmpty) {
    //   props.dispatch(getUser(props.params.user));
    // }
  }

  displayItemBlocks(user, updates) {
    if (updates) {
      const keys = Object.keys(updates);

      return (
        <div className="updatesList">
          {keys.map((item, index) => {
            return <UserUpdatesBlock key={index} title={item} user={user} updates={updates[item]} />;
          })}
        </div>
      );
    }
  }

  render() {
    const { user } = this.props;
    const recentActions = user.recentActions;
    const list = this.displayItemBlocks(user, recentActions);

    return (
      <div>
        {list}
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
