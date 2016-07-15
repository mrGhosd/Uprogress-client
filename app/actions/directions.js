import { get, post, put } from 'utils/ApiRequest';

/**
 * Get directions list
 * @return {Dispatch} Dispatch function
 */
export function getList() {
  return (dispatch) => {
    get('/directions').then((response) => {
      dispatch({ type: 'GET_DIRECTIONS_LIST', directions: response.data.directions });
    });
  };
}

/**
 * Create a new direction
 * @param {Object} direction Direction parameters
 * @return {Dispatch} Dispatch function
 */
export function createDirection(direction) {
  return (dispatch) => {
    post('/directions', { direction })
      .then((response) => {
        dispatch({ type: 'NEW_DIRECTION', direction: response.data.direction });
      });
  };
}

/**
 * Update direction
 * @param  {Integer} id Direction id
 * @param  {Object} direction Direction parameters
 * @return {Dispatch} Dispatch function
 */
export function updateDirection(id, direction) {
  return (dispatch) => {
    put(`/directions/${id}`, { direction })
      .then((response) => {
        dispatch({ type: 'UPDATE_DIRECTION', direction: response.data.direction, updated: true });
      })
      .catch((errors) => {
        dispatch({ type: 'FAILED_OPERATION', errors: errors.data.errors });
      });
  };
}

/**
 * Get particular direction
 * @param  {Integer} id Direction id
 * @return {Dispatch} Dispatch function
 */
export function getDirection(id) {
  return (dispatch) => {
    get(`/directions/${id}`)
      .then((response) => {
        dispatch({ type: 'DIRECTION', direction: response.data.direction });
      });
  };
}
