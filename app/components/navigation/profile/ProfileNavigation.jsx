import css from 'navigation/Navigation.styl';

import CN from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import React, { Component, PropTypes } from 'react';

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return {
    isShow: state.base.isShow,
    currentUser: state.users.current
  };
}

class ProfileNavigation extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func,
    location: PropTypes.object,
    isShow: PropTypes.bool
  };

  static defaultProps = {
    currentUser: {},
    dispatch: () => {},
    location: {},
    isShow: false
  };

  itemSelected(item) {
    let result;

    if (this.props.location.pathname) {
      result = this.props.location.pathname === item.path;
    }

    return result;
  }

  render() {
    const { isShow } = this.props;
    const tabs = [
      { name: 'Profile settings', path: '/profile' },
      { name: 'Authorizations', path: '/profile/authorizations' },
      { name: 'Security', path: '/profile/security' },
      { name: 'Notifications', path: '/profile/notifications' }
    ];

    return (
      <div className={CN(css.navigation, 'Card', 'divine', { hide: !isShow })}>
        {tabs.map((item, index) => {
          return (
            <Link className={CN({ 'navigation-item': true, 'selected': this.itemSelected(item) })}
                  key={index} to={item.path}>
              <span className="title">{item.name}</span>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProfileNavigation);
