import React, { Component } from 'react';

import { connect } from 'react-redux';

class SignIn extends Component {
  render() {
    return (
      <div>SignIn component</div>
    );
  }
}

export default connect()(SignIn);
