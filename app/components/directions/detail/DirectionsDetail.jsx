import css from './directionsDetail.styl';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CN from 'classnames';

import StepsList from 'steps/list/StepsList';

import  { getDirection } from 'actions/directions';

class DirectionsDetail extends Component {

  state = {
    directionLoad: true
  };

  static propTypes = {
    params: PropTypes.object,
    dispatch: PropTypes.func,
    directions: PropTypes.object
  };

  static defaultProps = {
    params: {
      id: ''
    },
    dispatch: () => {},
    directions: {
      detail: {}
    }
  };

  componentWillMount() {
    if (this.state.directionLoad) {
      this.loadDirection(this.props);
    }
  }

  componentWillReceiveProps(props) {
    if (props.params.id != this.props.params.id || this.state.directionLoad) {
      this.loadDirection(props);
    }
  }

  loadDirection(props) {
    this.setState({ directionLoad: false });
    this.props.dispatch(getDirection(props.params.id));
  }

  progressBar(direction) {
    if (direction.percents_result) {
      return (
        <div className="progress-bar">
          <p className={CN(`progress_${direction.percents_result}`)}>{direction.percents_result}%</p>
        </div>
      );
    }
  }

  render() {
    const direction = this.props.directions.detail;
    const progressBar = this.progressBar(direction);
    const dispatch = this.props.dispatch;

    return (
      <div className={CN(css.directionsDetail)}>
        <h1>{direction.title}</h1>
        <p>{direction.description}</p>
        {direction.percents_result && progressBar}
        {direction.steps && <StepsList steps={direction.steps} dispatch={dispatch} />}
      </div>
    );
  }
}

export default connect()(DirectionsDetail);
