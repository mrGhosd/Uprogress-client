import { post } from 'utils/ApiRequest';
import { getAuthorizationParams } from 'utils/browser';

/**
 * Sign in user
 * @param {Object} user User parameters
 * @return {Dispatch} Dispatch function
 */
export function signIn(user) {
  return (dispatch) => {
    post('/sessions', { user })
      .then((response) => {
        dispatch({ type: 'SIGN_IN_USER', user: response.data.user });
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
        dispatch({ type: 'SIGN_UP_USER', user: response.data.user });
      })
      .catch((error) => {
        dispatch({ type: 'SIGN_UP_FAILED', user: error.data.errors });
      });
  };
}
