import { get, post, destroy } from 'utils/ApiRequest';
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
        dispatch({ type: 'CURRENT_USER', current: response.data.currentUser });
      })
      .catch((error) => {
        dispatch({ type: 'CURRENT_USER_FAILED', user: error.data.errors });
      });
  };
}

/**
 * Get user info
 * @param {String} user identifier
 * @return {Dispatch} Dispatch function
 */
export function getUser(user) {
  return (dispatch) => {
    get(`/users/${user}`)
      .then((response) => {
        console.log(response)
        dispatch({ type: 'USER_INFO', user: response.data.user });
      })
      .catch((error) => {;
        dispatch({ type: 'CURRENT_USER_FAILED', user: error.data.errors });
      });
  };
}

/**
 * Sign out; Remove token from client
 * @return {Dispatch} Dispatch function
 */
export function signOut() {
  return { type: 'SIGN_OUT' };
}
