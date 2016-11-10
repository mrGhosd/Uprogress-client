import css from './RootIndex.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';
import Loader from 'react-loader';
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
    const options = {
      lines: 13,
      length: 20,
      width: 10,
      radius: 30,
      corners: 1,
      rotate: 0,
      direction: 1,
      color: '#000',
      speed: 1,
      trail: 60,
      shadow: false,
      hwaccel: false,
      zIndex: 2e9,
      top: '50%',
      left: '60%',
      scale: 1.00
    };

    return (
      <div className={CN(css.rootIndex)}>
        <Loader loaded={false} />
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
