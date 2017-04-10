import update from 'react/lib/update';

const initialState = {
  list: [],
  errors: {}
};

/**
 * Select action due to action.type parameter
 * @param  {Object} state Application state
 * @param  {Object} action Action object
 * @return {Object} Updated state
 */
 /*eslint-disable */
export default function(state = initialState, action) {
  switch (action.type) {
    case 'DIRECTION':
      return { ...state, list: action.direction.appointments };
    case 'NEW_APPOINTMENT':
      return update(state, {
        list: { $push: [action.appointment] },
        errors: { $set: {} }
      });
    case 'APPOINTMENT_FAILED':
      return update(state, {
        errors: { $set: action.errors }
      });
    case 'UPDATE_APPOINTMENT':
      const indexValue = appointmentIndex(state, action.appointment);

      return update(state, {
        list: { $splice: [[indexValue, 1, action.appointment]] }
      });
    default:
      return state;
  }
}
/*eslint-enable */

/**
  * Find index of appointment
  * @param  {Object} state Application state
  * @param  {Object} action Action object
  * @return {Object} Updated state
*/
function appointmentIndex(state, appointment) {
  const ids = state.list.map((item) => item.id);
  const index = ids.indexOf(appointment.id);

  return index;
}
