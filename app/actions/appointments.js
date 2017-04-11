import { post, put, destroy } from 'utils/ApiRequest';
import { Info } from 'actions/notifications';

/**
 * Create a new appointment for direction
 * @param {Object} appointment Appointment parameters
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

/**
 * Updates an existent appointment
 * @param {Object} appointment Appointment parameters
 * @return {Dispatch} Dispatch function
 */
export function updateAppointment(id, appointment) {
  return (dispatch) => {
    dispatch({ type: 'START_MAIN_LOADER' });
    return put(`/appointments/${id}`, { appointment })
      .then((response) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        Info('appointmentSuccessUpdate');
        dispatch({ type: 'UPDATE_APPOINTMENT', appointment: response.data.appointment });
      })
      .catch((error) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'APPOINTMENT_FAILED', errors: error.data.errors });
      });
  };
}

/**
 * Delete an appointment
 * @param {Object} appointment Appointment parameters
 * @return {Dispatch} Dispatch function
 */
export function deleteAppointment(id) {
  return (dispatch) => {
    dispatch({ type: 'START_MAIN_LOADER' });
    return destroy(`/appointments/${id}`)
      .then((response) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        Info('appointmentSuccessDelete');
        dispatch({ type: 'DELETE_APPOINTMENT', appointment: response.data.appointment });
      })
      .catch((error) => {
        dispatch({ type: 'STOP_MAIN_LOADER' });
        dispatch({ type: 'APPOINTMENT_FAILED', errors: error.data.errors });
      });
  };
}
