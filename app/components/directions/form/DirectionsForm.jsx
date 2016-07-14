import css from './DirectionsForm.styl';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CN from 'classnames';

import { createDirection, getDirection, updateDirection } from 'actions/directions';

import TextField from 'TextField/ElementTextField';
import TextArea from 'TextArea/ElementTextArea';

class DirectionsForm extends Component {

  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    direction: PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    direction: {}
  };

  state = {
    title: '',
    description: ''
  };

  componentWillMount() {
    if (this.props.params && this.props.params.course_id) {
      this.props.dispatch(getDirection(this.props.params.course_id));
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.params.course_id) {
      const direction = props.directions.detail;

      if (direction) {
        this.setState({title: direction.title, description: direction.description});
      }
    }

    if (props.directions.isUpdated) {
      console.log(this);
      this.context.router.push('/');
    }
  }

  handleChange(event) {
    let lastState = this.state;
    this.state[event.target.name] = event.target.value;
    this.setState(lastState);
  }

  submitForm() {
    const params = {
      title: this.state.title,
      description: this.state.description
    };
    let func;
    if (this.props.params && this.props.params.course_id) {
      func = updateDirection(this.props.params.course_id, params);
    }
    else {
      func = createDirection(params)
    }

    this.props.dispatch(func);
  }

  render() {
    return (
      <div className={CN(css.directionsForm, 'Card')}>
        <form>
          <TextField ref="title"
           name="title"
           onChange={(event) => this.handleChange(event)} value={this.state.title} />
         <TextArea ref="description"
           name="description"
           onChange={(event) => this.handleChange(event)} value={this.state.description} />
          <input type="button" value="Save" onClick={() => this.submitForm()}/>
        </form>
      </div>
    );
  }
}

export default connect()(DirectionsForm);
