import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import Loader from 'react-loader';

export class RootDashboard extends Component {

  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    dispatch: PropTypes.func,
    loader: PropTypes.bool,
    currentUser: PropTypes.object
  };

  static defaultProps = {
    dispatch: () => {},
    loader: false,
    currentUser: {}
  };

  componentWillReceiveProps(props) {
    const { currentUser } = props;

    if (!currentUser.isEmpty) {
      this.context.router.push(`/${currentUser.nick}`);
    }
    else {
      this.context.router.push('/sign_in');
    }
  }

  render() {
    const { loader } = this.props;

    return (
      <div>
        <Loader loaded={loader} />
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
    loader: state.loaders.main,
    currentUser: state.users.current
  };
}

export default connect(mapStateToProps)(RootDashboard);
