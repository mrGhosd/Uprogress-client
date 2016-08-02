import update from 'react/lib/update';

const initialState = {
  list: [],
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
    case 'DIRECTION':
      return { ...state, list: action.direction.steps };
    case 'CREATE_STEP':
      return update(state, {list: {$push: [action.step]}});
    case 'DELETE_STEP':
      const ids = state.list.map(item => item.id);
      const index = ids.indexOf(action.step.id);
      // state.list.splice(index, 1)
      console.log(ids, action);
      console.log(state);
      return { ...state, list: [
        ...state.list.slice(0, index),
        ...state.list.slice(index + 1)
      ] };
      // return update(state, {list: {$splice: [[index, 1]]}});
    case 'FAILED_CREATE_STEP_ACTION':
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}
/*eslint-enable */
