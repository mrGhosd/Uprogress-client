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
      return update(state, {
        list: { $push: [action.notification] }
      })
    case 'DROP_NOTIFICATION':
      const deletedIndex = notificationsIndex(state, action.id);
      return update(state, {
        list: { $splice: [[deletedIndex, 1]]},
      });
    default:
      return state;
  }
}
/*eslint-enable */

/**
  * Find index of notification
  * @param  {Object} state Application state
  * @param  {Object} action Action object
  * @return {Object} Updated state
*/
function notificationsIndex(state, id) {
  const ids = state.list.map((item) => item.id);
  const index = ids.indexOf(id);

  return index;
}
