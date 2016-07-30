import update from 'react/lib/update';

const initialState = {
  list: [],
  detail: {
    steps: []
  }
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
    case 'NEW_DIRECTION':
      return update(state, { list: { $push: [action.direction] } });
    case 'UPDATE_DIRECTION':
      return { ...state, detail: action.direction, isUpdated: action.updated };
    case 'UPDATE_STEP':
      let directions = state.list.map(item => item.id);
      const index = directions.indexOf(action.step.direction.id);
      state.list.splice(index, 1, action.step.direction);
      return { ...state, detail: action.step.direction };
    default:
      return state;
  }
}
/*eslint-enable */

// /*
//  * Find updated step in direction steps
//  * @param  {Object} state Application state
//  * @param  {Object} action Action object
//  * @return {Object} Updated state
//  */
//  function updateStep(state, step) {
//    let steps = state.detail.steps.map(item => item.id);
//    const index = steps.indexOf(step.id);
//    state.detail.steps.splice(index, 1, step);
//
//    return { ...state, detail: state.detail };
//  }
