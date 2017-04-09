import { post } from 'utils/ApiRequest';
import { Info } from 'actions/notifications';


/**
 * Create a new appointment for direction
 * @param {Object} direction Direction parameters
 * @return {Dispatch} Dispatch function
 */
export function createAppointment(appointment) {
  return (dispatch) => {
    dispatch({ type: 'START_MAIN_LOADER' });
    return post('/appointments', { appointment })
      .then((response) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        Info('appointmentSuccessCreation');
        dispatch({ type: 'NEW_APPOINTMENT', appointment: response.data.appointment });
      })
      .catch((error) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'APPOINTMENT_FAILED', errors: error.data.errors });
      });
  };
}
