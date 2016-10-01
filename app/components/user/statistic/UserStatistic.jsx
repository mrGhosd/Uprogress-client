import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import { getUserStatistics } from 'actions/users';

import Donut from 'Charts/3DDonut/ElementDonut';

export class UserStatistic extends Component {

  state = {
    loaded: false
  };

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    user: {},
    dispatch: () => {}
  };

  componentWillReceiveProps(props) {
    const user = props.user;

    if (!user.isEmpty && !this.state.loaded) {
      this.props.dispatch(getUserStatistics(user.nick));
      this.setState({ loaded: true });
    }
  }

  renderDonut(user) {
    if (user.statistics) {
      return (
        <Donut data={user.statistics.directions} />
      );
    }
  }

  componentWillUnmount() {
    this.setState({ loaded: false });
  }

  render() {
    const { user } = this.props;
    const donut = this.renderDonut(user);

    return (
      <div>
        UserStatistic
        {donut}
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

export default connect(mapStateToProps)(UserStatistic);
