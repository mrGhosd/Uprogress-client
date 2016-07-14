import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createDirection, getDirection } from 'actions/directions';

import TextField from 'TextField/ElementTextField';
import TextArea from 'TextArea/ElementTextArea';

class DirectionsForm extends Component {

  static propTypes = {
    direction: PropTypes.object
  };

  static defaultProps = {
    direction: {}
  };

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
      const direction = props.directions.detail;

      if (direction) {
        if (this.refs.title) this.refs.title.value(direction.title);
        if (this.refs.description) this.refs.description.value(direction.description);
      }
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
    this.props.dispatch(createDirection(params))
    this.setState({});
  }

  render() {

    return (
      <div className="directions-form">
        <form>
          <TextField ref="title"
           name="title"
           onChange={(event) => this.handleChange(event)} />
         <TextArea ref="description"
           name="description"
           onChange={(event) => this.handleChange(event)} />
          <input type="button" value="Save" onClick={() => this.submitForm()}/>
        </form>
      </div>
    );
  }
}

export default connect()(DirectionsForm);
