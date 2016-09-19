import css from './StepsListItem.styl';
import CN from 'classnames';

import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';

import { updateStep, deleteStep, editStep } from 'actions/steps';

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
    dispatch: PropTypes.func
  };

  static defaultProps = {
    step: {},
    dispatch: () => {}
  };

  componentWillMount() {
    this.setState({ step: this.props.step });
  }

  handleChanges(event) {
    if (event.target.type === 'checkbox') {
      this.changeState(event);
      this.props.dispatch(updateStep(
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
    this.props.dispatch(deleteStep(this.state.step.direction_id, this.state.step.id));
  }

  editStep() {
    const scroll = Scroll.animateScroll;
    this.props.dispatch(editStep(this.state.step));
    scroll.scrollToTop();
  }

  render() {
    let { step } = this.state;
    const title = this.displayTitle(step);
    const description = this.displayDescription(step);

    return (
      <div className={CN(css.stepsListItem)}>
        <CheckBox name="isDone"
          checked={step.isDone}
          onChange={ this::this.handleChanges }/>
        <div className="step-info">
          {title}
          {step.showDescription && description}
        </div>
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
