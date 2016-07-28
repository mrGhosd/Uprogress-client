import { put } from 'utils/ApiRequest';

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
        dispatch({ type: 'UPDATE_STEP', direction: response.data.direction });
      })
      .catch((errors) => {
        dispatch({ type: 'FAILED_OPERATION', errors: errors.data.errors });
      });
  };
}
