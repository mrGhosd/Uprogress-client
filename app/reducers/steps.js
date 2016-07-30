const initialState = {
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
    case 'CREATE_STEP':
      return { ...state, errors: [] };
    case 'FAILED_CREATE_STEP_ACTION':
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}
/*eslint-enable */
