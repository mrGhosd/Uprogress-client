import { get, post, put } from 'utils/ApiRequest';

/**
 * Get directions list
 * @return {Dispatch} Dispatch function
 */
export function getList(user) {
  return (dispatch) => {
    get(`/users/${user}/directions`).then((response) => {
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
    post(`/users/${user}/directions`, { direction })
      .then((response) => {
        dispatch({ type: 'NEW_DIRECTION', direction: response.data.direction });
      })
      .catch((error) => {
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
    put(`/users/${user}/directions/${id}`, { direction })
      .then((response) => {
        dispatch({ type: 'UPDATE_DIRECTION', direction: response.data.direction, updated: true });
      })
      .catch((errors) => {
        console.log(errors);
        dispatch({ type: 'FAILED_OPERATION', errors: errors.data.errors });
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
    get(`/users/${user}/directions/${id}`)
      .then((response) => {
        dispatch({ type: 'DIRECTION', direction: response.data.direction });
      });
  };
}
