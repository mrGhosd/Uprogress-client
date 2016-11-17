import css from './SignPage.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from 'react-loader';

import { signIn } from 'actions/users';

import TextField from 'TextField/ElementTextField';
import Button from 'Button/ElementButton';
import SvgIcon from 'SVGIcon/SVGIcon';

class SignIn extends Component {

  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    dispatch: PropTypes.func,
    signInErrors: PropTypes.object,
    loader: PropTypes.bool
  };

  static defaultProps = {
    dispatch: () => {},
    signInErrors: {},
    loader: true
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

  componentWillReceiveProps(props) {
    if (props.current && !props.current.isEmpty) {
      this.context.router.push(`/${props.current.nick}`);
    }
  }

  submitForm() {
    const user = this.state.user;

    this.props.dispatch(signIn(user));
  }

  render() {
    const user = this.state.user;
    const errors = this.props.signInErrors;
    const { loader } = this.props;

    return (
      <div className={CN(css.signPage, 'Card')}>
        <Loader loaded={loader} />
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

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return {
    current: state.users.current,
    signInErrors: state.users.signInErrors,
    loader: state.loaders.main
  };
}

export default connect(mapStateToProps)(SignIn);
