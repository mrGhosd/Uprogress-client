import css from './RootApp.styl';

import CN from 'classnames';
import React, { Component } from 'react';

import RootHeader from 'root/header/RootHeader';
import Navigation from 'navigation/Navigation';

export default class RootApp extends Component {
  render() {
    return (
      <div className={CN(css.rootApp)}>
        <RootHeader />
        Root component
        <div className="main-content">
          <Navigation />
          <div className={CN('content', 'Card')}>
            {React.cloneElement(this.props.children, this.props)}
          </div>
        </div>
      </div>
    );
  }
}
