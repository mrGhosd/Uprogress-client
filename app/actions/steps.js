import { post, put, destroy } from 'utils/ApiRequest';

/**
 * Create step
 * @param  {Integer} id Direction id
 * @param  {Object} step Step parameters
 * @return {Dispatch} Dispatch function
 */
export function createStep(id, step) {
  return (dispatch) => {
    post(`/directions/${id}/steps`, { step })
      .then((response) => {
        dispatch({ type: 'CREATE_STEP', step: response.data.step });
      })
      .catch((errors) => {
        dispatch({ type: 'FAILED_CREATE_STEP_ACTION', errors: errors.data.errors });
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
export function updateStep(direction_id, id, step) {
  return (dispatch) => {
    put(`/directions/${direction_id}/steps/${id}`, { step })
      .then((response) => {
        dispatch({ type: 'UPDATE_STEP', step: response.data.step });
      })
      .catch((errors) => {
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
export function deleteStep(direction_id, id) {
  return (dispatch) => {
    destroy(`/directions/${direction_id}/steps/${id}`)
      .then((response) => {
        dispatch({ type: 'DELETE_STEP', step: response.data.step });
      });
  };
}
