import css from './StepsForm.styl';
import CN from 'classnames';

import React, { Component, PropTypes } from 'react';

import { createStep, updateStep } from 'actions/steps';

import TextField from 'TextField/ElementTextField';
import TextArea from 'TextArea/ElementTextArea';
import Button from 'Button/ElementButton';

export default class StepsForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    direction: PropTypes.object,
    errors: PropTypes.object,
    edit: PropTypes.object
  };

  static defaultProps = {
    dispatch: () => {},
    direction: {},
    errors: {},
    edit: {}
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
    },
    isEdit: false
  };

  componentWillReceiveProps(props) {
    let { step, isEdit } = this.state;
    let { direction, errors } = props;

    if (props.errors.isEmpty) {
      step = { title: '', description: '' };
    }

    if (!props.edit.isEmpty) {
      step = props.edit;
      isEdit = true;
    }

    this.setState({ direction, errors, step, isEdit });
  }

  handleChange(event) {
    let lastState = this.state.step;

    lastState[event.target.name] = event.target.value;
    this.setState({ step: lastState });
  }

  submitForm() {
    if (this.state.isEdit) {
      this.props.dispatch(updateStep(this.props.direction.id, this.state.step.id, this.state.step));
    }
    else {
      this.props.dispatch(createStep(this.props.direction.id, this.state.step));
    }
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
         <Button onClick={this::this.submitForm} color="blue">Save</Button>
        </form>
      </div>
    );
  }
}
