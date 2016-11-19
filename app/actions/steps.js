import { post, put, destroy } from 'utils/ApiRequest';
import { Info } from 'actions/notifications';

/**
 * Create step
 * @param  {Integer} id Direction id
 * @param  {Object} step Step parameters
 * @return {Dispatch} Dispatch function
 */
export function createStep(user, id, step) {
  return (dispatch) => {
    dispatch({ type: 'START_MAIN_LOADER' });
    return post(`/users/${user}/directions/${id}/steps`, { step })
      .then((response) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'CREATE_STEP', step: response.data.step });
      })
      .catch((errors) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'FAILED_OPERATION', errors: errors.data.errors });
      });
  };
}

/**
 * Edit step
 * @param  {Object} step Step parameters
 * @return {Dispatch} Dispatch function
 */
export function editStep(step) {
  return (dispatch) => {
    return new Promise((resolve) => {
      resolve(dispatch({ type: 'EDIT_STEP', step }));
    });
  };
}


/**
 * Update step
 * @param  {Integer} direction_id Direction id
 * @param  {Integer} id Step id
 * @param  {Object} step Step parameters
 * @return {Dispatch} Dispatch function
 */
export function updateStep(user, direction_id, id, step) {
  return (dispatch) => {
    dispatch({ type: 'START_MAIN_LOADER' });
    return put(`/users/${user}/directions/${direction_id}/steps/${id}`, { step })
      .then((response) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'UPDATE_STEP', step: response.data.step });
      })
      .catch((errors) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'FAILED_OPERATION', errors: errors.data.errors });
      });
  };
}

/**
 * Delete step
 * @param  {Integer} direction_id Direction id
 * @param  {Integer} id Direction id
 * @param  {Object} step Step parameters
 * @return {Dispatch} Dispatch function
 */
export function deleteStep(user, direction_id, id) {
  // dispatch({ type: 'DELETE_STEP', step: response.data.step });
  return (dispatch) => {
    dispatch({ type: 'START_MAIN_LOADER' });
    return destroy(`/users/${user}/directions/${direction_id}/steps/${id}`)
      .then((response) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        Info('stepDeleteSuccess');
        dispatch({ type: 'DELETE_STEP', step: response.data.step });
      });
  };
}
