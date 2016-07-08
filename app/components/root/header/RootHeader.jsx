import CN from 'classnames';
import css from './RootHeader.styl';
import React, { Component } from 'react';

export default class RootHeader extends Component {
  render() {
    return(
      <div className={CN(css.rootHeader)}>Header</div>
    );
  }
}
