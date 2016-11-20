import css from './UserAuthorizations.styl';
import CN from 'classnames';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import UserAuthorizationItem from 'user/authorizations/item/UserAuthorizationsItem';

import { getCurrentUserAuthorizations, removeAuthorizations } from 'actions/users';

export class UserAuthorizations extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    authorizations: PropTypes.array
  };

  static defaultProps = {
    dispatch: () => {},
    authorizations: []
  }

  componentWillMount() {
    this.props.dispatch(getCurrentUserAuthorizations());
  }

  componentWillUnmount() {
    this.props.dispatch(removeAuthorizations());
  }

  render() {
    const { authorizations } = this.props;

    return (
      <div className={CN(css.userAuthorizations)}>
          {authorizations.map((item) => {
            return <UserAuthorizationItem key={item.id} authorization={item} />
          })}
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
    authorizations: state.users.authorizations
  };
}

export default connect(mapStateToProps)(UserAuthorizations);
