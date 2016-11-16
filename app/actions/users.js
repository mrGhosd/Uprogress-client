import { get, post, put } from 'utils/ApiRequest';
import { getAuthorizationParams } from 'utils/browser';

/**
 * Sign in user
 * @param {Object} user User parameters
 * @return {Dispatch} Dispatch function
 */
export function signIn(user) {
  user.authorization = getAuthorizationParams();
  return (dispatch) => {
    return post('/sessions', { user })
      .then((response) => {
        dispatch({ type: 'SIGN_IN_USER', token: response.data.token });
        dispatch(currentUser());
      })
      .catch((error) => {
        dispatch({ type: 'SIGN_IN_FAILED', errors: error.data.errors });
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
    return post('/registrations', { user })
      .then((response) => {
        dispatch({ type: 'SIGN_UP_USER', token: response.data.token });
        dispatch(currentUser());
      })
      .catch((error) => {
        dispatch({ type: 'SIGN_UP_FAILED', errors: error.data.errors });
      });
  };
}

/**
 * Make request for current user
 * @return {Dispatch} Dispatch function
 */
export function currentUser() {
  return (dispatch) => {
    dispatch({ type: 'START_MAIN_LOADER' });
    return get('/sessions/current')
      .then((response) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'CURRENT_USER', current: response.data.currentUser });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: 'CURRENT_USER_FAILED', user: error.data.user });
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
    dispatch({ type: 'START_MAIN_LOADER' });
    return get(`/users/${user}`)
      .then((response) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'USER_INFO', user: response.data.user });
      })
      .catch((error) => {
        dispatch({ type: 'USER_INFO_FAILED', errors: error.data.errors });
      });
  };
}

/**
 * Upload user image
 * @param {Object} attachment attachment
 * @return {Dispatch} Dispatch function
 */
export function uploadImage(attachment) {
  let formData = new FormData();

  formData.append('file', attachment.file);
  formData.append('attachable_type', attachment.attachableType);
  return (dispatch) => {
    return post('/attachments', formData)
      .then((response) => {
        dispatch({ type: 'USER_UPLOAD_AVATAR', attachment: response.data.attachment });
      })
      .catch((error) => {
        dispatch({ type: 'USER_UPLOAD_FAILED', error: error.data.errors });
      });
  };
}

/**
 * Update current user information
 * @param {Number} id user id
 * @param {Object} user user attributes
 * @return {Dispatch} Dispatch function
 */
export function updateUser(id, user) {
  return (dispatch) => {
    return put(`/users/${id}`, { user })
       .then((response) => {
         dispatch({ type: 'USER_UPDATE_SUCCESS', current: response.data.currentUser });
       })
       .catch((error) => {
         dispatch({ type: 'USER_UPDATE_FAILED', errors: error.data.errors });
       });
  };
}

/**
 * Get user statistics information
 * @param {Number} id user id
 * @return {Dispatch} Dispatch function
 */
export function getUserStatistics(id) {
  return (dispatch) => {
    dispatch({ type: 'START_MAIN_LOADER' });
    return get(`/users/${id}/statistics`)
       .then((response) => {
         dispatch({ type: 'STOP_MAIN_LOADER' });
         dispatch({ type: 'USER_STATISTICS_SUCCESS', statistics: response.data.statistics });
       })
       .catch((error) => {
         dispatch({ type: 'STOP_MAIN_LOADER' });
         dispatch({ type: 'USER_STATISTICS_FAILED', errors: error.data.errors });
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
