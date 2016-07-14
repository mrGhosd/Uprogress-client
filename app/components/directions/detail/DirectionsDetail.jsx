import React, { Component } from 'react';

export default class DirectionsDetail extends Component {
  render() {
    const id = this.props.params.course_id;
    return (
      <div className="directions-detail">
        Detail {id}
      </div>
    );
  }
}
