import CN from 'classnames';
import { connect } from 'react-redux';
import css from './RootHeader.styl';
import React, { Component } from 'react';

function mapStateToProps(state) {
  return {currentUser: state.currentUser};
}

export default class RootHeader extends Component {

  render() {
    console.log(this.props);
    return(
      <div className={CN(css.rootHeader)}>Header</div>
    );
  }
}

export default connect(mapStateToProps)(RootHeader);
