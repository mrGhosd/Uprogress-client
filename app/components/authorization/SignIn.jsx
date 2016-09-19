import css from './SignPage.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signIn } from 'actions/users';

import TextField from 'TextField/ElementTextField';
import Button from 'Button/ElementButton';

class SignIn extends Component {

  static propTypes = {
    dispatch: PropTypes.func
  };

  static defaultProps = {
    dispatch: () => {}
  };

  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {
      email: [],
      password: []
    }
  };

  handleChange(event) {
    let lastState = this.state.user;

    lastState[event.target.name] = event.target.value;
    this.setState({ user: lastState });
  }

  submitForm() {
    const user = this.state.user;

    this.props.dispatch(signIn(user));
  }

  render() {
    const user = this.state.user;
    const errors = this.state.errors;

    return (
      <div className={CN(css.signPage, 'Card')}>
        <form>
          <TextField ref="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={this::this.handleChange} error={errors.email} />
          <TextField ref="password"
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={this::this.handleChange} error={errors.password} />
          <Button onClick={this::this.submitForm} color="blue">Sign in</Button>
          <p>Don't have an account? <Link to="/sign_up">Sign up</Link></p>
        </form>
      </div>
    );
  }
}

export default connect()(SignIn);
