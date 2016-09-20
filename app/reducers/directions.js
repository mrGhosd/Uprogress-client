import update from 'react/lib/update';

const initialState = {
  list: [],
  detail: {
    steps: []
  },
  errors: {},
  isUpdated: null
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
    case 'GET_DIRECTIONS_LIST':
      return { ...state, list: action.directions };
    case 'DIRECTION':
      return { ...state, detail: action.direction };
    case 'DIRECTION_FAILED':
      return { ...state, errors: action.errors };
    case 'NEW_DIRECTION':
      return update(state, { list: { $push: [action.direction] } });
    case 'UPDATE_DIRECTION':
      const directionListIndex = directionIndex(state, action.direction);
      
      return update(state, {
        list: { $splice: [[directionListIndex, 1, action.direction]] },
        detail: { $set: action.direction },
        isUpdated: { $set: action.updated }
      });
    case 'UPDATE_STEP':
      const updateIndex = directionIndex(state, action.step.direction);
      return update(state, {
        list: {$splice: [[updateIndex, 1, action.step.direction]]},
        detail: { $set: action.step.direction}
      });
      return state;
    case 'CREATE_STEP':
      const createdIndex = directionIndex(state, action.step.direction);
      return update(state, {
        list: {$splice: [[createdIndex, 1, action.step.direction]]},
        detail: { $set: action.step.direction}
      });
    case 'DELETE_STEP':
      const deletedIndex = directionIndex(state, action.step.direction);
      return update(state, {
        list: {$splice: [[deletedIndex, 1, action.step.direction]]},
        detail: { $set: action.step.direction}
      });
    case 'USER_INFO':
      return { ...state, list: action.user.directions };
    default:
      return state;
  }
}
/*eslint-enable */

/**
  * Find index of direction
  * @param  {Object} state Application state
  * @param  {Object} action Action object
  * @return {Object} Updated state
*/
function directionIndex(state, direction) {
  const ids = state.list.map((item) => item.id);
  const index = ids.indexOf(direction.id);

  return index;
}
