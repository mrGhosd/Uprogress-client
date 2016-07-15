import css from './directionsDetail.styl';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CN from 'classnames';

import  { getDirection } from 'actions/directions';

class DirectionsDetail extends Component {

  static propTypes = {
    params: PropTypes.object,
    dispatch: PropTypes.func,
    directions: PropTypes.object
  };

  static defaultProps = {
    params: {
      course_id: ''
    },
    dispatch: () => {},
    directions: {
      detail: {}
    }
  };

  componentWillMount() {
    this.props.dispatch(getDirection(this.props.params.course_id));
  }

  render() {
    const direction = this.props.directions.detail;

    return (
      <div className={CN(css.directionsDetail)}>
        <h1>{direction.title}</h1>
        <p>{direction.description}</p>
      </div>
    );
  }
}

export default connect()(DirectionsDetail);
