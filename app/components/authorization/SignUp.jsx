import css from './SignPage.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from 'react-loader';

import { signUp } from 'actions/users';

import TextField from 'TextField/ElementTextField';
import Button from 'Button/ElementButton';

class SignUp extends Component {

  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    dispatch: PropTypes.func,
    signUpErrors: PropTypes.object,
    loader: PropTypes.bool
  };

  static defaultProps = {
    dispatch: () => {},
    signUpErrors: {},
    loader: true
  };

  state = {
    user: {
      email: '',
      password: '',
      passwordConfirmation: '',
      nick: ''
    },
    errors: {
      email: [],
      password: [],
      passwordConfirmation: [],
      nick: []
    }
  };

  handleChange(event) {
    let lastState = this.state.user;

    lastState[event.target.name] = event.target.value;
    this.setState({ user: lastState });
  }

  componentWillReceiveProps(props) {
    if (!props.current.isEmpty) {
      this.context.router.push(`/${props.current.nick}`);
    }
  }

  submitForm() {
    const user = this.state.user;

    this.props.dispatch(signUp(user));
  }

  render() {
    const user = this.state.user;
    const errors = this.props.signUpErrors;
    const { loader } = this.props;

    return (
      <div className={CN(css.signPage, 'Card')}>
        <Loader loaded={loader} />
        <form>
          <TextField ref="email"
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={this::this.handleChange} error={errors.email} />
          <TextField ref="password"
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={this::this.handleChange} error={errors.password} />
          <TextField ref="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            placeholder="Password Confirmation"
            value={user.passwordConfirmation}
            onChange={this::this.handleChange} error={errors.passwordConfirmation} />
          <TextField ref="nick"
            name="nick"
            placeholder="Nick"
            value={user.nick}
            onChange={this::this.handleChange} error={errors.nick} />
          <Button onClick={this::this.submitForm} color="blue">Sign up</Button>
          <p>Already have an account? <Link to="/sign_in">Sign in</Link></p>
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
    current: state.users.current,
    signUpErrors: state.users.signUpErrors,
    loader: state.loaders.main
  };
}

export default connect(mapStateToProps)(SignUp);
