import CN from 'classnames';
import { connect } from 'react-redux';
import css from './RootHeader.styl';
import React, { Component } from 'react';

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default class RootHeader extends Component {

  render() {

    return (
      <div className={CN(css.rootHeader, 'Card')}>Header</div>
    );
  }
}

export default connect(mapStateToProps)(RootHeader);
