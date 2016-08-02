import update from 'react/lib/update';

const initialState = {
  list: [],
  detail: {
    steps: []
  },
  errors: {
    title: []
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
      replaceInList(state, action.step);
      return { ...state, detail: action.step.direction };
    case 'CREATE_STEP':
      // replaceInList(state, action.step);
      // state.detaild.steps.push(action.step);
      return { ...state, detail: action.step.direction };
    case 'DELETE_STEP':
      // deleteStep(state, action.step);
      // replaceInList(state, action.step);
      return { ...state, detail: action.step.direction };
    default:
      return state;
  }
}
/*eslint-enable */

/**
  * Find updated step in direction steps
  * @param  {Object} state Application state
  * @param  {Object} action Action object
  * @return {Object} Updated state
*/
function replaceInList(state, step) {
  let directions = state.list.map((item) => item.id);
  const index = directions.indexOf(step.direction.id);

  state.list.splice(index, 1, step.direction);
}

/**
  * Find deleted step in direction steps
  * @param  {Object} state Application state
  * @param  {Object} action Action object
  * @return {Object} Updated state
*/
// function deleteStep(state, step) {
//   let ids = state.detail.steps.map((item) => item.id);
//   const index = ids.indexOf(step.id);
//
//   state.detail.steps.splice(index, 1);
// }
