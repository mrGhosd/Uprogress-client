import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDirection } from 'actions/directions';

class DirectionsForm extends Component {

  submitForm() {
    this.props.dispatch(createDirection({title: this.refs.title.value}))
  }

  render() {
    return (
      <div className="directions-form">
        <form>
          <input ref="title" name="title" />
          <input type="button" value="Save" onClick={() => this.submitForm()}/>
        </form>
      </div>
    );
  }
}

export default connect()(DirectionsForm);
