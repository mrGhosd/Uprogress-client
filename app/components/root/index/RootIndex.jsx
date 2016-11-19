import css from './RootIndex.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';
import Loader from 'react-loader';
import { connect } from 'react-redux';

import { getUser } from 'actions/users';

import RootHeader from 'root/header/RootHeader';
import Navigation from 'navigation/Navigation';
import PopupNotifications from 'popup_notifications/list/PopupNotificationsList';

/*eslint-disable */
import utilsPolyfill from 'utils/polifyll';
/*eslint-enable */

class RootIndex extends Component {

  static propTypes = {
    children: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func,
    loaders: PropTypes.object
  };

  static defaultProps = {
    children: {},
    params: {},
    dispatch: () => {},
    loaders: {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.params.user !== nextProps.params.user) {
      const { params } = nextProps;

      this.props.dispatch(getUser(params.user));
    }
    return true;
  }

  componentWillMount() {
    const { params } = this.props;

    this.props.dispatch(getUser(params.user));
  }

  render() {
    const isLoading = this.props.loaders.main;

    return (
      <div className={CN(css.rootIndex)}>
        <Loader loaded={isLoading} />
        <RootHeader />
        <div className="main-content">
          <Navigation {...this.props} />
            <div className={CN('content', 'Card')}>
                {this.props.children}
            </div>
        </div>
        <PopupNotifications />
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
    loaders: state.loaders
  };
}

export default connect(mapStateToProps)(RootIndex);
