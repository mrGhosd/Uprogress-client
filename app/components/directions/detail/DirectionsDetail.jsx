import css from './directionsDetail.styl';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CN from 'classnames';
import Popover from 'react-popover';

import { getDirection } from 'actions/directions';
import { isCurrentUser } from 'utils/currentUser';
import SvgIcon from 'SVGIcon/SVGIcon';

import StepsList from 'steps/list/StepsList';
import StepsForm from 'steps/form/StepsForm';
import AppointmentsForm from 'appointments/form/AppointmentsForm';
import WidgetTab from 'Widget/Tab/WidgetTab';

class DirectionsDetail extends Component {

  state = {
    directionLoad: true,
    appointmentPopoverOpen: false
  };

  static propTypes = {
    params: PropTypes.object,
    dispatch: PropTypes.func,
    direction: PropTypes.object,
    steps: PropTypes.array,
    editStep: PropTypes.object,
    user: PropTypes.object,
    currentUser: PropTypes.object,
    stepErrors: PropTypes.object,
    children: PropTypes.object
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
    stepErrors: {},
    children: {}
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

  togglePopover() {
    this.setState({ appointmentPopoverOpen: !this.state.appointmentPopoverOpen });
  }

  outerClick(event) {
    if (event.target.className && !event.target.className.match(/react-datepicker/)) {
      this.setState({ appointmentPopoverOpen: !this.state.appointmentPopoverOpen });
    }
  }

  render() {
    let tabs = {};
    const { currentUser, user, dispatch, editStep, stepErrors, direction, steps } = this.props;
    const { appointmentPopoverOpen } = this.state;
    const progressBar = this.progressBar(direction);
    tabs[`/${user.nick}/directions/${direction.id}/steps`] = 'Steps';

    return (
      <div className={CN(css.directionsDetail)}>
        <div className="direction-detail-header">
          <h1>{direction.title}</h1>
          <div className="appointment-handler">
            <Popover
              isOpen={appointmentPopoverOpen}
              onOuterAction={this::this.outerClick}
              body={<AppointmentsForm direction={direction} />}
              preferPlace="left">
              <a onClick={this::this.togglePopover}>
                <SvgIcon icon="clock_icon" />
              </a>
            </Popover>
          </div>
        </div>

        <p>{direction.description}</p>
        {progressBar}
        {isCurrentUser(currentUser, user) && <StepsForm direction={direction}
                   edit={editStep}
                   errors={stepErrors}
                   user={user}
                   currentUser={currentUser}
                   dispatch={this.props.dispatch}
        />}
        <div className="detail-widget">
          <WidgetTab tabs={tabs} className="horizontal-bottom dashboard-widget" />
          <div className={CN('Card', 'widget-content')}>
            {this.props.children}
          </div>
        </div>
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
