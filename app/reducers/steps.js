import update from 'react/lib/update';

const initialState = {
  list: [],
  errors: {},
  edit: {}
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
    case 'EDIT_STEP':
      return { ...state, edit: action.step };
    case 'CREATE_STEP':
      return update(state, {
        list: { $push: [action.step] },
        errors: { $set: {} }
      });
    case 'UPDATE_STEP':
      const stepIds = state.list.map(item => item.id);
      const stepsIndex = stepIds.indexOf(action.step.id);
      return update(state, {
        list: { $splice: [[stepsIndex, 1, action.step]] },
        edit: { $set: {} }
      });
    case 'DELETE_STEP':
      const ids = state.list.map(item => item.id);
      const index = ids.indexOf(action.step.id);
      return update(state, {list: {$splice: [[index, 1]]}});
    case 'FAILED_CREATE_STEP_ACTION':
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}
/*eslint-enable */
