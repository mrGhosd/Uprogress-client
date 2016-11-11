import css from './StepsListItem.styl';
import CN from 'classnames';

import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';

import { updateStep, deleteStep, editStep } from 'actions/steps';
import { isCurrentUser } from 'utils/currentUser';

import CheckBox from 'CheckBox/ElementCheckBox';
import SvgIcon from 'SVGIcon/SVGIcon';

export default class StepsListItem extends Component {

  state = {
    step: {
      isDone: false,
      showDescription: false
    }
  };

  static propTypes = {
    step: PropTypes.object,
    dispatch: PropTypes.func,
    currentUser: PropTypes.object,
    user: PropTypes.object
  };

  static defaultProps = {
    step: {},
    dispatch: () => {},
    currentUser: {},
    user: {}
  };

  componentWillMount() {
    this.setState({ step: this.props.step });
  }

  handleChanges(event) {
    if (event.target.type === 'checkbox') {
      this.changeState(event);
      this.props.dispatch(updateStep(
        this.props.currentUser.nick,
        this.state.step.directionId,
        this.state.step.id,
        this.state.step
      ));
    }
    else {
      this.changeState(event);
    }
  }

  changeState(event) {
    let state = this.state.step;

    state[event.target.name] = Boolean(event.target.type.match(/text/)) ? event.target.value : event.target.checked;
    this.setState({ step: state });
  }

  displayTitle(state) {
    let template;

    if (state.isDone) {
      template = (<strike>{state.title}</strike>);
    }
    else {
      template = state.title;
    }

    return (<a onClick={this::this.toggleStepDescription}>{template}</a>);
  }

  toggleStepDescription() {
    let prevState = this.state.step;

    prevState.showDescription = !prevState.showDescription;
    this.setState({ step: prevState });
  }

  displayDescription(step) {
    if (this.state.step.showDescription) {
      return (
        <div className="step-description">
          {step.description}
        </div>
      );
    }
  }

  deleteStep() {
    this.props.dispatch(deleteStep(
      this.props.currentUser.nick,
      this.state.step.directionId,
      this.state.step.id));
  }

  editStep() {
    const scroll = Scroll.animateScroll;

    this.props.dispatch(editStep(this.state.step));
    scroll.scrollToTop();
  }

  displayItemStatusIcon() {
    const { step } = this.state;
    let template;

    if (step.isDone) {
      template = <SvgIcon icon="icon-success" />;
    }
    else {
      template = <SvgIcon icon="icon-failure" />;
    }
    return template;
  }

  displayCheckbox(step, currentUser, user) {
    let template;

    if (isCurrentUser(currentUser, user)) {
      template = (<CheckBox name="isDone"
        checked={step.isDone}
        onChange={ this::this.handleChanges }/>);
    }
    else {
      template = this.displayItemStatusIcon();
    }

    return template;
  }

  displayIcons(currentUser, user) {
    if (isCurrentUser(currentUser, user)) {
      return (
        <div className="icons">
          <a className="edit-icon" onClick={this::this.editStep}>
            <SvgIcon icon="edit-step" />
          </a>
          <a className="delete-icon" onClick={this::this.deleteStep}>
            <SvgIcon icon="delete-step" />
          </a>
        </div>
      );
    }
  }

  render() {
    let { step } = this.state;
    const { currentUser, user } = this.props;
    const checkbox = this.displayCheckbox(step, currentUser, user);
    const title = this.displayTitle(step);
    const description = this.displayDescription(step);
    const icons = this.displayIcons(currentUser, user);

    return (
      <div className={CN(css.stepsListItem)}>
        {checkbox}
        <div className="step-info">
          {title}
          {step.showDescription && description}
        </div>
        {icons}
      </div>
    );
  }
}
