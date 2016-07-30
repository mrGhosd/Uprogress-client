import css from './StepsForm.styl';
import CN from 'classnames';

import React, { Component, PropTypes } from 'react';

import { createStep } from 'actions/steps';

import TextField from 'TextField/ElementTextField';

export default class StepsForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    direction: PropTypes.object
  };

  static defaultProps = {
    dispatch: () => {},
    direction: {}
  };

  state = {
    step: {
      title: ''
    }
  };

  handleChange(event) {
    let lastState = this.state.step;

    lastState[event.target.name] = event.target.value;
    this.setState({ step: lastState });
  }

  submitForm() {
    this.props.dispatch(createStep(this.props.direction.id, this.state.step));
  }

  render() {
    let step = this.state.step;

    return (
      <div className={CN(css.stepsForm)}>
        <form>
          <TextField ref="title"
           name="title"
           onChange={this::this.handleChange} value={step.title} />
          <input type="button" value="Save" onClick={() => this.submitForm()}/>
        </form>
      </div>
    );
  }
}
