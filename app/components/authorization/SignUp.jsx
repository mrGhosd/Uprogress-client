import React, { Component } from 'react';

import { connect } from 'react-redux';

class SignUp extends Component {
  render() {
    return (
      <div>SignUp component</div>
    );
  }
}

export default connect()(SignUp);
