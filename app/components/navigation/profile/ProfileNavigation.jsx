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
    currentUser: state.users.current
  };
}

class ProfileNavigation extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func,
    route: PropTypes.object
  };

  static defaultProps = {
    currentUser: {},
    dispatch: () => {},
    route: {}
  };

  itemSelected(item) {
    let result;

    if (this.props.route) {
      result = this.props.route.path == item.path;
    }
    return result;
  }

  render() {
    const tabs = [
      { name: 'Profile settings', path: '/profile' },
      { name: 'Authorizations', path: '/profile/authorizations' }
    ];

    return (
      <div className={CN(css.navigation, 'Card', 'divine')}>
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
