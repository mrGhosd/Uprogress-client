import css from './DirectionsForm.styl';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CN from 'classnames';

import { createDirection, getDirection, updateDirection } from 'actions/directions';

import TextField from 'TextField/ElementTextField';
import TextArea from 'TextArea/ElementTextArea';
import Button from 'Button/ElementButton';

class DirectionsForm extends Component {

  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    direction: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    direction: {},
    dispatch: () => {},
    params: {}
  };

  static onEnter(nextState, replace) {
    const token = localStorage.getItem('uprogresstoken');

    if (!token) {
      console.log(nextState);
    }
  }

  state = {
    title: '',
    description: ''
  };

  componentWillMount() {
    if (this.props.params && this.props.params.id) {
      this.props.dispatch(getDirection(this.props.params.id));
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.params.id) {
      const direction = props.direction;

      if (direction) {
        this.setState({ title: direction.title, description: direction.description });
      }
    }

    if (props.isUpdated) {
      this.context.router.push(`/directions/${props.direction.id}`);
    }
  }

  handleChange(event) {
    let lastState = this.state;

    lastState[event.target.name] = event.target.value;
    this.setState(lastState);
  }

  submitForm() {
    const params = {
      title: this.state.title,
      description: this.state.description
    };
    let func;

    if (this.props.params && this.props.params.id) {
      func = updateDirection(this.props.params.id, params);
    }
    else {
      func = createDirection(params);
    }

    this.props.dispatch(func);
  }

  render() {
    const { errors } = this.props;

    return (
      <div className={CN(css.directionsForm, 'Card')}>
        <form>
          <TextField ref="title"
           name="title"
           onChange={(event) => this.handleChange(event)}
           value={this.state.title}
           error={errors.title} />
         <TextArea ref="description"
           name="description"
           onChange={(event) => this.handleChange(event)}
           value={this.state.description}
           error={errors.description} />
         <Button onClick={this::this.submitForm} color="blue" >Save</Button>
        </form>
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
    errors: state.directions.errors,
    isUpdated: state.directions.isUpdated
  };
}

export default connect(mapStateToProps)(DirectionsForm);
