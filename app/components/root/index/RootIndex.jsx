import css from './RootIndex.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getUser } from 'actions/users';

import RootHeader from 'root/header/RootHeader';
import Navigation from 'navigation/Navigation';

/*eslint-disable */
import utilsPolyfill from 'utils/polifyll';
/*eslint-enable */

class RootIndex extends Component {

  static propTypes = {
    children: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    children: {},
    params: {},
    dispatch: () => {}
  }

  componentWillMount() {
    const { params } = this.props;

    this.props.dispatch(getUser(params.user));
  }

  render() {
    return (
      <div className={CN(css.rootIndex)}>
        <RootHeader />
        <div className="main-content">
          <Navigation {...this.props} />
          <div className={CN('content', 'Card')}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(RootIndex);
