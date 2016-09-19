import css from './RootIndex.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';

import RootHeader from 'root/header/RootHeader';
import Navigation from 'navigation/Navigation';

/*eslint-disable */
import utilsPolyfill from 'utils/polifyll';
/*eslint-enable */

export default class RootApp extends Component {

  static propTypes = {
    children: PropTypes.object
  };

  static defaultProps = {
    children: {}
  }

  render() {
    return (
      <div className={CN(css.rootIndex)}>
        <RootHeader />
        <div className="main-content">
          <Navigation {...this.props} />
          <div className={CN('content', 'Card')}>
            {React.cloneElement(this.props.children, this.props)}
          </div>
        </div>
      </div>
    );
  }
}
