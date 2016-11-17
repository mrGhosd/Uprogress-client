import { get, post, put } from 'utils/ApiRequest';

/**
 * Get directions list
 * @return {Dispatch} Dispatch function
 */
export function getList(user) {
  return (dispatch) => {
    return get(`/users/${user}/directions`).then((response) => {
      dispatch({ type: 'GET_DIRECTIONS_LIST', directions: response.data.directions });
    });
  };
}

/**
 * Create a new direction
 * @param {Object} direction Direction parameters
 * @return {Dispatch} Dispatch function
 */
export function createDirection(user, direction) {
  return (dispatch) => {
    dispatch({ type: 'START_MAIN_LOADER' });
    return post(`/users/${user}/directions`, { direction })
      .then((response) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'NEW_DIRECTION', direction: response.data.direction, created: true });
      })
      .catch((error) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'DIRECTION_FAILED', errors: error.data.errors });
      });
  };
}

/**
 * Update direction
 * @param  {Integer} id Direction id
 * @param  {Object} direction Direction parameters
 * @return {Dispatch} Dispatch function
 */
export function updateDirection(user, id, direction) {
  return (dispatch) => {
    return put(`/users/${user}/directions/${id}`, { direction })
      .then((response) => {
        dispatch({ type: 'UPDATE_DIRECTION', direction: response.data.direction, updated: true });
      })
      .catch((errors) => {
        dispatch({ type: 'DIRECTION_FAILED', errors: errors.data.errors });
      });
  };
}

/**
 * Get particular direction
 * @param  {Integer} id Direction id
 * @return {Dispatch} Dispatch function
 */
export function getDirection(user, id) {
  return (dispatch) => {
    dispatch({ type: 'START_MAIN_LOADER' });
    return get(`/users/${user}/directions/${id}`)
      .then((response) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'DIRECTION', direction: response.data.direction });
      });
  };
}

/**
 * Remove errors from form
 * @return {Object} object for reducer
 */
export function removeFormErrors() {
  return { type: 'REMOVE_FORM_ERRORS' };
}
