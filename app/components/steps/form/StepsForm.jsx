import css from './StepsForm.styl';
import CN from 'classnames';

import React, { Component, PropTypes } from 'react';

import { createStep } from 'actions/steps';

import TextField from 'TextField/ElementTextField';
import TextArea from 'TextArea/ElementTextArea';

export default class StepsForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    direction: PropTypes.object,
    errors: PropTypes.object
  };

  static defaultProps = {
    dispatch: () => {},
    direction: {},
    errors: {}
  };

  state = {
    step: {
      title: '',
      description: ''
    },
    direction: {},
    errors: {
      title: [],
      description: []
    }
  };

  componentWillReceiveProps(props) {
    let step = this.state.step;

    if (props.errors.isEmpty) {
      step = { title: '', description: '' };
    }
    this.setState({ direction: props.direction, errors: props.errors, step });
  }

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
    const titleErrors = this.state.errors.title;
    const descriptionErrors = this.state.errors.description;

    return (
      <div className={CN(css.stepsForm)}>
        <form>
          <TextField ref="title"
           name="title"
           onChange={this::this.handleChange} value={step.title} error={titleErrors} />
         <TextArea ref="description"
           name="description"
           onChange={this::this.handleChange}
           error={descriptionErrors}
           value={step.description} />
         <input type="button" value="Save" onClick={this::this.submitForm}/>
        </form>
      </div>
    );
  }
}
