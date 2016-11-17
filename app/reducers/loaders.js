import update from 'react/lib/update';

const initialState = {
  main: false,
  file: true
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
    case 'START_MAIN_LOADER':
      return update(state, {
        main: { $set: false }
      });
    case 'STOP_MAIN_LOADER':
      return update(state, {
        main: { $set: true }
      });
    case 'START_FILE_LOADER':
      return update(state, {
        file: { $set: false }
      });
    case 'STOP_FILE_LOADER':
      return update(state, {
        file: { $set: true }
      });
    default:
      return state;
  }
}
/*eslint-enable */
