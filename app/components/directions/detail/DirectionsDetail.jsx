import css from './directionsDetail.styl';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CN from 'classnames';

import StepsList from 'steps/list/StepsList';
import StepsForm from 'steps/form/StepsForm';

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
      detail: {
        steps: []
      }
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
    let template;

    if (!direction.steps.isEmpty && direction.percents_result > 0) {
      template = (
        <div className="progress-bar">
          <p className={CN(`progress_${direction.percents_result}`)}>{direction.percents_result}%</p>
        </div>
      );
    }
    else if (!direction.steps.isEmpty) {
      template = (
        <div className="progress-bar red">
          <p className="percent_empty">{direction.percents_result}%</p>
        </div>
      );
    }

    return template;
  }

  render() {
    const direction = this.props.directions.detail;
    const progressBar = this.progressBar(direction);
    const dispatch = this.props.dispatch;

    return (
      <div className={CN(css.directionsDetail)}>
        <h1>{direction.title}</h1>
        <p>{direction.description}</p>
        {progressBar}
        <StepsForm direction={direction} dispatch={this.props.dispatch} />
        {!direction.steps.isEmpty && <StepsList steps={direction.steps} dispatch={dispatch} />}
      </div>
    );
  }
}

export default connect()(DirectionsDetail);
