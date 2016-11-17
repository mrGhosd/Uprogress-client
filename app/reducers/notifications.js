import update from 'react/lib/update';

const initialState = {
  list: []
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
    case 'ADD_INFO_NOTIFICATION':
    case 'ADD_ALERT_NOTIFICATION':
    case 'DROP_NOTIFICATION':
    default:
      return state;
  }
}
/*eslint-enable */
