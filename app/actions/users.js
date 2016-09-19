import { get, post } from 'utils/ApiRequest';
import { getAuthorizationParams } from 'utils/browser';

/**
 * Sign in user
 * @param {Object} user User parameters
 * @return {Dispatch} Dispatch function
 */
export function signIn(user) {
  user.authorization = getAuthorizationParams();
  return (dispatch) => {
    post('/sessions', { user })
      .then((response) => {
        dispatch({ type: 'SIGN_IN_USER', token: response.data.token });
        dispatch(currentUser());
      })
      .catch((error) => {
        dispatch({ type: 'SIGN_IN_FAILED', user: error.data.errors });
      });
  };
}

/**
 * Sign up user
 * @param {Object} user User parameters
 * @return {Dispatch} Dispatch function
 */
export function signUp(user) {
  user.authorization = getAuthorizationParams();
  return (dispatch) => {
    post('/registrations', { user })
      .then((response) => {
        dispatch({ type: 'SIGN_UP_USER', token: response.data.token });
        dispatch(currentUser());
      })
      .catch((error) => {
        dispatch({ type: 'SIGN_UP_FAILED', user: error.data.errors });
      });
  };
}

/**
 * Make request for current user
 * @return {Dispatch} Dispatch function
 */
export function currentUser() {
  return (dispatch) => {
    get('/sessions/current')
      .then((response) => {
        console.log(response);
        dispatch({ type: 'CURRENT_USER', user: response.data.user });
      })
      .catch((error) => {
        dispatch({ type: 'CURRENT_USER_FAILED', user: error.data.errors });
      });
  };
}
