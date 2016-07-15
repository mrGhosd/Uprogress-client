import React, { Component, PropTypes } from 'react';

export default class DirectionsDetail extends Component {

  static propTypes = {
    params: PropTypes.object
  };

  static defaultProps = {
    params: {
      course_id: ''
    }
  };

  render() {
    const id = this.props.params.course_id;

    return (
      <div className="directions-detail">
        Detail {id}
      </div>
    );
  }
}
