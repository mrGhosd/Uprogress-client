import css from './directionsDetail.styl';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CN from 'classnames';

import StepsList from 'steps/list/StepsList';
import StepsForm from 'steps/form/StepsForm';

import { getDirection } from 'actions/directions';
import { isCurrentUser } from 'utils/currentUser';

class DirectionsDetail extends Component {

  state = {
    directionLoad: true
  };

  static propTypes = {
    params: PropTypes.object,
    dispatch: PropTypes.func,
    direction: PropTypes.object,
    steps: PropTypes.array,
    editStep: PropTypes.object,
    user: PropTypes.object,
    currentUser: PropTypes.object,
    stepErrors: PropTypes.object
  };

  static defaultProps = {
    params: {
      id: ''
    },
    dispatch: () => {},
    direction: {},
    steps: [],
    editStep: {},
    user: {},
    currentUser: {},
    stepErrors: {}
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
    const nickName = props.user.nick || props.params.user;

    this.props.dispatch(getDirection(nickName, props.params.id));
  }

  progressBar(direction) {
    let template;

    if (!direction.steps.isEmpty && direction.percentsResult > 0) {
      template = (
        <div className="progress-bar">
          <p className={CN(`progress_${direction.percentsResult}`)}>{direction.percentsResult}%</p>
        </div>
      );
    }
    else if (!direction.steps.isEmpty) {
      template = (
        <div className="progress-bar red">
          <p className="percent_empty">{direction.percentsResult}%</p>
        </div>
      );
    }

    return template;
  }

  render() {
    const { currentUser, user, dispatch, editStep, stepErrors, direction, steps } = this.props;
    const progressBar = this.progressBar(direction);

    return (
      <div className={CN(css.directionsDetail)}>
        <h1>{direction.title}</h1>
        <p>{direction.description}</p>
        {progressBar}
        {isCurrentUser(currentUser, user) && <StepsForm direction={direction}
                   edit={editStep}
                   errors={stepErrors}
                   user={user}
                   currentUser={currentUser}
                   dispatch={this.props.dispatch}
        />}
        {!steps.isEmpty && <StepsList currentUser={currentUser} user={user} steps={steps} dispatch={dispatch} />}
      </div>
    );
  }
}

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return {
    direction: state.directions.detail,
    steps: state.steps.list,
    editStep: state.steps.edit,
    user: state.users.show,
    stepErrors: state.steps.errors,
    currentUser: state.users.current
  };
}

export default connect(mapStateToProps)(DirectionsDetail);
