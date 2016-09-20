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
    edit: PropTypes.object,
    user: PropTypes.object
  };

  static defaultProps = {
    dispatch: () => {},
    direction: {},
    errors: {},
    edit: {},
    user: {}
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
    let func;
    const { user } = this.props;

    if (this.state.isEdit) {
      func = updateStep(user.nick, this.props.direction.id, this.state.step.id, this.state.step);
    }
    else {
      func = createStep(user.nick, this.props.direction.id, this.state.step);
    }
    this.props.dispatch(func);
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
