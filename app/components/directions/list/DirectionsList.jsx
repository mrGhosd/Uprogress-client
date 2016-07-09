import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class DirectionsList extends Component {

  componentWillMount() {
      console.log(this);
  }

  render() {
    return (
      <div className="directions-list">
        List
      </div>
    );
  }
}
