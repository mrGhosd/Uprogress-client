import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import { getCurrentUserAuthorizations, removeAuthorizations } from 'actions/users';

export class UserAuthorizations extends Component {

  static propTypes = {
    dispatch: PropTypes.func
  };

  static defaultProps = {
    dispatch: () => {}
  }

  componentWillMount() {
    this.props.dispatch(getCurrentUserAuthorizations());
  }

  componentWillUnmount() {
    this.props.dispatch(removeAuthorizations());
  }

  render() {

    return (
      <div>AuthorizationsList</div>
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
    authorizations: state.users.authorizations
  };
}

export default connect(mapStateToProps)(UserAuthorizations);
